import { Product } from "./product";

export type User = {
  id: string;
  fullName: string;
  emailAddresses: string;
  image: string;
  phoneNumbers: string;
  cart: Product[];
};
