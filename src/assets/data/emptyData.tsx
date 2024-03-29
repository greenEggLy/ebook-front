import {IAuthInfo, IBook, IMsg, IUser} from "../Interface";

export const EmptyUser: IUser = {
    id: 0,
    name: "",
    avatar: "",
    about: "",
    email: "",
    is_admin: false,
    isBlocked: false,
    cart: [],
    orders: [],
};

export const emptyBook: IBook = {
    id: 0,
    title: "",
    isbn: "",
    price: 0,
    stock: 0,
    sales: 0,
    picture: "",
    pub: "",
    author: "",
    cover: "",
    deleted: false,
};

export const EmptyAuth: IAuthInfo = {
    id: 0,
    is_admin: 0,
    username: "",
};

export const emptySessionMsg: IMsg = {
    status: -1,
    msg: "",
    data: EmptyAuth,
};

export const LoginFaultMsg: IMsg = {
    status: -3,
    msg: "尚未登陆",
    data: EmptyAuth,
};
