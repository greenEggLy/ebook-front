import { optGET, optPOST } from "../config-overrides";

export let postRequest_2 = async (
  url: string,
  callback: any,
  callback2: any
) => {
  await fetch(url, optGET)
    .then((response) => response.json())
    .then((data) => {
      callback(data);
      callback2(data);
    });
};

export let postRequest_1 = async (url: string, callback: any) => {
  await fetch(url, optGET)
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    });
};

export let setRequest = async (url: string) => {
  await fetch(url, optPOST);
};
