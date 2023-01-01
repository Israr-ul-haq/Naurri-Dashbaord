import axios from "../constants/AxiosConfig";

export const get = async () => {
  try {
    const response = axios.get("/api/admin/dashboard/stats");
    return response
  } catch (error) {
    return error.response
  }
}
