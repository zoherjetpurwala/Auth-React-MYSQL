import express from "express";
import {  authentication, login, logout, register } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
// router.route("/checkauth").post(checkAuth);
router.route("/checkauth").get( authentication);
router.route("/logout").get(logout);



export default router;
