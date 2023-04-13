import { apiUrl } from "../config-overrides";
import { getRequest, postRequest } from "../utils/ajax";

export const get_cart_by_user = async (user_id: number, callback: any) => {
  if (user_id !== undefined) {
    const url = apiUrl + "/cart/get/" + user_id.toString();
    await getRequest(url, callback);
  }
};

export const getCartItems = async (
  cartItem_ids: Set<number>,
  callback: any
) => {
  if (cartItem_ids) {
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
    // console.log(url);
    await getRequest(url, callback);
  }
};

export const addCartItem = async (
  user_id: number,
  book_id: number,
  num: number
) => {
  let url = apiUrl + "/cart/add";
  url += "?user_id=" + user_id.toString();
  url += "&book_id=" + book_id.toString();
  url += "&num=" + num.toString();
  // console.log(url);
  await postRequest(url);
};

export const minusCartItemNum = async (item_id: number, num: number) => {
  let url = apiUrl + "/cart/minus-num";
  url += "?item_id=" + item_id.toString();
  url += "&num=" + num.toString();
  await postRequest(url);
};

export const addCartItemNum = async (item_id: number, num: number) => {
  let url = apiUrl + "/cart/add-num";
  url += "?item_id=" + item_id.toString();
  url += "&num=" + num.toString();
  await postRequest(url);
};

export const deleteCartItem = async (item_id: number) => {
  let url = apiUrl + "/cart/delete";
  url += "?item_id=" + item_id.toString();
  // console.log(url);
  await postRequest(url);
};
