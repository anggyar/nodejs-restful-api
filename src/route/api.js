import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const userRouter = new express.Router(); //Memanggil fungsi Router dari Express
userRouter.use(authMiddleware);

// userController bisa di call karena, menggunakan export default
userRouter.get("/api/users/current", userController.get); //Post /api/user dengan controller register.
userRouter.patch("/api/users/current", userController.update);

export { userRouter };
