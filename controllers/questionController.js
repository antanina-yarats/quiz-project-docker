import * as questionService from "../services/questionService.js";
import * as topicService from "../services/topicService.js";
import { validate, required, minLength } from "../deps.js";

const questionValidationRules = {
  questionText: [required, minLength(2)],
}

const getQuestions = async ({ render, params, state }) => {
  const topicId = params.id; 
  const title = await topicService.getTopicTitle(topicId); 
  const questions = await questionService.getQuestions(topicId);
  const currentUser = state.currentUser; 


  render("question.eta", {
    title,
    questions,
    topicId, 
    currentUser,
  });
};


const addQuestionPage = async ({ params, render }) => {
  const topicId = params.id;
  const topicName = await topicService.getTopicTitle(topicId);  
  
  render("add-question.eta", {
    topicId,  
    topicName, 
  });
};

const addQuestion = async ({ request, params, response, render }) => {
  const topicId = params.id;
  const body = await request.body({ type: "form" }).value;
  const questionText = body.get("questionText");
  const options = body.getAll("options[]");
  const correctOptionIndex = body.get("isCorrect");

  const [passes, errors] = await validate ({ questionText }, questionValidationRules);

  if(!passes) {
    
    render("add-question.eta", {
      title: "Add Question",
      topicId,
      questionText,
      validationErrors: errors,
      options,
      correctOptionIndex,
    });

    return;
  }

  const correctOption = parseInt(correctOptionIndex);
  
  const result = await questionService.addQuestion(topicId, questionText);
  

  options.forEach((optionText, index) => {
    const isCorrect = index === correctOption; 
    questionService.addOptionToQuestion(result.id, optionText, isCorrect);
  });

  response.redirect(`/topics/${topicId}`);

};

const getQuestionDetails = async (ctx) => {
  const { topicId, questionId } = ctx.params;

  try {
    const question = await questionService.getQuestionById(questionId);
    const options = await questionService.getOptionsByQuestionId(questionId);

    if (!question) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Question not found" };
      return;
    }

    ctx.render("question-detail.eta", {
      question,
      options,
      topicId,      
      questionId,   
    });
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal server error" };
  }
};


const deleteQuestion = async ({ params, response }) => {
  const { topicId, questionId } = params;

  try {
    await questionService.deleteQuestion(questionId);
    response.redirect(`/topics/${topicId}`);
  } catch (error) {
    response.redirect(`/topics/${topicId}`);
  }
};

const submitAnswer = async ({ request, params, response }) => {
  const { topicId, questionId } = params; 
  const body = await request.body({ type: "form" }).value;
  const selectedOptionId = body.get("selectedOption"); 
  try {
    const selectedOption = await questionService.getOptionById(selectedOptionId);
    if (!selectedOptionId) {
      response.redirect(`/topics/${topicId}/questions/${questionId}`);
      return;
  }
  

    await questionService.recordAnswer(questionId, selectedOptionId);

    if (selectedOption.is_correct) {
      response.redirect(`/topics/${topicId}/questions/${questionId}/correct`);
    } else {
      response.redirect(`/topics/${topicId}/questions/${questionId}/incorrect`);
    }
  } catch (error) {
    response.status = 500;
    response.body = { error: "Internal server error" };
  }
};


const showCorrectPage = async ({ params, render }) => {
  const { topicId, questionId } = params; 
  render("correct.eta", { topicId, questionId }); 
};

const showIncorrectPage = async ({ params, render }) => {
  const { topicId, questionId } = params; 
  render("incorrect.eta", { topicId, questionId }); 
};





  export { getQuestions, addQuestion, addQuestionPage, getQuestionDetails, deleteQuestion, submitAnswer,showCorrectPage, showIncorrectPage};