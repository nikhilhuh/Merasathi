import { axiosInstance } from "../../axiosInstance";
import { apiErrorHandler } from "../apiErrorHandling";

export const updateProfile = async (userId, updates) => {
  try {
    const response = await axiosInstance.put("/updateprofile", {
      userId,
      updates
    });
    return response.data;
  } catch (err) {
    return apiErrorHandler(err);
  }
};
