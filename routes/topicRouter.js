import { Router } from "../deps.js";
import * as topicController from "../controllers/topicController.js";


const topicRouter = new Router();

topicRouter.get("/topics", topicController.showTopicsPage); // List of topics
topicRouter.post("/topics/add", topicController.addTopic);
topicRouter.post("/topics/:id/delete", topicController.deleteTopicById);

topicRouter.get("/topics/:id", topicController.showTopicDetails); 



export default topicRouter;
