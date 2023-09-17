import {apiUrl} from "../utils/global_config";
import {getRequestInit} from "./Global";
import {IOrder, IStatBookMoney, IStatBookSales, IStatUserMoney,} from "../assets/Interface";

export const StatUserByMoney = async (
    earlier: string,
    later: string
): Promise<IStatUserMoney[]> => {
    let url = `${apiUrl}/order/money/user`;
    url += `?earlier=${earlier}&later=${later}`;
    return await fetch(url, getRequestInit())
        .then((res) => res.json())
        .catch((err) => console.error(err));
};

export const StatBookBySales = async (
    earlier: string,
    later: string
): Promise<IStatBookSales[]> => {
    let url = `${apiUrl}/order/sales`;
    url += `?earlier=${earlier}&later=${later}`;
    return await fetch(url, getRequestInit())
        .then((res) => res.json())
        .catch((err) => console.error(err));
};

export const StatBookByMoney = async (
    earlier: string,
    later: string
): Promise<IStatBookMoney[]> => {
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
): Promise<IStatBookSales[]> => {
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
): Promise<IStatBookMoney[]> => {
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
): Promise<IOrder[]> => {
    let url = `${apiUrl}/order/time/${user_id}`;
    url += `?earlier=${earlier}&later=${later}`;
    return await fetch(url, getRequestInit())
        .then((res) => res.json())
        .catch((err) => console.error(err));
};
