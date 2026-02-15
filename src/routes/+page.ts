import { goto } from "$app/navigation";
import { TokenManager } from "$lib/token";

export const load = async () => {
  const tm = new TokenManager();
  const token = (await tm.loadToken()) as string;
  console.log(token);
  switch (!token) {
    case true:
      goto("/auth/login");
      break;
    case false:
      goto("/market");
      break;
  }
};
