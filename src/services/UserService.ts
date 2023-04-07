import { apiUrl } from "../config-overrides";
import { postRequest_1, setRequest } from "../utils/ajax";
import { sessionMsg } from "../Interface";
import { CheckSession } from "./LoginService";

export const getUser = async (callback: any) => {
  let username = localStorage.getItem("user");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let msg: sessionMsg;
  console.log(username);
  if (username !== null) {
    await CheckSession(username, (data: sessionMsg) => {
      msg = data;
    }).then(async () => {
      const url = apiUrl + "/getUserByName?username=" + username;
      await postRequest_1(url, callback);
    });
  }
};

export const modUserName = async (user_id: number, username: string) => {
  let url =
    apiUrl +
    "/modUserName?user_id=" +
    user_id.toString() +
    "&username=" +
    username;
  await setRequest(url);
};

export const modUserAbout = async (user_id: number, about: string) => {
  let url =
    apiUrl + "/modUserAbout?user_id=" + user_id.toString() + "&about=" + about;
  await setRequest(url);
};
