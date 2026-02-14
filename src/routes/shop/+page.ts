import { goto } from "$app/navigation";
import { user as User } from "$lib/store/users";
import { get } from "svelte/store";

export const load = async () => {
  const user = get(User);
  switch (user.vendeur!) {
    case true:
      break;
    case false:
      goto("/");
      break;
  }
};
