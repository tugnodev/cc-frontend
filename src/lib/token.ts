import { load } from "@tauri-apps/plugin-store";

export class TokenManager {
  saveToken = async (token: string) => {
    try {
      const store = await load("settings.json", {
        autoSave: false,
        defaults: {},
      });

      await store.set("token", token);
      await store.save();
      return "success!";
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

      return token as string;
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
