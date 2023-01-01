import axios from "../constants/AxiosConfig";

export const get = async () => {
  try {
    const response = await axios.get(`/api/admin/Constants/GetConstants`);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const update = async (id, body) => {
  try {
    debugger;
    const response = await axios.put(
      "/api/admin/constants/updateconstant/" + id,
      body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
