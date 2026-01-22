// Tauri doesn't have a Node.js server to do proper SSR
// so we use adapter-static with a fallback to index.html to put the site in SPA mode
// See: https://svelte.dev/docs/kit/single-page-apps
// See: https://v2.tauri.app/start/frontend/sveltekit/ for more info
export const ssr = false;

import { load } from "@tauri-apps/plugin-store";

export class TokenManager {
  saveToken = async (token: string) => {
    try {
      const store = await load("settings.json", {
        autoSave: false,
        defaults: {},
      });

      {
        await store.set("token", token);
        await store.save();
        return "success!";
      }
    } catch (error) {
      console.error("Error saving token:", error);
    }
  };

  loadToken = async () => {
    try {
      const store = await load("settings.json", {
        autoSave: false,
        defaults: {},
      });

      const token = await store.get("token");

      if (!token) return null;

      return token;
    } catch (error) {
      console.error("Error loading token:", error);
    }
  };

  clearToken = async () => {
    try {
      const store = await load("settings.json", {
        autoSave: false,
        defaults: {},
      });

      await store.delete("token");

      await store.save();
    } catch (error) {
      console.error("Error clearing token:", error);
    }
  };
}
