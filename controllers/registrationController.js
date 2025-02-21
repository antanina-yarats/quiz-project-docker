import * as userManager from '../managers/userManager.js';
import { validate, required, isEmail, minLength } from "../deps.js";

const emailValidationRules = {
   email: [required, isEmail],
};

const passwordValidationRules = {
   password: [required, minLength(6)],
};

const showRegistrationForm = ({render}) => {
    render("register.eta", { title: "Register", email:""});
}

const registerUser = async ({request, response, render }) => {
    const body = await request.body({type:"form"});
    const params = await body.value;
    const email = params.get("email");
    const password = params.get("password");
    const confirmPassword = params.get("confirmPassword");

    const passwordMatch = password === confirmPassword;

    const [passes, errors] = await validate(
      {email, password },
      {...emailValidationRules, ...passwordValidationRules}
    );
    
    if(!passwordMatch) { 
      errors.confirmPassword = ["Passwords do not match"];
    }

    if(!passes || !passwordMatch){
      
      render("register.eta", {
         title: "Register",
         email,
         validationErrors: errors,
      });
      return;
    }
    
     try{
        await userManager.addUser(email, password);
        response.redirect("/auth/login");
     } catch (error) {
        response.status = 500;
        response.body = "An error occurred during registration";
     }     
};





export {showRegistrationForm, registerUser, emailValidationRules};