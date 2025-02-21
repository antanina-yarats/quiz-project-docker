

import { Application, Router, Session } from "./deps.js";

import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { serveStaticMiddleware } from "./middlewares/serveStaticMiddleware.js";
import { userMiddleware } from "./middlewares/userMiddleware.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

import topicRouter from "./routes/topicRouter.js";
import questionRouter from "./routes/questionRouter.js";
import mainRouter from "./routes/mainRouter.js";
import quizRouter from "./routes/quizRouter.js";
import authRouter from "./routes/authRouter.js";


const app = new Application();

app.use(Session.initMiddleware());

app.use(errorMiddleware);
app.use(authMiddleware);
app.use(userMiddleware);


app.use(serveStaticMiddleware);
app.use(renderMiddleware);


//Routes for pages

app.use(mainRouter.routes());
app.use(mainRouter.allowedMethods());

app.use(authRouter.routes());
app.use(authRouter.allowedMethods());

app.use(quizRouter.routes());
app.use(quizRouter.allowedMethods());

app.use(topicRouter.routes());
app.use(topicRouter.allowedMethods());

app.use(questionRouter.routes());
app.use(questionRouter.allowedMethods());




console.log("Server is running on http://localhost:7777");

await app.listen({ port: 7777 });




