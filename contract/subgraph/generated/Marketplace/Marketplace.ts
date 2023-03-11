// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Approval extends ethereum.Event {
  get params(): Approval__Params {
    return new Approval__Params(this);
  }
}

export class Approval__Params {
  _event: Approval;

  constructor(event: Approval) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get approved(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class ApprovalForAll extends ethereum.Event {
  get params(): ApprovalForAll__Params {
    return new ApprovalForAll__Params(this);
  }
}

export class ApprovalForAll__Params {
  _event: ApprovalForAll;

  constructor(event: ApprovalForAll) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get operator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get approved(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class BuyOffer extends ethereum.Event {
  get params(): BuyOffer__Params {
    return new BuyOffer__Params(this);
  }
}

export class BuyOffer__Params {
  _event: BuyOffer;

  constructor(event: BuyOffer) {
    this._event = event;
  }

  get offerId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get buyer(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class CancelOffer extends ethereum.Event {
  get params(): CancelOffer__Params {
    return new CancelOffer__Params(this);
  }
}

export class CancelOffer__Params {
  _event: CancelOffer;

  constructor(event: CancelOffer) {
    this._event = event;
  }

  get offerId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }
}

export class CompleteFailedOffer extends ethereum.Event {
  get params(): CompleteFailedOffer__Params {
    return new CompleteFailedOffer__Params(this);
  }
}

export class CompleteFailedOffer__Params {
  _event: CompleteFailedOffer;

  constructor(event: CompleteFailedOffer) {
    this._event = event;
  }

  get offerId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }
}

export class CompleteSuccessfullOffer extends ethereum.Event {
  get params(): CompleteSuccessfullOffer__Params {
    return new CompleteSuccessfullOffer__Params(this);
  }
}

export class CompleteSuccessfullOffer__Params {
  _event: CompleteSuccessfullOffer;

  constructor(event: CompleteSuccessfullOffer) {
    this._event = event;
  }

  get offerId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }
}

export class CreateOffer extends ethereum.Event {
  get params(): CreateOffer__Params {
    return new CreateOffer__Params(this);
  }
}

export class CreateOffer__Params {
  _event: CreateOffer;

  constructor(event: CreateOffer) {
    this._event = event;
  }

  get offerId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get seller(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get tokenURI(): string {
    return this._event.parameters[3].value.toString();
  }

  get price(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get itemName(): string {
    return this._event.parameters[5].value.toString();
  }

  get itemImage(): string {
    return this._event.parameters[6].value.toString();
  }
}

export class Deposit extends ethereum.Event {
  get params(): Deposit__Params {
    return new Deposit__Params(this);
  }
}

export class Deposit__Params {
  _event: Deposit;

  constructor(event: Deposit) {
    this._event = event;
  }

  get sender(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Transfer extends ethereum.Event {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Withdraw extends ethereum.Event {
  get params(): Withdraw__Params {
    return new Withdraw__Params(this);
  }
}

export class Withdraw__Params {
  _event: Withdraw;

  constructor(event: Withdraw) {
    this._event = event;
  }

  get sender(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Marketplace extends ethereum.SmartContract {
  static bind(address: Address): Marketplace {
    return new Marketplace("Marketplace", address);
  }

  balanceOf(owner: Address): BigInt {
    let result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(owner: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getApproved(tokenId: BigInt): Address {
    let result = super.call("getApproved", "getApproved(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_getApproved(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getApproved",
      "getApproved(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(tokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getTrustedForwarder(): Address {
    let result = super.call(
      "getTrustedForwarder",
      "getTrustedForwarder():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_getTrustedForwarder(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getTrustedForwarder",
      "getTrustedForwarder():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  isApprovedForAll(owner: Address, operator: Address): boolean {
    let result = super.call(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );

    return result[0].toBoolean();
  }

  try_isApprovedForAll(
    owner: Address,
    operator: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isTrustedForwarder(forwarder: Address): boolean {
    let result = super.call(
      "isTrustedForwarder",
      "isTrustedForwarder(address):(bool)",
      [ethereum.Value.fromAddress(forwarder)]
    );

    return result[0].toBoolean();
  }

  try_isTrustedForwarder(forwarder: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isTrustedForwarder",
      "isTrustedForwarder(address):(bool)",
      [ethereum.Value.fromAddress(forwarder)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  ownerOf(tokenId: BigInt): Address {
    let result = super.call("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_ownerOf(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  supportsInterface(interfaceId: Bytes): boolean {
    let result = super.call(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );

    return result[0].toBoolean();
  }

  try_supportsInterface(interfaceId: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  tokenURI(tokenId: BigInt): string {
    let result = super.call("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toString();
  }

  try_tokenURI(tokenId: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  versionRecipient(): string {
    let result = super.call(
      "versionRecipient",
      "versionRecipient():(string)",
      []
    );

    return result[0].toString();
  }

  try_versionRecipient(): ethereum.CallResult<string> {
    let result = super.tryCall(
      "versionRecipient",
      "versionRecipient():(string)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _tokenAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _trustedForwarder(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ApproveCall extends ethereum.Call {
  get inputs(): ApproveCall__Inputs {
    return new ApproveCall__Inputs(this);
  }

  get outputs(): ApproveCall__Outputs {
    return new ApproveCall__Outputs(this);
  }
}

export class ApproveCall__Inputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ApproveCall__Outputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }
}

export class BuyOfferCall extends ethereum.Call {
  get inputs(): BuyOfferCall__Inputs {
    return new BuyOfferCall__Inputs(this);
  }

  get outputs(): BuyOfferCall__Outputs {
    return new BuyOfferCall__Outputs(this);
  }
}

export class BuyOfferCall__Inputs {
  _call: BuyOfferCall;

  constructor(call: BuyOfferCall) {
    this._call = call;
  }

  get offerId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get deadline(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get v(): i32 {
    return this._call.inputValues[2].value.toI32();
  }

  get r(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }

  get s(): Bytes {
    return this._call.inputValues[4].value.toBytes();
  }
}

export class BuyOfferCall__Outputs {
  _call: BuyOfferCall;

  constructor(call: BuyOfferCall) {
    this._call = call;
  }
}

export class CancelOfferCall extends ethereum.Call {
  get inputs(): CancelOfferCall__Inputs {
    return new CancelOfferCall__Inputs(this);
  }

  get outputs(): CancelOfferCall__Outputs {
    return new CancelOfferCall__Outputs(this);
  }
}

export class CancelOfferCall__Inputs {
  _call: CancelOfferCall;

  constructor(call: CancelOfferCall) {
    this._call = call;
  }

  get offerId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class CancelOfferCall__Outputs {
  _call: CancelOfferCall;

  constructor(call: CancelOfferCall) {
    this._call = call;
  }
}

export class CompleteFailedOfferCall extends ethereum.Call {
  get inputs(): CompleteFailedOfferCall__Inputs {
    return new CompleteFailedOfferCall__Inputs(this);
  }

  get outputs(): CompleteFailedOfferCall__Outputs {
    return new CompleteFailedOfferCall__Outputs(this);
  }
}

export class CompleteFailedOfferCall__Inputs {
  _call: CompleteFailedOfferCall;

  constructor(call: CompleteFailedOfferCall) {
    this._call = call;
  }

  get offerId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class CompleteFailedOfferCall__Outputs {
  _call: CompleteFailedOfferCall;

  constructor(call: CompleteFailedOfferCall) {
    this._call = call;
  }
}

export class CompleteSuccessfullOfferCall extends ethereum.Call {
  get inputs(): CompleteSuccessfullOfferCall__Inputs {
    return new CompleteSuccessfullOfferCall__Inputs(this);
  }

  get outputs(): CompleteSuccessfullOfferCall__Outputs {
    return new CompleteSuccessfullOfferCall__Outputs(this);
  }
}

export class CompleteSuccessfullOfferCall__Inputs {
  _call: CompleteSuccessfullOfferCall;

  constructor(call: CompleteSuccessfullOfferCall) {
    this._call = call;
  }

  get offerId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class CompleteSuccessfullOfferCall__Outputs {
  _call: CompleteSuccessfullOfferCall;

  constructor(call: CompleteSuccessfullOfferCall) {
    this._call = call;
  }
}

export class CreateOfferCall extends ethereum.Call {
  get inputs(): CreateOfferCall__Inputs {
    return new CreateOfferCall__Inputs(this);
  }

  get outputs(): CreateOfferCall__Outputs {
    return new CreateOfferCall__Outputs(this);
  }
}

export class CreateOfferCall__Inputs {
  _call: CreateOfferCall;

  constructor(call: CreateOfferCall) {
    this._call = call;
  }

  get price(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get itemName(): string {
    return this._call.inputValues[1].value.toString();
  }

  get itemImage(): string {
    return this._call.inputValues[2].value.toString();
  }

  get tokenURI(): string {
    return this._call.inputValues[3].value.toString();
  }
}

export class CreateOfferCall__Outputs {
  _call: CreateOfferCall;

  constructor(call: CreateOfferCall) {
    this._call = call;
  }
}

export class DepositCall extends ethereum.Call {
  get inputs(): DepositCall__Inputs {
    return new DepositCall__Inputs(this);
  }

  get outputs(): DepositCall__Outputs {
    return new DepositCall__Outputs(this);
  }
}

export class DepositCall__Inputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }
}

export class DepositCall__Outputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SafeTransferFromCall extends ethereum.Call {
  get inputs(): SafeTransferFromCall__Inputs {
    return new SafeTransferFromCall__Inputs(this);
  }

  get outputs(): SafeTransferFromCall__Outputs {
    return new SafeTransferFromCall__Outputs(this);
  }
}

export class SafeTransferFromCall__Inputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class SafeTransferFromCall__Outputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }
}

export class SafeTransferFrom1Call extends ethereum.Call {
  get inputs(): SafeTransferFrom1Call__Inputs {
    return new SafeTransferFrom1Call__Inputs(this);
  }

  get outputs(): SafeTransferFrom1Call__Outputs {
    return new SafeTransferFrom1Call__Outputs(this);
  }
}

export class SafeTransferFrom1Call__Inputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get data(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class SafeTransferFrom1Call__Outputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }
}

export class SetApprovalForAllCall extends ethereum.Call {
  get inputs(): SetApprovalForAllCall__Inputs {
    return new SetApprovalForAllCall__Inputs(this);
  }

  get outputs(): SetApprovalForAllCall__Outputs {
    return new SetApprovalForAllCall__Outputs(this);
  }
}

export class SetApprovalForAllCall__Inputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }

  get operator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get approved(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SetApprovalForAllCall__Outputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }
}

export class SetS2LContractCall extends ethereum.Call {
  get inputs(): SetS2LContractCall__Inputs {
    return new SetS2LContractCall__Inputs(this);
  }

  get outputs(): SetS2LContractCall__Outputs {
    return new SetS2LContractCall__Outputs(this);
  }
}

export class SetS2LContractCall__Inputs {
  _call: SetS2LContractCall;

  constructor(call: SetS2LContractCall) {
    this._call = call;
  }

  get _tokenAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetS2LContractCall__Outputs {
  _call: SetS2LContractCall;

  constructor(call: SetS2LContractCall) {
    this._call = call;
  }
}

export class SetTrustedForwarderCall extends ethereum.Call {
  get inputs(): SetTrustedForwarderCall__Inputs {
    return new SetTrustedForwarderCall__Inputs(this);
  }

  get outputs(): SetTrustedForwarderCall__Outputs {
    return new SetTrustedForwarderCall__Outputs(this);
  }
}

export class SetTrustedForwarderCall__Inputs {
  _call: SetTrustedForwarderCall;

  constructor(call: SetTrustedForwarderCall) {
    this._call = call;
  }

  get _trustedForwarder(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetTrustedForwarderCall__Outputs {
  _call: SetTrustedForwarderCall;

  constructor(call: SetTrustedForwarderCall) {
    this._call = call;
  }
}

export class TransferFromCall extends ethereum.Call {
  get inputs(): TransferFromCall__Inputs {
    return new TransferFromCall__Inputs(this);
  }

  get outputs(): TransferFromCall__Outputs {
    return new TransferFromCall__Outputs(this);
  }
}

export class TransferFromCall__Inputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferFromCall__Outputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class WithdrawCall extends ethereum.Call {
  get inputs(): WithdrawCall__Inputs {
    return new WithdrawCall__Inputs(this);
  }

  get outputs(): WithdrawCall__Outputs {
    return new WithdrawCall__Outputs(this);
  }
}

export class WithdrawCall__Inputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}
