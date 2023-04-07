import { apiUrl } from "../config-overrides";
import { postRequest_2, setRequest } from "../utils/ajax";
import { CartItem } from "../Interface";

export const getUserOrders = async (
  user_id: number | undefined,
  callback: any,
  callback2: any
) => {
  if (user_id !== undefined) {
    const url = apiUrl + "/getUserOrders?user_id=" + user_id.toString();
    await postRequest_2(url, callback, callback2);
  }
};

export const createOrder = async (
  user_id: number,
  items: CartItem[] | undefined
) => {
  if (items) {
    let url = apiUrl + "/addOrder?user_id=" + user_id.toString();
    for (let item of items) {
      url += "&item_id=" + item.id.toString();
    }
    console.log(url);
    await setRequest(url);
  }
};

export const createOrderDirectly = async (
  user_id: number,
  book_id: number,
  num: number
) => {
  let url = apiUrl + "/addOrderDirectly";
  url +=
    "?user_id=" +
    user_id.toString() +
    "&book_id=" +
    book_id.toString() +
    "&num=" +
    num.toString();
  console.log(url);
  await setRequest(url);
};
