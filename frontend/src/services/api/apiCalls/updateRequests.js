import { axiosInstance } from "../../axiosInstance";
import { apiErrorHandler } from "../apiErrorHandling";

export const updateRequests = async (fromUserId, toUserId, status) => {
  try {
    const response = await axiosInstance.put("/requeststatus", {
      fromUserId,
      toUserId,
      status
    });
    return response.data;
  } catch (err) {
    return apiErrorHandler(err);
  }
};
