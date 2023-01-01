import axios from "../constants/AxiosConfig";

export const get = async (body) => {
  try {
    debugger;
    const response = await axios.get(
      `/api/admin/categories/getcategories?PageNumber=${body.pageNumber}&PageSize=${body.pageSize}&q=${body.search}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const save = async (body) => {
  try {
    const response = await axios.post(
      "/api/admin/categories/saveCategory",
      body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getById = async (body) => {
  try {
    const response = await axios.get(
      "/api/admin/categories/getcategory/" + body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const update = async (id, body) => {
  try {
    const response = await axios.put(
      "/api/admin/categories/updatecategory/" + id,
      body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
