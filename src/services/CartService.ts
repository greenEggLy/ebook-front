import { apiUrl } from "../config-overrides";
import { postRequest_1, postRequest_2, setRequest } from "../utils/ajax";

export const getUserCart = async (
  user_id: number | undefined,
  callback: any,
  callback2: any
) => {
  if (user_id !== undefined) {
    const url = apiUrl + "/getUserCart?user_id=" + user_id.toString();
    await postRequest_2(url, callback, callback2);
  }
};

export const getCartItems = async (
  cartItem_ids: Set<number>,
  callback: any
) => {
  if (cartItem_ids) {
    const prefix = "cartItem_ids=";
    let is_first = true;
    let url = apiUrl + "/getCartItems";
    const id = cartItem_ids[Symbol.iterator]();
    for (let i = 0; i < cartItem_ids.size; i++) {
      if (is_first) {
        is_first = false;
        url += "?" + prefix + id.next().value;
      } else url += "&" + prefix + id.next().value;
    }
    console.log(url);
    await postRequest_1(url, callback);
  }
};

export const addCartItem = async (
  user_id: number,
  book_id: number,
  num: number
) => {
  let url = apiUrl + "/addCart";
  url += "?user_id=" + user_id.toString();
  url += "&book_id=" + book_id.toString();
  url += "&num=" + num.toString();
  console.log(url);
  await setRequest(url);
};

export const minusCartItemNum = async (item_id: number, num: number) => {
  let url = apiUrl + "/minusCartNum";
  url += "?item_id=" + item_id.toString();
  url += "&num=" + num.toString();
  await setRequest(url);
};

export const addCartItemNum = async (item_id: number, num: number) => {
  let url = apiUrl + "/addCartNum";
  url += "?item_id=" + item_id.toString();
  url += "&num=" + num.toString();
  await setRequest(url);
};

export const deleteCartItem = async (item_id: number) => {
  let url = apiUrl + "/deleteCart";
  url += "?item_id=" + item_id.toString();
  console.log(url);
  await setRequest(url);
};
