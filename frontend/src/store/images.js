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

export const deleteImage = (url) => async (dispatch) => {
  const res = await csrfFetch('/api/images', {
    method: 'DELETE',
    body: JSON.stringify(url)
  });

  if (res.ok) {
    const deleted = await res.json();
    return deleted;
  }
}
