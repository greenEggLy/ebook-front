import { getRequest, postRequest } from "../utils/ajax";
import { apiUrl, postJSONRequestInit } from "../utils/global_config";
import React from "react";
import { Book } from "../Interface";

export const get_one_book = async (id: number, callback: any) => {
  const url = apiUrl + "/getBook/" + id.toString();
  await getRequest(url, callback);
};

export const get_all_books = async (callback: any) => {
  const url = apiUrl + "/getBooks";
  await getRequest(url, callback);
};

export const modBookPic = async (id: number, pic_url: string) => {
  const url = apiUrl + "/book/mod/picture";
  let form = new FormData();
  form.append("book_id", id.toString());
  form.append("pic_url", pic_url);
  const postOpt: RequestInit = {
    method: "POST",
    body: form,
  };
  await fetch(url, postOpt);
};

export const delBook = async (id: React.Key) => {
  const url = apiUrl + "/book/delete?book_id=" + id.toString();
  await postRequest(url);
};

export const addBook = async (newBook: Book) => {
  const url = apiUrl + "/book/add";
  let json: Book = {
    id: 0,
    title: newBook.title,
    author: newBook.author,
    isbn: newBook.isbn,
    price: newBook.price,
    pub: newBook.pub,
    stock: newBook.stock,
    sales: 0,
    picture: newBook.picture,
  };
  let body = JSON.stringify(json);
  await fetch(url, postJSONRequestInit(body));
};

export const modBook = async (book: Book) => {
  const url = apiUrl + "/book/mod";
  let body = JSON.stringify(book);
  await fetch(url, postJSONRequestInit(body));
};
