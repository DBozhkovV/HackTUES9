// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Offer extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Offer entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Offer must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Offer", id.toString(), this);
    }
  }

  static load(id: string): Offer | null {
    return changetype<Offer | null>(store.get("Offer", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get seller(): string {
    let value = this.get("seller");
    return value!.toString();
  }

  set seller(value: string) {
    this.set("seller", Value.fromString(value));
  }

  get buyer(): string | null {
    let value = this.get("buyer");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set buyer(value: string | null) {
    if (!value) {
      this.unset("buyer");
    } else {
      this.set("buyer", Value.fromString(<string>value));
    }
  }

  get price(): BigInt {
    let value = this.get("price");
    return value!.toBigInt();
  }

  set price(value: BigInt) {
    this.set("price", Value.fromBigInt(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value!.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get tokenURI(): string {
    let value = this.get("tokenURI");
    return value!.toString();
  }

  set tokenURI(value: string) {
    this.set("tokenURI", Value.fromString(value));
  }

  get itemName(): string {
    let value = this.get("itemName");
    return value!.toString();
  }

  set itemName(value: string) {
    this.set("itemName", Value.fromString(value));
  }

  get itemImage(): string {
    let value = this.get("itemImage");
    return value!.toString();
  }

  set itemImage(value: string) {
    this.set("itemImage", Value.fromString(value));
  }

  get isSold(): boolean {
    let value = this.get("isSold");
    return value!.toBoolean();
  }

  set isSold(value: boolean) {
    this.set("isSold", Value.fromBoolean(value));
  }

  get isCancelled(): boolean {
    let value = this.get("isCancelled");
    return value!.toBoolean();
  }

  set isCancelled(value: boolean) {
    this.set("isCancelled", Value.fromBoolean(value));
  }

  get deleted(): boolean {
    let value = this.get("deleted");
    return value!.toBoolean();
  }

  set deleted(value: boolean) {
    this.set("deleted", Value.fromBoolean(value));
  }
}

export class User extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save User entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type User must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("User", id.toString(), this);
    }
  }

  static load(id: string): User | null {
    return changetype<User | null>(store.get("User", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value!.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get balance(): BigInt {
    let value = this.get("balance");
    return value!.toBigInt();
  }

  set balance(value: BigInt) {
    this.set("balance", Value.fromBigInt(value));
  }

  get offers(): Array<string> {
    let value = this.get("offers");
    return value!.toStringArray();
  }

  set offers(value: Array<string>) {
    this.set("offers", Value.fromStringArray(value));
  }

  get purchases(): Array<string> {
    let value = this.get("purchases");
    return value!.toStringArray();
  }

  set purchases(value: Array<string>) {
    this.set("purchases", Value.fromStringArray(value));
  }
}
