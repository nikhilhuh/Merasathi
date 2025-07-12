import express from "express";
import { router as signUpRoute } from "../routes/signUp";
import { router as signInRoute } from "../routes/signIn";
import { router as fetchUserRoute } from "../routes/fetchUser";
import { router as logoutRoute } from "../routes/logOut";
import { router as updateProfileRoute } from "../routes/updateProfile";
import { router as viewProfileRoute } from "../routes/viewProfile";
import { router as sendRequestRoute } from "../routes/sendRequests";
import { router as getRequestsRoute } from "../routes/getRequests";
import { router as requestStatusRoute } from "../routes/requestStatus";
import { router as suggestionsRoute } from "../routes/suggesstions";
import { router as cancelRequestsRoute } from "../routes/cancelRequests";

const mainRouter = express.Router();

// Middleware to log requests
mainRouter.use("/signup", signUpRoute);
mainRouter.use("/signin", signInRoute);
mainRouter.use("/fetchuser", fetchUserRoute);
mainRouter.use("/logout", logoutRoute);
mainRouter.use("/updateprofile", updateProfileRoute);
mainRouter.use("/viewprofile", viewProfileRoute);
mainRouter.use("/sendrequests", sendRequestRoute);
mainRouter.use("/getrequests", getRequestsRoute);
mainRouter.use("/requeststatus", requestStatusRoute);
mainRouter.use("/suggestions", suggestionsRoute);
mainRouter.use("/cancelrequests", cancelRequestsRoute);

export { mainRouter };
