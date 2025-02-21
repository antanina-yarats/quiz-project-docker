import * as userService from "../services/userService.js";
import { bcrypt } from '../deps.js';

const addUser = async (email,password) => {
  

 try{
    const hashedPassword = await bcrypt.hash(password);
    await userService.addUser(email,hashedPassword);
  } catch (error) {
    throw new Error("Failed to register user.");
  }
  
}

const processLogin = async(email, password) => {
  
  try{
    const retrieveUser = await userService.findUserByEmail(email);

    if(retrieveUser) {
      const passwordOk = await bcrypt.compare(password, retrieveUser.password);
      if(passwordOk) {
        return retrieveUser;
      }
    } 
    return null;
  } catch (error) {
    throw new Error("Incorrect password");
  }
  
}

const findUserbyEmail = async (email) => {
  try {
    return await userService.findUserByEmail(email);
  } catch(error) {
    console.error("Error finding user by ID:", error);
    throw error;
  }
}

export { addUser, processLogin, findUserbyEmail };