import { Book, CartItem, backMsg, User } from "./Interface";

export const emptyUser: User = {
  id: 0,
  name: "",
  avatar: "",
  about: "",
  email: "",
  is_admin: false,
  isBlocked: false,
  cart: [],
  orders: [],
};

export const emptyBook: Book = {
  id: 0,
  title: "",
  isbn: "",
  price: 0,
  stock: 0,
  sales: 0,
  picture: "",
  pub: "",
  author: "",
};

export const emptySessionMsg: backMsg = {
  status: -1,
  msg: "",
  data: { userId: 0, username: "", userType: 0 },
};
