import { readable, type Readable, type Subscriber } from "svelte/store";
import { type authPack, type userDto } from "../services/dtos/user";
import { load } from "@tauri-apps/plugin-store";
import { type StoreIO } from "./store";

const teste: authPack = {
  token: "CxRm6WefT8esFgB2tmL9t3wuBEULdZUz",
  user: {
    id: "YIcLFwld5UCBwMZxVSwM7Df12eDCBtHc",
    email: "teste123@gmail.com",
    name: "Racine Diop",
    image: "/profile.png",
    emailVerified: false,
    vendeur: true,
    address: "UADB",
    certified: false,
    createdAt: "2026-02-06T01:31:13.579Z",
    updatedAt: "2026-02-06T01:31:13.579Z",
  },
};

class User {
  private user: Readable<userDto>;

  constructor(user: userDto) {
    this.user = readable(user);
  }

  get(): Readable<userDto> {
    return this.user;
  }

  set(user: userDto) {
    this.user = readable(user);
  }
}

export const user = new User(teste.user);
