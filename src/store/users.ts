import { readable } from "svelte/store";
import { type userDto } from "../services/dtos/user";
import { backendFetch } from "$lib/backend";

const  BK = new backendFetch();

export const users = readable<userDto | null>(null, (set) => {
 
  async function fetchUsers() {
    try {
      const response = await BK.get("/api/me");
      set(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  fetchUsers();

});
