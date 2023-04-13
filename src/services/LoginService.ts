import {
  apiUrl,
  postJSONRequestInit,
  postRequestInit,
} from "../config-overrides";
import { message } from "antd";
import { backMsg, LogInForm, SignUpForm } from "../Interface";

export const login = async (
  username: string,
  password: string,
  callback: any
) => {
  let body: LogInForm = {
    username: username,
    password: password,
  };
  let json = JSON.stringify(body);
  const url = apiUrl + "/login";
  await fetch(url, postJSONRequestInit(json))
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    });
};

export const check_session = async (callback: any) => {
  // set sessionMsg
  let username = localStorage.getItem("user");
  if (username === null) {
    message.error("尚未登陆！");
    window.location.replace("/login");
    return;
  }
  const url = apiUrl + "/session/check";
  console.log(url);
  await fetch(url, postRequestInit)
    .then((response) => response.json())
    .then((data) => {
      console.table(data);
      callback(data);
    });
};

export const logout = async () => {
  const url = apiUrl + "/logout";
  localStorage.clear();
  await fetch(url, postRequestInit);
};

export const signup = async (
  username: string,
  email: string,
  password: string,
  callback: any
) => {
  const url = apiUrl + "/signup";
  const json: SignUpForm = {
    username: username,
    email: email,
    password: password,
  };
  const body = JSON.stringify(json);
  await fetch(url, postJSONRequestInit(body))
    .then((response) => response.json())
    .then((data: backMsg) => callback(data));
};
