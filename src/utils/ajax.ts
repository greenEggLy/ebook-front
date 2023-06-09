import { getRequestInit, postRequestInit } from "./global_config";

export let getRequest = async (url: string, callback: any) => {
  await fetch(url, getRequestInit)
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    });
};

export let postRequest = async (url: string) => {
  await fetch(url, postRequestInit);
};
