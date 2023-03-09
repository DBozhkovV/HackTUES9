// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Structs.sol";
import "./S2LToken.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Marketplace is Ownable, ERC721URIStorage {
    event CreateOffer(
        bytes32 indexed offerId,
        address indexed seller,
        uint256 indexed tokenId,
        uint256 price,
        string itemName,
        string tokenURI
    );
    event CancelOffer(bytes32 indexed offerId);
    event BuyOffer(bytes32 indexed offerId, address indexed buyer);
    event Deposit(address indexed sender, uint256 amount);
    event Withdraw(address indexed sender, uint256 amount);

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    S2LToken private token;
    uint256 private balance = 0;
    mapping(bytes32 => Structs.Offer) private offers;

    constructor(address _tokenAddress) ERC721("Offer NFT", "NFT") {
        token = S2LToken(_tokenAddress);
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
        string calldata tokenURI
    ) external {
        require(price > 0, "Price must be greater than 0");
        require(bytes(itemName).length > 0, "Item name must not be empty");
        require(bytes(tokenURI).length > 0, "Token URI must not be empty");

        uint256 tokenId = _mintNFT(msg.sender, tokenURI);
        bytes32 offerId = keccak256(abi.encodePacked(msg.sender, tokenId));
        offers[offerId] = Structs.Offer(
            msg.sender,
            address(0),
            address(this),
            tokenId,
            price,
            itemName,
            tokenURI,
            false,
            false
        );
        emit CreateOffer(
            offerId,
            msg.sender,
            tokenId,
            price,
            itemName,
            tokenURI
        );
    }

    function cancelOffer(bytes32 offerId) external {
        require(offers[offerId].seller == msg.sender, "Only seller can cancel");
        require(!offers[offerId].isSold, "Offer is already sold");
        require(!offers[offerId].isCancelled, "Offer is already cancelled");

        offers[offerId].isCancelled = true;
        _burn(offers[offerId].tokenId);
        emit CancelOffer(offerId);
    }

    function buyOffer(bytes32 offerId) external {
        require(!offers[offerId].isSold, "Offer is already sold");
        require(!offers[offerId].isCancelled, "Offer is already cancelled");

        token.transferFrom(
            msg.sender,
            offers[offerId].seller,
            offers[offerId].price
        );
        offers[offerId].isSold = true;
        offers[offerId].buyer = msg.sender;
        _transfer(offers[offerId].seller, msg.sender, offers[offerId].tokenId);
    }

    function deposit() public payable {
        token.mint(msg.sender, msg.value);
        balance += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external {
        uint256 userBalance = token.balanceOf(msg.sender);
        require(amount <= userBalance, "Not enough to be withdrawn");
        require(amount <= balance, "Withdraw is currently disabled");
        bool success = payable(msg.sender).send(amount);
        require(success, "send failed");
        token.burn(msg.sender, amount);
        emit Withdraw(msg.sender, amount);
        balance -= amount;
    }
}
