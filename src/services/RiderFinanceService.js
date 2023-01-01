import axios from "../constants/AxiosConfig";

export const get = async (body) => {
  try {
    const response = await axios.get(
      `/api/admin/finance/GetRiderFinance?PageNumber=${body.pageNumber}&PageSize=${body.pageSize}&q=${body.search}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getById = async (body) => {
  try {
    debugger;
    const response = await axios.get(
      `/api/admin/finance/GetRiderFinanceDetail?riderId=${body.id}&PageNumber=${body.pageNumber}&PageSize=${body.pageSize}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const pay = async (id, amount) => {
  try {
    const response = await axios.post(
      `/api/admin/finance/ReceivePayment?riderId=${id}&amount=${amount}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
