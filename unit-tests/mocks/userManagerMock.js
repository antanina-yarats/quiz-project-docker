import { validate, required, isEmail } from "../../deps.js";

const emailValidationRules = {
   email: [required, isEmail],
};

let users = [];
let currentId = 1;

const addUser = async (email, password) => {
    
    if (users.some(user => user.email === email)) {
        return 0; 
    }

    const [passes, errors] = await validate({ email }, emailValidationRules);
    if (!passes) {
        return 0; 
    }

    users.push({ id: currentId++, email: email, admin: false, password: password });
    return 1; 
};

const findUserByEmail = async (email) => {
    return users.find(user => user.email === email) || null;
};

const clearMockUsers = () => {
    users = [];
    currentId = 1;
};

export { addUser, findUserByEmail, clearMockUsers };
