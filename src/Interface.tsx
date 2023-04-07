import React from "react";

export interface Picture {
  id: number;
  url: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  price: number;
  pub: string;
  stock: number;
  sales: number;
  pics: Picture[];
}

export interface CartItem {
  id: number;
  number: number;
  book: Book;
}

export interface OrderItem {
  id: number;
  number: number;
  book: Book;
}

export interface Order {
  id: number;
  time: Date;
  items: OrderItem[];
}

export interface User {
  id: number;
  name: string;
  avatar: string;
  about: string;
  isAdmin: boolean;
  isBlocked: boolean;
  cart: CartItem[];
  orders: Order[];
  password: string;
}

export interface Navi_ {
  key: number;
  label: string;
  icon: any; //an antd icon type
  link: string;
}

interface sessionData {
  id: number;
  isBlocked: boolean;
  userType: number;
  username: string;
}

export interface sessionMsg {
  status: number;
  msg: string;
  data: sessionData;
}
