import { axiosInstance } from "../../axiosInstance";
import { apiErrorHandler } from "../apiErrorHandling";

export const viewProfile = async (userId) => {
  try {
    const response = await axiosInstance.get("/viewprofile", {
     params: { userId }
    });
    return response.data;
  } catch (err) {
    return apiErrorHandler(err);
  }
};
