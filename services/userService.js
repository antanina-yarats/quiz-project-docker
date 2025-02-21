import { sql } from '../database/database.js';

const addUser = async (email,hashedPassword) => {
    try {
       await sql `INSERT INTO users(email,password) VALUES(${email}, ${hashedPassword})`;
    } catch(error) {
        console.error("Database error:", error);
        throw error;
    }

}

const findUserByEmail = async (email) => {
    try {
     const result = await sql `SELECT * FROM users WHERE email= ${email}`;
     return result[0];
    } catch(error) {
        console.error("Database error:", error);
        throw error;
    }
}




export {addUser, findUserByEmail};