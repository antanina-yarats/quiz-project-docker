import { sql } from "../database/database.js";


const getAllTopics = async () => {
    return await sql`SELECT * FROM topics`;
};

const getTopicTitle = async(topicId) => {
    const result = await sql `
    SELECT name FROM topics WHERE id= ${topicId}`;
    return result[0]?.name;
};

const addTopic = async (name) => {
   try {
    await sql `INSERT INTO topics (name) VALUES (${name})`;
   } catch (error) {
    console.error("Error adding topic:", error.message);
    throw new Error("Topic already exists!");
   }
};

const deleteTopicById = async (topicId) => {
    try {
      await sql`DELETE FROM topics WHERE id = ${topicId}`;
    } catch (error) {
      console.error("Error deleting topic:", error.message);
      throw new Error("Failed to delete topic");
    }
  };
  





export { getAllTopics, addTopic, getTopicTitle, deleteTopicById };