import * as quizService from "../services/quizService.js";

//quizService is in getTopics for unit-tests (to check API health)

const getTopics = async ({ response, state }) => {
  const service = state.quizService || quizService; // state for tests, fallback for app
  
  try {
    const topics = await service.getAllTopics();
    response.body = { topics };
  } catch (error) {
    console.error("Error fetching topics:", error.message);
    response.status = 500;
    response.body = { error: "Failed to fetch topics" };
  }
};


const getRandomQuestion = async ({ params, response }) => {
  const topicId = params.topicId;

  try {
    const question = await quizService.getRandomQuestionByTopicId(topicId);

    if (question) {
      const options = await quizService.getOptionsForQuestion(question.id);
      response.body = { question: { ...question, options } }; 
    } else {
      response.body = { question: null };
    }
  } catch (error) {
    console.error("Error fetching random question:", error.message);
    response.status = 500;
    response.body = { error: "Failed to fetch random question" };
  }
};

const submitAnswer = async ({ params, request, response }) => {
  const questionId = params.questionId;
  const body = await request.body({ type: "json" }).value;
  const selectedOptionId = body.selectedOptionId;

  try {
    const isCorrect = await quizService.checkAnswer(questionId, selectedOptionId);
    response.status = 200;
    response.body = { correct: isCorrect };
  } catch (error) {
    console.error("Error submitting answer:", error.message);
    response.status = 500;
    response.body = { error: "Internal Server Error" };
  }
};

const getCorrectAnswer = async ({ params, response }) => {
  const questionId = params.questionId; 
  try {
    const correctOption = await quizService.getCorrectOptionByQuestionId(questionId); 

    response.status = 200;
    response.body = { correct: correctOption.option_text }; 
  } catch (error) {
    console.error("Error fetching correct answer:", error.message);
    response.status = 500;
    response.body = { error: "Failed to fetch correct answer" };
  }
};


export { getTopics, getRandomQuestion, submitAnswer, getCorrectAnswer};
