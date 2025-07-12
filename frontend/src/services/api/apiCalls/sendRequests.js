import { axiosInstance } from "../../axiosInstance";
import { apiErrorHandler } from "../apiErrorHandling";

export const sendRequests = async (fromUserId, toUserId) => {
  try {
    const response = await axiosInstance.post("/sendrequests", {
      fromUserId,
      toUserId,
    });
    return response.data;
  } catch (err) {
    return apiErrorHandler(err);
  }
};
