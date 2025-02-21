import { validate, required, minLength } from "../../deps.js";

const questionValidationRules = {
    questionText: [required, minLength(2)],
};

let questions = [];
let options = [];

let currentQuestionId = 1;
let currentOptionId = 1;

const addQuestion = async (topicId, questionText) => {
    const [passes, errors] = await validate({ questionText }, questionValidationRules);
    if(!passes) {
        return { success: false, errors};
    }

    const question = { id: currentQuestionId++, topicId, text: questionText };
    questions.push(question);
    return { success: true, id: question.id}; 

}

const getQuestions = async (topicId) => {
    return questions.filter(q => q.topicId === topicId);
};

const getQuestionById = async (questionId) => {
    return questions.find(q => q.id === parseInt(questionId)) || null;
};

const addOptionToQuestion = async (questionId, optionText, isCorrect) => {
    
    const option = { id: currentOptionId++, questionId, text: optionText, is_correct: isCorrect };
    options.push(option);
    return option;
};

const getOptionsByQuestionId = async (questionId) => {
    return options.filter(o => o.questionId === parseInt(questionId));
};

const getOptionById = async (optionId) => {
    return options.find(o=>o.id === parseInt(optionId))|| null;
}

const deleteQuestion = async (questionId) => {
    questions = questions.filter(q => q.id !== parseInt(questionId));
    options = options.filter(o=>o.questionId !== parseInt(questionId));
};

const clearMockData = () => {
    questions = [],
    options = [],
    currentQuestionId = 1,
    currentOptionId = 1;
}

export {
    addQuestion,
    getQuestions,
    getQuestionById,
    addOptionToQuestion,
    getOptionsByQuestionId,
    getOptionById,
    deleteQuestion,
    clearMockData,
  };


