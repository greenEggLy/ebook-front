import { apiUrl, postRequestInit } from "../config-overrides";
import { getRequest, postRequest } from "../utils/ajax";
import { CartItem, Stat_Sales } from "../Interface";

export const get_orders_by_user = async (user_id: number, callback: any) => {
  if (user_id !== undefined) {
    const url = apiUrl + "/orders/get/" + user_id.toString();
    await getRequest(url, callback);
  }
};

export const getAllOrder = async (callback: any) => {
  const url = apiUrl + "/orders/get-all";
  await getRequest(url, callback);
};

export const get_sorted_sales_bet_date = async (
  earlier: string,
  later: string,
  callback: any
) => {
  const url =
    apiUrl +
    "/order/get/sales/time/between?earlier=" +
    earlier +
    "&later=" +
    later;
  await fetch(url, postRequestInit)
    .then((response) => response.json())
    .then((data: Stat_Sales) => callback(data));
};

export const get_sorted_money_between_date = async (
  earlier: string,
  later: string,
  callback: any
) => {
  const url2 =
    apiUrl +
    "/order/get/money/time/between?earlier=" +
    earlier +
    "&later=" +
    later;
  await getRequest(url2, callback);
};

export const createOrder = async (
  user_id: number,
  items: CartItem[] | undefined
) => {
  if (items) {
    let url = apiUrl + "/order/add?user_id=" + user_id.toString();
    for (let item of items) {
      url += "&item_id=" + item.id.toString();
    }
    // console.log(url);
    await postRequest(url);
  }
};

export const createOrderDirectly = async (
  user_id: number,
  book_id: number,
  num: number
) => {
  let url = apiUrl + "/order/add/directly";
  url +=
    "?user_id=" +
    user_id.toString() +
    "&book_id=" +
    book_id.toString() +
    "&num=" +
    num.toString();
  // console.log(url);
  await postRequest(url);
};
