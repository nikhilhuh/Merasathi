import { axiosInstance } from "../../axiosInstance";
import { apiErrorHandler } from "../apiErrorHandling";

export const signup = async (name, email, password) => {
  try {
    const response = await axiosInstance.post("/signup", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (err) {
    return apiErrorHandler(err);
  }
};
