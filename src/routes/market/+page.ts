import { BackendFetch } from "$lib/backend";
import type { cartDto } from "$lib/services/dtos/cart";
import { panier } from "$lib/store/articles";
import { user as usr } from "$lib/store/users";
import { TokenManager } from "$lib/token";

export const load = async () => {
  const tm = new TokenManager();
  const token = await tm.loadToken().then((token) => {
    if (typeof token === "string") {
      return token;
    } else {
      return null;
    }
  });
  const fetch = new BackendFetch(token!);
  usr.get().subscribe(async (user) => {
    const cart = await fetch.get<cartDto>(`/cart/${user?.id}`);
    console.log(cart);
    if (typeof cart === "string") window.location.reload();
    panier.set(cart);
  });
};
