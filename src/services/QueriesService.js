import axios from "../constants/AxiosConfig";

export const get = async (body) => {
  try {
    const response = await axios.get(
      `/api/admin/Queries/GetQueries?PageNumber=${body.pageNumber}&pageSize=${body.pageSize}&q=${body.search}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getById = async (body) => {
  try {
    const response = await axios.get("/api/admin/queries/getquery/" + body);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteSomething = async (body) => {
  try {
    const response = await axios.delete(
      "/api/admin/queries/deletequery/" + body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const update = async (body) => {
  try {
    debugger;
    const response = await axios.post("/api/admin/queries/replyquery", body);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const resolved = async (body) => {
  try {
    debugger;
    const response = await axios.put("/api/admin/queries/resolvequery/" + body);
    return response;
  } catch (error) {
    return error.response;
  }
};
