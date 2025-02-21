import { bcrypt } from "../deps.js"; 

const adminPassword = "123456";

const hashedPassword = await bcrypt.hash(adminPassword);

console.log("Hashed Admin Password:", hashedPassword);
