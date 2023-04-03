import { Users } from "../data";
import Cookies from "universal-cookie";

export function getUser() {
  let cookies = new Cookies();
  let user_id = cookies.get("user");
  if (user_id !== "") {
    return Users.find((user) => user.id === Number(user_id));
  }
}

export function setExpireDate(exdays: number) {
  let d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  return d;
}

export function deleteUser() {
  let cookies = new Cookies();
  cookies.remove("user");
}
