import { readable } from "svelte/store";
import { type userDto } from "../services/dtos/user";
import { load } from "@tauri-apps/plugin-store";
import { type StoreIO } from "./store";

const teste = {
  token: "CxRm6WefT8esFgB2tmL9t3wuBEULdZUz",
  user: {
    id: "YIcLFwld5UCBwMZxVSwM7Df12eDCBtHc",
    email: "teste123@gmail.com",
    name: "Racine Diop",
    image: "/profile.png",
    emailVerified: false,
    createdAt: "2026-02-06T01:31:13.579Z",
    updatedAt: "2026-02-06T01:31:13.579Z",
  },
};

export const users = readable<userDto>();

export class UserRepo implements StoreIO {
  token: string;
  user: userDto;

  constructor(token: string, user: userDto) {
    this.token = token;
    this.user = user;
  }

  async load<userDto>(): Promise<userDto | string> {
    const store = await load("settings.json").catch((e) => {
      console.log(e);
    });
    const token = await store!.get("token");
    const user = await store!.get("user");
    if (token !== this.token) {
      return "non authorized";
    }
    return JSON.parse(user as string) as userDto;
  }

  async save<userDto>(data: userDto): Promise<string> {
    const store = await load("settings.json", {
      autoSave: false,
      defaults: {},
    }).catch(() => "error store");

    switch (typeof store) {
      case "string":
        return "error store";
      default:
        await store.set("user", JSON.stringify(data)).catch((e) => "failed!");
        await store.save().catch((e) => "failed!");
        return "success!";
    }
  }

  async clear(): Promise<string> {
    const store = await load("settings.json", {
      autoSave: false,
      defaults: {},
    }).catch(() => "error store");

    switch (typeof store) {
      case "string":
        return "error store";
      default:
        await store.delete("user");
        return "success!";
    }
  }
}
