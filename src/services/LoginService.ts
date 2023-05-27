import {
  apiUrl,
  postJSONRequestInit,
  postRequestInit,
} from "../utils/global_config";
import { LogInForm, Msg, SignUpForm } from "../assets/Interface";
import { LoginFaultMsg } from "../assets/data/emptyData";

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

export const check_session = async (): Promise<Msg> => {
  let username = localStorage.getItem("user");
  if (username === null) {
    return LoginFaultMsg;
  }
  const url = apiUrl + "/session/check";
  return await fetch(url, postRequestInit).then((response) => response.json());
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
    .then((data: Msg) => callback(data));
};
