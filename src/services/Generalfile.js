import axios from "../constants/AxiosConfig";

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
