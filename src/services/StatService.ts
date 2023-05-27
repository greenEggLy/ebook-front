import { apiUrl } from "../utils/global_config";
import { getRequestInit } from "./Global";
import {
  Order,
  StatBookMoney,
  StatBookSales,
  StatUserMoney,
} from "../assets/Interface";

export const StatUserByMoney = async (
  earlier: string,
  later: string
): Promise<StatUserMoney[]> => {
  let url = `${apiUrl}/order/money/user`;
  url += `?earlier=${earlier}&later=${later}`;
  return await fetch(url, getRequestInit())
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const StatBookBySales = async (
  earlier: string,
  later: string
): Promise<StatBookSales[]> => {
  let url = `${apiUrl}/order/sales`;
  url += `?earlier=${earlier}&later=${later}`;
  return await fetch(url, getRequestInit())
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const StatBookByMoney = async (
  earlier: string,
  later: string
): Promise<StatBookMoney[]> => {
  let url = `${apiUrl}/order/money`;
  url += `?earlier=${earlier}&later=${later}`;
  return await fetch(url, getRequestInit())
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const StatOneBookBySales = async (
  user_id: number,
  earlier: string,
  later: string
): Promise<StatBookSales[]> => {
  let url = `${apiUrl}/order/sales/one/${user_id}`;
  url += `?earlier=${earlier}&later=${later}`;
  return await fetch(url, getRequestInit())
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const StatOneBookByMoney = async (
  user_id: number,
  earlier: string,
  later: string
): Promise<StatBookMoney[]> => {
  let url = `${apiUrl}/order/money/one/${user_id}`;
  url += `?earlier=${earlier}&later=${later}`;
  return await fetch(url, getRequestInit())
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const StatOneOrdersByTime = async (
  user_id: number,
  earlier: string,
  later: string
): Promise<Order[]> => {
  let url = `${apiUrl}/order/time/${user_id}`;
  url += `?earlier=${earlier}&later=${later}`;
  return await fetch(url, getRequestInit())
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
