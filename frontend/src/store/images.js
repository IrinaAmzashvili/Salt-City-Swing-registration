import { csrfFetch } from "./csrf";

export const postImage = (url) => async (dispatch) => {
  const formData = new FormData();
  formData.append('image', url);

  const res = await csrfFetch('/api/images', {
    method: 'POST',
    headers: { "Content-Type": "multipart/form-data" },
    body: formData
  });

  if (res.ok) {
    const imgUrl = await res.json();
    return imgUrl.imgUrl;
  }
};
