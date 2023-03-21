import React from "react";

export interface BookInfo_ {
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

export interface CartItem {
  id: number;
  book: BookInfo_;
  item_number: number;
}

export interface Navi_ {
  key: number;
  label: string;
  icon: any; //an antd icon type
  link: string;
}

export interface User {
  id: number;
  name: string;
  avatar: string;
  about_me: string;
  cart: CartItem[];
  bought: CartItem[];
  isAdmin: boolean;
}
