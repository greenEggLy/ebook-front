import { postRequest } from "../utils/ajax";
import { apiUrl, postJSONRequestInit } from "../utils/global_config";
import React from "react";
import { Book } from "../assets/Interface";
import { getRequestInit } from "./Global";

export const GetBook = async (id: number): Promise<Book> => {
  const url = apiUrl + "/book/" + id.toString();
  return await fetch(url, getRequestInit())
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const GetAllBook = async (): Promise<Book[]> => {
  const url = apiUrl + "/book/all";
  return await fetch(url, getRequestInit())
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const ModBookCover = async (id: number, cover: string) => {
  const url = apiUrl + "/book/cover";
  let form = new FormData();
  form.append("book_id", id.toString());
  form.append("cover", cover);
  const postOpt: RequestInit = {
    method: "POST",
    body: form,
  };
  return await fetch(url, postOpt);
};

export const DelBook = async (id: React.Key) => {
  const url = apiUrl + "/book/delete?book_id=" + id.toString();
  await postRequest(url);
};

export const addBook = async (newBook: Book): Promise<Response> => {
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
    cover: newBook.cover,
  };
  let body = JSON.stringify(json);
  return await fetch(url, postJSONRequestInit(body));
};

export const modBook = async (book: Book): Promise<Response> => {
  const url = apiUrl + "/book";
  let body = JSON.stringify(book);
  return await fetch(url, postJSONRequestInit(body));
};
