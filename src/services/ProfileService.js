import axios from "../constants/AxiosConfig";

export const getById = async (body) => {
  try {
    const response = await axios.get("/api/admin/profile/getuser/" + body);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const update = async (id, body) => {
  try {
    const response = await axios.put("/api/admin/profile/update/" + id, body);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const updateProfile = async (userId, profilePath) => {
  try {
    debugger;
    const response = await axios.put(
      `/api/admin/profile/updatepicture/${userId}?profilePicture=${profilePath}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
