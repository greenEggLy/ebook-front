import { AuthInfo, Book, Msg, User } from "../Interface";

export const EmptyUser: User = {
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
  cover: "",
};

export const EmptyAuth: AuthInfo = {
  id: 0,
  is_admin: 0,
  username: "",
};

export const emptySessionMsg: Msg = {
  status: -1,
  msg: "",
  data: EmptyAuth,
};

export const LoginFaultMsg: Msg = {
  status: -3,
  msg: "尚未登陆",
  data: EmptyAuth,
};
