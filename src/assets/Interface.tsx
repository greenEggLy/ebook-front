export interface IBook {
    cover: string;
    id: number;
    title: string;
    author: string;
    isbn: string;
    price: number;
    pub: string;
    stock: number;
    sales: number;
    picture: string;
    deleted?: boolean;
}

export interface ICartItem {
    id: number;
    number: number;
    book: IBook;
}

export interface IOrderItem {
    id: number;
    price: number;
    number: number;
    book: IBook;
}

export interface IOrder {
    id: number;
    time: Date;
    items: IOrderItem[];
    buyer: IUser;
}

export interface IStatBookSales {
    book_name: string;
    sales: number;
}

export interface IStatBookMoney {
    book_name: string;
    money: number;
}

export interface IUser {
    id: number;
    name: string;
    avatar: string;
    about: string;
    is_admin: boolean;
    email: string;
    isBlocked: boolean;
    cart: ICartItem[];
    orders: IOrder[];
}

export interface Navi_ {
    key: number;
    label: string;
    icon: any;
    link: string;
}

export interface IAuthInfo {
    id: number;
    username: string;
    is_admin: number;
}

export interface IMsg {
    status: number;
    msg: string;
    data: IAuthInfo;
}

export interface IManUserInfo {
    id: number;
    username: string;
    email: string;
    is_admin: boolean;
    is_blocked: boolean;
}

export interface ILogInForm {
    username: string;
    password: string;
}

export interface ISignUpForm {
    username: string;
    password: string;
    email: string;
}

export interface IUserUinfo {
    id: number;
    username: string;
    about: string;
    email: string;
}

export interface IStatUserMoney {
    id: number;
    username: string;
    money: number;
}
