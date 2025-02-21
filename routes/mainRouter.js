import { Router } from "../deps.js";
import * as mainController from "../controllers/mainController.js";

const mainRouter = new Router();

mainRouter.get("/", mainController.showHomePage);
mainRouter.get("/user", mainController.showProfile);


export default mainRouter;