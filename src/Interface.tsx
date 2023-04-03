import React from "react";

export interface Book {
  id: number;
  title: string;
  author: string;
  ISBN: string;
  price: number;
  pics: string[];
  pub: string;
  left_number: number;
  bought_number: number;
}

export interface Good {
  id: number;
  book: Book;
  item_number: number;
}

export interface Order {
  id: number;
  items: Good[];
  time: Date;
  // buyer: User;
}

export interface User {
  id: number;
  name: string;
  avatar: string;
  about_me: string;
  cart: Good[];
  orders: Order[];
  password: string;
  isAdmin: boolean;
}

export interface Navi_ {
  key: number;
  label: string;
  icon: any; //an antd icon type
  link: string;
}
