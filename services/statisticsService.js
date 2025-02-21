import { sql } from "../database/database.js";

const getTotalTopicsCount = async () => {
  try {
    const rows = await sql`SELECT COUNT(*) AS count FROM topics;`;
    return rows[0].count; 
  } catch (error) {
    console.error("Error fetching total topics count:", error.message);
    throw new Error("Failed to fetch total topics count");
  }
};

const getTotalQuestionsCount = async () => {
  try {
    const rows = await sql`SELECT COUNT(*) AS count FROM questions;`;
    return rows[0].count;
  } catch (error) {
    console.error("Error fetching total questions count:", error.message);
    throw new Error("Failed to fetch total questions count");
  }
};

const getTotalAnswersCount = async () => {
  try {
    const rows = await sql`SELECT COUNT(*) AS count FROM question_answers;`;
    return rows[0].count;
  } catch (error) {
    console.error("Error fetching total answers count:", error.message);
    throw new Error("Failed to fetch total answers count");
  }
};

export { getTotalTopicsCount, getTotalQuestionsCount, getTotalAnswersCount };
