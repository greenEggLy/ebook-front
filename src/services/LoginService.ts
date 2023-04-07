import { apiUrl, optPOST } from "../config-overrides";

export const Login = async (
  username: string,
  password: string,
  callback: any
) => {
  let form = new FormData();
  form.append("username", username);
  form.append("password", password);
  console.log(form);
  const url = apiUrl + "/login";
  const postOpt: RequestInit = {
    method: "POST",
    body: form,
  };
  await fetch(url, postOpt)
    .then((response) => response.json())
    .then((data) => {
      callback(data);
      console.log(data);
    });
};

export const CheckSession = async (username: string, callback: any) => {
  const url = apiUrl + "/checkSession";
  await fetch(url, { method: "POST" })
    .then((response) => response.json())
    .then((data) => callback(data));
};

export const Logout = async () => {
  const url = apiUrl + "/logout";
  const username = localStorage.getItem("user");
  localStorage.clear();
  await fetch(url, optPOST);
};
