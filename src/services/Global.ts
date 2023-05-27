export const postRequestInit = (body: string | FormData): RequestInit => {
  const type =
    typeof body === "string" ? "application/json" : "multipart/form-data";
  return {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": type,
    },
  };
};

export const putRequestInit = (body: string | FormData): RequestInit => {
  const type =
    typeof body === "string" ? "application/json" : "multipart/form-data";
  return {
    method: "PUT",
    body: body,
    headers: {
      "Content-Type": type,
    },
  };
};

export const deleteRequestInit = (body: string | FormData): RequestInit => {
  const type =
    typeof body === "string" ? "application/json" : "multipart/form-data";
  return {
    method: "DELETE",
    body: body,
    headers: {
      "Content-Type": type,
    },
  };
};

export const getRequestInit = (): RequestInit => {
  return {
    method: "GET",
  };
};
