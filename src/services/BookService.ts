import { postRequest_1, postRequest_2 } from "../utils/ajax";
import { apiUrl } from "../config-overrides";

export const getBook = async (id: number, callback: any) => {
  const url = apiUrl + "/getBook/" + id.toString();
  await postRequest_1(url, callback);
};

export const getAllBooks = async (callback: any, callback2: any) => {
  const url = apiUrl + "/getBooks";
  await postRequest_2(url, callback, callback2);
};
