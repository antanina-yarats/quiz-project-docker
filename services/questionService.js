import { sql } from "../database/database.js";

const getQuestions = async (topicId) => {
  try {
    const rows = await sql`SELECT * FROM questions WHERE topic_id = ${topicId}`;
    
    if (rows && rows.length > 0) {
      return rows;
    } else {
      return [];  
    }
  } catch (error) {
    console.error("Error displaying questions on this topic", error.message);
    throw new Error("Error displaying questions");
  }
};


  const addQuestion = async (topicId, questionText) => {
    try {
      const result = await sql`
        INSERT INTO questions (topic_id, question_text) 
        VALUES (${topicId}, ${questionText}) 
        RETURNING id;`;
      return result[0]; 
    } catch (error) {
      console.error("Error adding question:", error.message);
      throw new Error("Failed to add question");
    }
  };


  const addOptionToQuestion = async (questionId, optionText, isCorrect) => {
    try {
      await sql`
        INSERT INTO question_answer_options (question_id, option_text, is_correct)
        VALUES (${questionId}, ${optionText}, ${isCorrect});`;
    } catch (error) {
      console.error("Error adding option:", error.message);
      throw new Error("Failed to add option");
    }
  };
  
  const getQuestionById = async (questionId) => {
    try {
      const rows = await sql`SELECT * FROM questions WHERE id = ${questionId}`;
      return rows[0];  
    } catch (error) {
      console.error("Error fetching question:", error.message);
      throw new Error("Failed to fetch question");
    }
  };
  

  const deleteQuestion = async (questionId) => {
    try {
      await sql`DELETE FROM questions WHERE id = ${questionId}`;
    } catch (error) {
      console.error("Error deleting question:", error.message);
      throw new Error("Failed to delete question");
    }
  };

  // all options for a specific question

  const getOptionsByQuestionId = async (questionId) => {
    try {
      const rows = await sql`
        SELECT id, option_text, is_correct
        FROM question_answer_options
        WHERE question_id = ${questionId};
      `;
      return rows;
    } catch (error) {
      console.error("Error fetching options by question ID:", error.message);
      throw new Error("Failed to fetch options");
    }
  };


  const getOptionById = async (optionId) => {
    try {
      const rows = await sql`
        SELECT is_correct
        FROM question_answer_options
        WHERE id = ${optionId};
      `;
      return rows[0]; 
    } catch (error) {
      console.error("Error fetching option by ID:", error.message);
      throw new Error("Failed to fetch option");
    }
  };

  const recordAnswer = async (questionId, questionAnswerOptionId) => {
    try {
      await sql`
        INSERT INTO question_answers (question_id, question_answer_option_id)
        VALUES (${questionId}, ${questionAnswerOptionId});
      `;
    } catch (error) {
      console.error("Error recording answer:", error.message);
      throw new Error("Failed to record answer");
    }
  };
  


export { getQuestions, addQuestion, addOptionToQuestion, getQuestionById, getOptionsByQuestionId, getOptionById, deleteQuestion, recordAnswer };