import { goto } from "$app/navigation";
import { user as usr } from "$lib/store/users";
import { get } from "svelte/store";

export const load = async () => {
  const user = await usr.get();
  user.subscribe((user) => {
    switch (user?.vendeur) {
      case true:
        break;
      case false:
        goto("/auth/vendor");
        break;
    }
  });
};
