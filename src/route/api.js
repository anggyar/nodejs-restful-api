import express from "express";
import userController from "../controller/user-controller.js";
import contactController from "../controller/contact-controller.js";
import addressController from "../controller/address-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const userRouter = new express.Router(); //Memanggil fungsi Router dari Express
userRouter.use(authMiddleware);

// ! User API
// userController bisa di call karena, menggunakan export default
userRouter.get("/api/users/current", userController.get); //Post /api/user dengan controller register.
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

//! Contact API
userRouter.post("/api/contacts", contactController.create);
userRouter.get("/api/contacts/:contactId", contactController.get);
userRouter.put("/api/contacts/:contactId", contactController.update);
userRouter.delete("/api/contacts/:contactId", contactController.remove);
userRouter.get("/api/contacts", contactController.search);

// ! Address API
userRouter.post("/api/contacts/:contactId/addresses", addressController.create);
userRouter.put(
    "/api/contacts/:contactId/addresses/:addressId",
    addressController.update
);
userRouter.get(
    "/api/contacts/:contactId/addresses/:addressId",
    addressController.get
);
userRouter.delete(
    "/api/contacts/:contactId/addresses/:addressId",
    addressController.remove
);
userRouter.get("/api/contacts/:contactId/addresses", addressController.list);

export { userRouter };
