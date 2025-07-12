import { axiosInstance } from "../../axiosInstance";
import { apiErrorHandler } from "../apiErrorHandling";

export const signin = async (email, password) => {
  try {
    const response = await axiosInstance.post("/signin", {
      email,
      password,
    });
    return response.data;
  } catch (err) {
    return apiErrorHandler(err);
  }
};
