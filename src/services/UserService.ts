import { apiUrl, postJSONRequestInit } from "../config-overrides";
import { getRequest, postRequest } from "../utils/ajax";
import { ManUserInfo, backMsg, UserUinfo } from "../Interface";
import { check_session } from "./LoginService";
import { message } from "antd";

export const getUser = async (username: string, callback: any) => {
  const url = apiUrl + "/user/get/" + username;
  await getRequest(url, callback);
};

export const get_user = async (id: number, callback: any) => {
  const url = apiUrl + "/user/get/" + id.toString();
  await getRequest(url, callback);
};

export const mod_user_name = async (user_id: number, username: string) => {
  let url =
    apiUrl +
    "/modUserName?user_id=" +
    user_id.toString() +
    "&username=" +
    username;
  await postRequest(url);
};

export const mod_user_about = async (user_id: number, about: string) => {
  let url =
    apiUrl + "/modUserAbout?user_id=" + user_id.toString() + "&about=" + about;
  await postRequest(url);
};

export const mode_user_uinfo = async (
  user_id: number,
  username: string,
  avatar: string,
  about: string,
  email: string
) => {
  let url = apiUrl + "/user/uinfo/mod";
  let u_info: UserUinfo = {
    id: user_id,
    username: username,
    avatar: avatar,
    about: about,
    email: email,
  };
  let json = JSON.stringify(u_info);
  await fetch(url, postJSONRequestInit(json));
};

export const get_all_users = async (callback: any) => {
  let url = apiUrl + "/user/info/get/all";
  await getRequest(url, callback);
};

export const mod_user_info = async (user_info: ManUserInfo) => {
  let url = apiUrl + "/user/info/mod";
  const json = JSON.stringify(user_info);
  console.log(json);
  await fetch(url, postJSONRequestInit(json));
};

export const get_user_info = async (user_id: number, callback: any) => {
  let url = apiUrl + "/user/info/get/" + user_id.toString();
  await getRequest(url, callback);
};
