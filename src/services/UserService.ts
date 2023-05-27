import { apiUrl, postJSONRequestInit } from "../utils/global_config";
import { ManUserInfo, User, UserUinfo } from "../assets/Interface";
import { getRequestInit } from "./Global";

export const GetUser = async (id: number): Promise<User> => {
  const url = apiUrl + "/user/" + id.toString();
  return await fetch(url, getRequestInit())
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const ModUserInfo_USER = async (
  user_id: number,
  username: string,
  about: string,
  email: string
) => {
  let url = apiUrl + "/user/uinfo";
  let u_info: UserUinfo = {
    id: user_id,
    username: username,
    about: about,
    email: email,
  };
  let json = JSON.stringify(u_info);
  return await fetch(url, postJSONRequestInit(json));
};

export const GetAllUsers = async (): Promise<ManUserInfo[]> => {
  let url = apiUrl + "/user/info/all";
  return await fetch(url, getRequestInit())
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const ModUserInfo_ADMIN = async (user_info: ManUserInfo) => {
  let url = apiUrl + "/user/info/mod";
  const json = JSON.stringify(user_info);
  await fetch(url, postJSONRequestInit(json));
};

export const ModUserAvatar = async (
  user_id: number,
  avatar: string
): Promise<Response> => {
  let url = apiUrl + "/user/avatar";
  let body = {
    id: user_id,
    avatar: avatar,
  };
  return await fetch(url, postJSONRequestInit(JSON.stringify(body)));
};
