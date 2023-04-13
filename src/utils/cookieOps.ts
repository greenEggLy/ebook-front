import Cookies from "universal-cookie";

export function setExpireDate(ex_days: number) {
  let d = new Date();
  d.setTime(d.getTime() + ex_days * 24 * 60 * 60 * 1000);
  return d;
}

export function deleteUser() {
  let cookies = new Cookies();
  cookies.remove("user");
}
