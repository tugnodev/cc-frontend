import { readable, type Readable } from "svelte/store";
import { type userDto } from "../services/dtos/user";

class User {
  private user: Readable<userDto | null>;

  constructor(user: userDto | null) {
    this.user = readable(user);
  }

  get(): Readable<userDto | null> {
    switch (this.user) {
      case null:
        return readable(null);
      default:
        return this.user;
    }
  }

  set(user: userDto) {
    this.user = readable(user);
  }
}

export const user = new User(null);
