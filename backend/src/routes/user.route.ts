import * as express from "express"
import * as userController from "../controller/user.controller";
import Auth from "../middleware/authUser";

const userRouter = express.Router();

userRouter.get("/", Auth, userController.getUser);
userRouter.post("/", userController.createUser);
userRouter.patch("/", Auth, userController.updateUser);
userRouter.post("/login", userController.loginUser);

export default userRouter;