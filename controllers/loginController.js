import * as userManager from '../managers/userManager.js';


const showLoginForm = ({render}) => {
  render("login.eta", {title: "Login", email:""})
};

const loginUser = async ({response, request, state, render }) => {

   const body = await request.body({type: "form"});
   const params = await body.value;
   const email = params.get("email");
   const password = params.get("password");

   try {
    const loginProcessOk = await userManager.processLogin(email,password);
    
     if(loginProcessOk){
     await state.session.set("currentUser",{ email: loginProcessOk.email});
     const currentUser = await state.session.get("currentUser");
     console.log("Session after login:", currentUser);
     response.redirect("/");
     } else {
      render("login.eta", {
        title: "Login",
        email,
        errorMessage: "Invalid email or password",
      });
     }
    } catch(error) {
      console.log("An error occured", error)
      
      render("login.eta", {
        title:"Login",
        email,
        errorMessage: "An unexpected error occurred. Please try again." ,
      });
    }
   };

   const logout = async(context) => {
      await context.state.session.set("currentUser", null);
      await context.state.session.deleteSession();
      
      
      context.response.redirect("/auth/login");
   }
     

export { showLoginForm, loginUser, logout };