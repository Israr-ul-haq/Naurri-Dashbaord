import axios from "../constants/AxiosConfig";

export const get = async (body) => {
  try {
    const response = await axios.get(
      `/api/admin/riders/getriders?PageNumber=${body.pageNumber}&PageSize=${body.pageSize}&q=${body.search}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getById = async (body) => {
  try {
    const response = await axios.get("/api/admin/riders/getrider/" + body);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteSomething = async (body) => {
  try {
    const response = await axios.delete(
      "/api/admin/riders/deleterider/" + body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const update = async (id, body) => {
  try {
    const response = await axios.put(
      "/api/admin/riders/updaterider/" + id,
      body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const save = async (body) => {
  try {
    const response = await axios.post("/api/admin/riders/saverider", body);
    return response;
  } catch (error) {
    return error.response;
  }
};
