import express from "express";
import userController from "../controller/user-controller.js";

const publicRouter = new express.Router(); //Memanggil fungsi Router dari Express

// userController bisa di call karena, menggunakan export default
publicRouter.post("/api/users", userController.register); //Post /api/user dengan controller register.

export { publicRouter };
