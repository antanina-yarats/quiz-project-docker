import { sql } from "../database/database.js";

const getAllTopics = async () => {
  return await sql`SELECT * FROM topics;`;
};

const getRandomQuestionByTopicId = async (topicId) => {
  try {
    const rows = await sql`
      SELECT *
      FROM questions
      WHERE topic_id = ${topicId}
      ORDER BY RANDOM()
      LIMIT 1;
    `;
    return rows[0]; 
  } catch (error) {
    console.error("Error fetching random question:", error.message);
    throw new Error("Failed to fetch random question");
  }
};



const getOptionsForQuestion = async (questionId) => {
  return await sql`
    SELECT id, option_text
    FROM question_answer_options
    WHERE question_id = ${questionId};
  `;
};

const checkAnswer = async (questionId, selectedOptionId) => {
  try {
    const rows = await sql`
      SELECT is_correct
      FROM question_answer_options
      WHERE question_id = ${questionId}
      AND id = ${selectedOptionId};
    `;

    if (rows.length === 0) {
      throw new Error("Invalid question or option.");
    }

    return rows[0].is_correct; 
  } catch (error) {
    console.error("Error checking answer:", error.message);
    throw error;
  }
};

const getCorrectOptionByQuestionId = async (questionId) => {
  try {
    const result = await sql`
      SELECT option_text
      FROM question_answer_options
      WHERE question_id = ${questionId} AND is_correct = true
      LIMIT 1;
    `;
    return result[0]; // Return the first (and only) correct option
  } catch (error) {
    console.error("Error fetching correct option:", error.message);
    throw new Error("Failed to fetch correct option");
  }
};




export { getAllTopics, getRandomQuestionByTopicId, getOptionsForQuestion, checkAnswer, getCorrectOptionByQuestionId };
