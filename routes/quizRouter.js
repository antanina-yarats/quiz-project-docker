import { Router } from "../deps.js";
import * as quizApiController from "../controllers/quizApiController.js";
import * as quizController from "../controllers/quizController.js";

const quizRouter = new Router();

// User-facing page
quizRouter.get("/quiz", quizController.showQuizPage);

// API Endpoints
quizRouter.get("/api/quiz/topics", quizApiController.getTopics);
quizRouter.get("/api/quiz/topics/:topicId/questions/random", quizApiController.getRandomQuestion);
quizRouter.post("/api/quiz/questions/:questionId/submit", quizApiController.submitAnswer);
quizRouter.get("/api/quiz/questions/:questionId/getCorrect", quizApiController.getCorrectAnswer);
 
export default quizRouter;
