import { Product } from "./product";

export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  cart: Product[];
};
