import { Router } from "../deps.js";
import * as registrationController from '../controllers/registrationController.js';
import * as loginController from '../controllers/loginController.js';

const authRouter = new Router();

authRouter.get("/auth/register", registrationController.showRegistrationForm);
authRouter.post("/auth/register", registrationController.registerUser);

authRouter.get("/auth/login", loginController.showLoginForm);
authRouter.post("/auth/login", loginController.loginUser);

authRouter.get("/auth/logout", loginController.logout);

export default authRouter;