import { apiUrl } from "../utils/global_config";

export const addPic = async (book_id: number, pic_url: string) => {
  let url = apiUrl + "/addPic";
  let form = new FormData();
  form.append("book_id", book_id.toString());
  form.append("pic_url", pic_url);
  const postOpt: RequestInit = {
    method: "POST",
    body: form,
  };
  await fetch(url, postOpt);
};
