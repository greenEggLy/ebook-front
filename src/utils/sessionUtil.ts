import {IMsg} from "../assets/Interface";

export const adminSessionCheck = (
    msg: IMsg
): { ok: boolean; msg: string; path: string } => {
    if (msg.status !== 0) return {ok: false, msg: msg.msg, path: "/login"};
    if (!msg.data.is_admin)
        return {ok: false, msg: "没有管理员权限!", path: "/"};
    return {ok: true, msg: "", path: ""};
};

export const sessionCheck = (
    msg: IMsg
): { ok: boolean; msg: string; path: string } => {
    if (msg.status !== 0) return {ok: false, msg: msg.msg, path: "/login"};
    return {ok: true, msg: "", path: ""};
};
