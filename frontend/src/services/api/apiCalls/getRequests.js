import { axiosInstance } from "../../axiosInstance";
import { apiErrorHandler } from "../apiErrorHandling";

export const getRequests = async (userId, type) => {
  try {
    const response = await axiosInstance.get("/getrequests", {
      params: { userId, type }
    });
    return response.data;
  } catch (err) {
    return apiErrorHandler(err);
  }
};
