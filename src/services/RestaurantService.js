import axios from "../constants/AxiosConfig";

export const get = async (body) => {
  try {
    const response = await axios.get(
      `/api/admin/restaurants/getrestaurants?PageNumber=${body.pageNumber}&PageSize=${body.pageSize}&q=${body.search}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getById = async (body) => {
  try {
    const response = await axios.get(
      "/api/admin/restaurants/getrestaurant/" + body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const Accept = async (body) => {
  try {
    const response = await axios.patch(
      "/api/admin/restaurants/ApproveRestaurant/" + body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const Reject = async (body) => {
  try {
    const response = await axios.patch(
      "/api/admin/restaurants/blockrestaurant/" + body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteSomething = async (body) => {
  try {
    const response = await axios.delete(
      "/api/admin/restaurants/DeleteRestaurant/" + body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const update = async (id, body) => {
  try {
    const response = await axios.put(
      "/api/admin/restaurants/updaterestaurant/" + id,
      body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const save = async (body) => {
  try {
    const response = await axios.post(
      "/api/admin/restaurants/saverestaurant",
      body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const uploadImage = async (body) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  try {
    const response = await axios.post("/api/files", body, config);
    return response;
  } catch (error) {
    return error.response;
  }
};
