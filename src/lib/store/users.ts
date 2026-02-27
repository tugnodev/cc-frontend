import { readable, type Readable } from "svelte/store";
import { type userDto } from "../services/dtos/user";
import { load, Store } from "@tauri-apps/plugin-store";

class User {
  private user: Readable<userDto | null>;

  constructor(user: userDto | null) {
    this.user = readable(user);
  }

  async get() {
    const store = await load("settings.json", {
      autoSave: false,
      defaults: {},
    });
    const user = (await store.get("user")) as string;
    console.log(`In store get ${user}`);
    this.user = readable(JSON.parse(user));
    return this.user;
  }

  async set(user: userDto) {
    const store = await load("settings.json", {
      autoSave: false,
      defaults: {},
    });
    console.log(`In store set ${JSON.stringify(user)}`);
    await store.set("user", JSON.stringify(user));
    this.user = readable(user);
  }

  async clear() {
    const store = await load("settings.json", {
      autoSave: false,
      defaults: {},
    });
    await store.clear();
    this.user = readable(null);
  }
}

export const user = new User(null);
