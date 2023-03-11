import { BigInt } from "@graphprotocol/graph-ts"
import {
  Marketplace,
  Approval,
  ApprovalForAll,
  BuyOffer,
  CancelOffer,
  CreateOffer,
  Deposit,
  OwnershipTransferred,
  Transfer,
  Withdraw,
  CompleteSuccessfullOffer,
  CompleteFailedOffer,
} from "../generated/Marketplace/Marketplace";
import { Offer, OfferNFT, User } from "../generated/schema";

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleBuyOffer(event: BuyOffer): void {
  let offer = Offer.load(event.params.offerId.toHex());
  if (offer !== null) {
    let user = User.load(event.params.buyer.toHex());
    if (user === null) {
      user = new User(event.params.buyer.toHex());
      user.address = event.params.buyer;
      user.balance = BigInt.fromI32(0);
      user.save();
    }
    offer.isSold = true;
    offer.buyer = user.id;
    offer.acceptedAt = event.block.timestamp;
    offer.save();
  }
}

export function handleCancelOffer(event: CancelOffer): void {
  let offer = Offer.load(event.params.offerId.toHex());
  if (offer !== null) {
    offer.isCancelled = true;
    offer.cancelledAt = event.block.timestamp;
    offer.save();
  }
}

export function handleCreateOffer(event: CreateOffer): void {
  let user = User.load(event.params.seller.toHex());
  if (user === null) {
    user = new User(event.params.seller.toHex());
    user.address = event.params.seller;
    user.balance = BigInt.fromI32(0);
    user.save();
  }
  let offer = new Offer(event.params.offerId.toHex());
  let offerNFT = new OfferNFT(event.params.tokenId.toHex());
  offerNFT.tokenId = event.params.tokenId;
  offerNFT.tokenURI = event.params.tokenURI;
  offerNFT.owner = user.id;
  offerNFT.save();
  offer.nft = offerNFT.id;
  offer.itemName = event.params.itemName;
  offer.itemImage = event.params.itemImage;
  offer.price = event.params.price;
  offer.seller = user.id;
  offer.isSold = false;
  offer.isCancelled = false;
  offer.isCompleted = false;
  offer.createdAt = event.block.timestamp;
  offer.save();
}

export function handleDeposit(event: Deposit): void {
  let user = User.load(event.params.sender.toHex());
  if (user === null) {
    user = new User(event.params.sender.toHex());
    user.address = event.params.sender;
    user.balance = event.params.amount;
    user.save();
  }
  else {
    user.balance = user.balance.plus(event.params.amount);
    user.save();
  }
}

export function handleCompletedOfferSuccess(event: CompleteSuccessfullOffer): void {
  let offer = Offer.load(event.params.offerId.toHex());
  if (offer !== null) {
    let offerNFT = OfferNFT.load(offer.nft);
    if (offerNFT !== null) {
      offerNFT.owner = offer.buyer!;
      offerNFT.save();
    }
    offer.completedAt = event.block.timestamp;
    let seller = User.load(offer.seller);
    if (seller !== null) {
      seller.balance = seller.balance.plus(offer.price);
      seller.save();
    }
    offer.isCompleted = true;
    offer.save();
  }
}

export function handleCompleteFailedOffer(event: CompleteFailedOffer): void {
  let offer = Offer.load(event.params.offerId.toHex());
  if (offer !== null) {
    let offerNFT = OfferNFT.load(offer.nft);
    if (offerNFT !== null) {
      offerNFT.owner = offer.seller;
      offerNFT.save();
    }
    offer.completedAt = event.block.timestamp;
    offer.isSold = false;
    offer.save();
  }
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleTransfer(event: Transfer): void {}

export function handleWithdraw(event: Withdraw): void {
  let user = User.load(event.params.sender.toHex());
  if (user === null) {
    user = new User(event.params.sender.toHex());
    user.address = event.params.sender;
    user.balance = BigInt.fromI32(0);
    user.save();
  }
  else {
    user.balance = user.balance.minus(event.params.amount);
    user.save();
  }
}
