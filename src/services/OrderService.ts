import { apiUrl } from "../utils/global_config";
import { CartItem, Msg, Order } from "../assets/Interface";
import { getRequestInit } from "./Global";

export const GetUserOrder = async (user_id: number): Promise<Order[]> => {
  const url = apiUrl + "/order/" + user_id.toString();
  return await fetch(url, getRequestInit())
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const getAllOrder = async (): Promise<Order[]> => {
  const url = apiUrl + "/order/all";
  return await fetch(url, getRequestInit())
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const GetOrderByTime = async (
  earlier: string,
  later: string
): Promise<Order[]> => {
  let url = `${apiUrl}/order/time/all`;
  url += `?earlier=${earlier}&later=${later}`;
  return await fetch(url, getRequestInit())
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const createOrder = async (
  user_id: number,
  items: CartItem[]
): Promise<Msg> => {
  let url = apiUrl + "/order/add?user_id=" + user_id.toString();
  for (let item of items) {
    url += "&item_id=" + item.id.toString();
  }
  return await fetch(url, { method: "POST" })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const createOrderDirectly = async (
  user_id: number,
  book_id: number,
  num: number
): Promise<Msg> => {
  let url = apiUrl + "/order/add/directly";
  url +=
    "?user_id=" +
    user_id.toString() +
    "&book_id=" +
    book_id.toString() +
    "&num=" +
    num.toString();
  return await fetch(url, { method: "POST" })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
