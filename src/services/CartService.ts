import { apiUrl } from "../utils/global_config";
import { postRequest } from "../utils/ajax";
import { CartItem } from "../assets/Interface";
import { getRequestInit } from "./Global";

export const GetUserCart = async (user_id: number): Promise<CartItem[]> => {
  const url = apiUrl + "/cart/get/" + user_id.toString();
  return await fetch(url, getRequestInit())
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const GetCartItems = async (
  cartItem_ids: Set<number>
): Promise<CartItem[]> => {
  const prefix = "id=";
  let is_first = true;
  let url = apiUrl + "/cart/get-items";
  const id = cartItem_ids[Symbol.iterator]();
  for (let i = 0; i < cartItem_ids.size; i++) {
    if (is_first) {
      is_first = false;
      url += "?" + prefix + id.next().value;
    } else url += "&" + prefix + id.next().value;
  }
  return fetch(url, getRequestInit())
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const AddCartItem = async (
  user_id: number,
  book_id: number,
  num: number
) => {
  let url = apiUrl + "/cart/add";
  url += "?user_id=" + user_id.toString();
  url += "&book_id=" + book_id.toString();
  url += "&num=" + num.toString();
  await postRequest(url);
};

export const MinusCartItemNum = async (item_id: number, num: number) => {
  let url = apiUrl + "/cart/minus-num";
  url += "?item_id=" + item_id.toString();
  url += "&num=" + num.toString();
  await postRequest(url);
};

export const AddCartItemNum = async (item_id: number, num: number) => {
  let url = apiUrl + "/cart/add-num";
  url += "?item_id=" + item_id.toString();
  url += "&num=" + num.toString();
  await postRequest(url);
};

export const DeleteCartItem = async (item_id: number) => {
  let url = apiUrl + "/cart/delete";
  url += "?item_id=" + item_id.toString();
  await postRequest(url);
};
