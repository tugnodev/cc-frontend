import WebSocket from "@tauri-apps/plugin-websocket";
import { chatStore } from "./store/chat.svelte";
import type { Message } from "@tauri-apps/plugin-websocket";

class Socket {
  private ws: WebSocket | null = null;

  async connect() {
    this.ws = await WebSocket.connect("ws://127.0.0.1:8080");
  }

  async send(message: string) {
    if (this.ws) {
      await this.ws.send(message);
    }
  }

  addListener(callback: (msg: Message) => void) {
    if (this.ws) {
      return this.ws.addListener(callback);
    }
    return () => {};
  }

  async disconnect() {
    if (this.ws) {
      await this.ws.disconnect();
      this.ws = null;
    }
  }
}

export const socket = new Socket();
