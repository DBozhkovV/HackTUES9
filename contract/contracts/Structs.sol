// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

library Structs {
    struct Offer {
        address seller;
        address buyer;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        string name;
        string image;
        string tokenURI;
        bool isSold;
        bool isCancelled;
    }
}
