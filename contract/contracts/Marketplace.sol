// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Structs.sol";
import "./S2LToken.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@opengsn/contracts/src/ERC2771Recipient.sol";
// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Marketplace is Ownable, ERC721URIStorage, ERC2771Recipient  {
    event CreateOffer(
        bytes32 indexed offerId,
        address indexed seller,
        uint256 indexed tokenId,
        string tokenURI,
        uint256 price,
        string itemName,
        string itemImage
    );
    event CancelOffer(bytes32 indexed offerId);
    event BuyOffer(bytes32 indexed offerId, address indexed buyer);
    event CompleteSuccessfullOffer(bytes32 indexed offerId);
    event CompleteFailedOffer(bytes32 indexed offerId);
    event Deposit(address indexed sender, uint256 amount);
    event Withdraw(address indexed sender, uint256 amount);

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    S2LToken private token;
    uint256 private balance = 0;
    mapping(bytes32 => Structs.Offer) private offers;

    constructor(address _tokenAddress, address _trustedForwarder) ERC721("Offer NFT", "NFT") {
        token = S2LToken(_tokenAddress);
        _setTrustedForwarder(_trustedForwarder);
    }

    function versionRecipient() external pure returns (string memory) {
        return "1";
    }

    function _msgData() internal override(Context, ERC2771Recipient) virtual view returns (bytes calldata ret) {
        if (msg.data.length >= 20 && isTrustedForwarder(msg.sender)) {
            return msg.data[0:msg.data.length-20];
        } else {
            return msg.data;
        }
    }
    function _msgSender() internal override(Context, ERC2771Recipient) virtual view returns (address ret) {
        if (msg.data.length >= 20 && isTrustedForwarder(msg.sender)) {
            // At this point we know that the sender is a trusted forwarder,
            // so we trust that the last bytes of msg.data are the verified sender address.
            // extract sender address from the end of msg.data
            assembly {
                ret := shr(96,calldataload(sub(calldatasize(),20)))
            }
        } else {
            ret = msg.sender;
        }
    }

    function setTrustedForwarder(address _trustedForwarder) external onlyOwner {
        _setTrustedForwarder(_trustedForwarder);
    }

    function setS2LContract(address _tokenAddress) external onlyOwner {
        token = S2LToken(_tokenAddress);
    }

    function _mintNFT(
        address _recipient,
        string memory _tokenURI
    ) private returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(_recipient, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        return newItemId;
    }

    function createOffer(
        uint256 price,
        string calldata itemName,
        string calldata itemImage,
        string calldata tokenURI
    ) external {
        require(price > 0, "Price must be greater than 0");
        require(bytes(itemName).length > 0, "Item name must not be empty");
        require(bytes(tokenURI).length > 0, "Token URI must not be empty");

        uint256 tokenId = _mintNFT(_msgSender(), tokenURI);
        bytes32 offerId = keccak256(abi.encodePacked(_msgSender(), tokenId));
        offers[offerId] = Structs.Offer(
            offerId,
            _msgSender(),
            address(0),
            address(this),
            tokenId,
            price,
            itemName,
            itemImage,
            tokenURI,
            false,
            false,
            false
        );
        emit CreateOffer(
            offerId,
            _msgSender(),
            tokenId,
            tokenURI,
            price,
            itemName,
            itemImage
        );
    }

    function cancelOffer(bytes32 offerId) external {
        require(offers[offerId].id != 0, "Offer does not exist");
        require(offers[offerId].seller == _msgSender(), "Only seller can cancel");
        require(!offers[offerId].isSold, "Offer is already sold");
        require(!offers[offerId].isCancelled, "Offer is already cancelled");

        offers[offerId].isCancelled = true;
        _burn(offers[offerId].tokenId);
        emit CancelOffer(offerId);
    }

    function buyOffer(
        bytes32 offerId,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        require(offers[offerId].id != 0, "Offer does not exist");
        require(!offers[offerId].isSold, "Offer is already sold");
        require(!offers[offerId].isCancelled, "Offer is already cancelled");
        require(
            offers[offerId].seller != _msgSender(),
            "Sellers cannot buy their own offer"
        );
        require(
            offers[offerId].price <= token.balanceOf(_msgSender()),
            "Not enough balance"
        );

        token.permit(
            _msgSender(),
            address(this),
            offers[offerId].price,
            deadline,
            v,
            r,
            s
        );
        require(
            token.allowance(_msgSender(), address(this)) >= offers[offerId].price,
            "Not enough allowance"
        );
        bool success = token.transferFrom(
            _msgSender(),
            address(this),
            offers[offerId].price
        );
        require(success, "transferFrom failed");
        offers[offerId].isSold = true;
        offers[offerId].buyer = _msgSender();
        _transfer(offers[offerId].seller, address(this), offers[offerId].tokenId);
        emit BuyOffer(offerId, _msgSender());
    }

    function completeSuccessfullOffer(bytes32 offerId) external onlyOwner {
        require(offers[offerId].id != 0, "Offer does not exist");
        require(offers[offerId].isSold, "Offer is not sold yet");
        require(!offers[offerId].isCompleted, "Offer is already completed");

        offers[offerId].isCompleted = true;
        _transfer(address(this), offers[offerId].buyer, offers[offerId].tokenId);
        token.transfer(offers[offerId].seller, offers[offerId].price);
        emit CompleteSuccessfullOffer(offerId);
    }

    function completeFailedOffer(bytes32 offerId) external onlyOwner {
        require(offers[offerId].id != 0, "Offer does not exist");
        require(offers[offerId].isSold, "Offer is not sold yet");
        require(!offers[offerId].isCompleted, "Offer is already completed");

        offers[offerId].isSold = false;
        delete offers[offerId].buyer;
        _transfer(address(this), offers[offerId].seller, offers[offerId].tokenId);
        token.transfer(offers[offerId].buyer, offers[offerId].price);
        emit CompleteFailedOffer(offerId);
    }

    function deposit() public payable {
        token.mint(msg.sender, msg.value);
        balance += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external {
        uint256 userBalance = token.balanceOf(_msgSender());
        require(amount <= userBalance, "Not enough to be withdrawn");
        require(amount <= balance, "Withdraw is currently disabled");
        bool success = payable(_msgSender()).send(amount);
        require(success, "send failed");
        token.burn(_msgSender(), amount);
        emit Withdraw(_msgSender(), amount);
        balance -= amount;
    }
}
