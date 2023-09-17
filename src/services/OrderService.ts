import {apiUrl} from "../utils/global_config";
import {ICartItem, IMsg, IOrder} from "../assets/Interface";
import {getRequestInit} from "./Global";

export const GetUserOrder = async (user_id: number): Promise<IOrder[]> => {
    const url = apiUrl + "/order/" + user_id.toString();
    return await fetch(url, getRequestInit())
        .then((res) => res.json())
        .catch((err) => console.error(err));
};

export const GetAllOrder = async (): Promise<IOrder[]> => {
    const url = apiUrl + "/order/all";
    return await fetch(url, getRequestInit())
        .then((res) => res.json())
        .catch((err) => console.error(err));
};

export const GetOrderByTime = async (
    earlier: string,
    later: string
): Promise<IOrder[]> => {
    let url = `${apiUrl}/order/time/all`;
    url += `?earlier=${earlier}&later=${later}`;
    return await fetch(url, getRequestInit())
        .then((res) => res.json())
        .catch((err) => console.error(err));
};

export const createOrder = async (
    user_id: number,
    items: ICartItem[]
): Promise<IMsg> => {
    let url = apiUrl + "/order/add?user_id=" + user_id.toString();
    for (let item of items) {
        url += "&item_id=" + item.id.toString();
    }
    return await fetch(url, {method: "POST"})
        .then((res) => res.json())
        .catch((err) => console.error(err));
};

export const createOrderDirectly = async (
    user_id: number,
    book_id: number,
    num: number
): Promise<IMsg> => {
    let url = apiUrl + "/order/add/directly";
    url +=
        "?user_id=" +
        user_id.toString() +
        "&book_id=" +
        book_id.toString() +
        "&num=" +
        num.toString();
    return await fetch(url, {method: "POST"})
        .then((res) => res.json())
        .catch((err) => console.error(err));
};
