import { assertEquals } from "../deps.js";
import { getTopics } from "../controllers/quizApiController.js";

const fetchQuizTopic = async() => {
  return [{ id: 1, name: "Mock Topic"}]
};

const mockQuizService = {
  getAllTopics: fetchQuizTopic,
};

Deno.test("API Health Check: GET /api/quiz/topics should return a response", async () => {
  const ctx = {
    response: {
      body: {},
      status: 0
    },
    state: { quizService: mockQuizService },
  };

    await getTopics(ctx);

    assertEquals(ctx.response.status !== 500, true);
});

