import axios from "../constants/AxiosConfig";

export const get = async (body) => {
  try {
    debugger;
    const response = await axios.get(
      `/api/admin/orders/getorders?PageNumber=${body.pageNumber}&pageSize=${body.pageSize}&q=${body.search}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getById = async (body) => {
  try {
    const response = await axios.get(
      "/api/admin/orders/getorder?orderId=" + body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getRiders = async () => {
  try {
    const response = await axios.get("/api/lookups/GetRiders");
    return response;
  } catch (error) {
    return error.response;
  }
};
export const assignOrder = async (riderId, orderId, body) => {
  try {
    const response = await axios.put(
      `/api/admin/orders/assignrider/?riderId=${riderId}&orderId=${orderId}`,
      body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
