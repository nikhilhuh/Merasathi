import { axiosInstance } from "../../axiosInstance";
import { apiErrorHandler } from "../apiErrorHandling";

export const suggestions = async (userId) => {
  try {
    const response = await axiosInstance.get("/suggestions", {
      params: { userId }
    });
    return response.data;
  } catch (err) {
    return apiErrorHandler(err);
  }
};
