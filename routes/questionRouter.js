import { Router } from "../deps.js";
import * as questionController from "../controllers/questionController.js";


const questionRouter = new Router();

questionRouter.get("/topics/:id/questions", questionController.getQuestions);

questionRouter.get("/topics/:id/add-question", questionController.addQuestionPage); 

questionRouter.post("/topics/:id/add-question", questionController.addQuestion);

questionRouter.get("/topics/:topicId/questions/:questionId", questionController.getQuestionDetails);

questionRouter.post("/topics/:topicId/questions/:questionId", questionController.submitAnswer);

questionRouter.post("/topics/:topicId/questions/:questionId/delete", questionController.deleteQuestion);

questionRouter.get("/topics/:topicId/questions/:questionId/correct", questionController.showCorrectPage);

questionRouter.get("/topics/:topicId/questions/:questionId/incorrect", questionController.showIncorrectPage);

export default questionRouter;
