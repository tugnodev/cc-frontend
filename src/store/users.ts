import { readable } from "svelte/store";
import { type userDto } from "../services/dtos/user";

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
