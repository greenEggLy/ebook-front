export const apiUrl: string = "http://localhost:8080";

export const getRequestInit: RequestInit = {
  method: "GET",
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:8080",
    "Access-Control-Allow-Credentials": "http://localhost:8080",
  },
  credentials: "include",
};

export const postRequestInit: RequestInit = {
  method: "POST",
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:8080",
    "Access-Control-Allow-Credentials": "http://localhost:8080",
  },
  credentials: "include",
};

export const postJSONRequestInit = (body: string) => {
  let request: RequestInit = {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:8080",
      "Access-Control-Allow-Credentials": "http://localhost:8080",
    },
    credentials: "include",
  };
  return request;
};
