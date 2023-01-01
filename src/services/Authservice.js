import axios from "../constants/AxiosConfig";

export const login = async (body) => {
  try {
    const response = await axios.post("/api/admin/account/login", body);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const forgotPassword = async (body) => {
  try {
    const response = await axios.post(
      "/api/admin/account/forgotpassword?email=" + body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
