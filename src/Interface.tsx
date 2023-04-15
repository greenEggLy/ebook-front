import React from "react";

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  price: number;
  pub: string;
  stock: number;
  sales: number;
  picture: string;
}

export interface CartItem {
  id: number;
  number: number;
  book: Book;
}

export interface OrderItem {
  id: number;
  price: number;
  number: number;
  book: Book;
}

export interface Order {
  id: number;
  time: Date;
  items: OrderItem[];
  buyer: User;
}

export interface Stat_Sales {
  book_name: string;
  sales: number;
}

export interface Stat_Money {
  book_name: string;
  money: number;
}

export interface User {
  id: number;
  name: string;
  avatar: string;
  about: string;
  is_admin: boolean;
  email: string;
  isBlocked: boolean;
  cart: CartItem[];
  orders: Order[];
}

export interface Navi_ {
  key: number;
  label: string;
  icon: any;
  link: string;
}

interface backData {
  userId: number;
  username: string;
  userType: number;
}

export interface backMsg {
  status: number;
  msg: string;
  data: backData;
}

export interface ManUserInfo {
  id: number;
  username: string;
  email: string;
  is_admin: boolean;
  is_blocked: boolean;
}

export interface LogInForm {
  username: string;
  password: string;
}

export interface SignUpForm {
  username: string;
  password: string;
  email: string;
}

export interface UserUinfo {
  id: number;
  username: string;
  avatar: string;
  about: string;
  email: string;
}
