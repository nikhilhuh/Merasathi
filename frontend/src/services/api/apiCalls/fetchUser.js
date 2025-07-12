import { axiosInstance } from "../../axiosInstance";
import { apiErrorHandler } from "../apiErrorHandling";

export const fetchUser = async (email) => {
  try {
    const response = await axiosInstance.post("/fetchuser", {
      email,
    });
    return response.data;
  } catch (err) {
    return apiErrorHandler(err);
  }
};
