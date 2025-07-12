import { axiosInstance } from "../../axiosInstance";
import { apiErrorHandler } from "../apiErrorHandling";

export const logout = async (userId) => {
  try {
    const response = await axiosInstance.post("/logout", {
      userId
    });
    return response.data;
  } catch (err) {
    return apiErrorHandler(err);
  }
};
