import axios from "../constants/AxiosConfig";

export const getChoices = async (restaurantId) => {
  try {
    const response = await axios.get(
      `/api/lookups/GetChoiceGroups?restaurantId=${restaurantId}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getChoicesData = async (body, id) => {
  try {
    const response = await axios.get(
      `/api/admin/choicegroups/GetChoiceGroups?PageNumber=${body.pageNumber}&PageSize=${body.pageSize}&restaurantId=${id}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getChoice = async (body) => {
  try {
    const response = await axios.get(
      "/api/admin/choicegroups/getchoicegroup/" + body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const update = async (id, body) => {
  try {
    const response = await axios.put(
      "/api/admin/choicegroups/updatechoicegroup/" + id,
      body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const save = async (body) => {
  try {
    const response = await axios.post(
      "/api/admin/choicegroups/savechoicegroup",
      body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteSomething = async (body) => {
  try {
    const response = await axios.delete(
      "/api/admin/choicegroups/deletechoicegroup/" + body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
