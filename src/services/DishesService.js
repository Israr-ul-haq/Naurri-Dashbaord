import axios from "../constants/AxiosConfig";

export const get = async (body, restaurantId) => {
  try {
    const response = await axios.get(
      `/api/admin/dishes/getDishes?pageNumber=${body.pageNumber}&pageSize=${body.pageSize}&restaurantId=${restaurantId}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getById = async (body) => {
  try {
    const response = await axios.get("/api/admin/dishes/getdish/" + body);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getCategories = async () => {
  try {
    const response = await axios.get("/api/lookups/getcategories");
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getChoiceGroups = async (restaurantId) => {
  try {
    const response = await axios.get(
      `/api/lookups/GetChoiceGroups?restaurantId=${restaurantId}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const save = async (body) => {
  try {
    const response = await axios.post("/api/admin/dishes/savedish", body);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteSomething = async (body) => {
  try {
    const response = await axios.delete("/api/admin/dishes/deletedish/" + body);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const update = async (id, body) => {
  try {
    const response = await axios.put("/api/admin/dishes/updatedish/" + id, body);
    return response;
  } catch (error) {
    return error.response;
  }
};
