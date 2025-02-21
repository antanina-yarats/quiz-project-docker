import * as statisticsService from "../services/statisticsService.js";

const showHomePage = async ({ render }) => {
  try {
    const topicsCount = await statisticsService.getTotalTopicsCount();
    const questionsCount = await statisticsService.getTotalQuestionsCount();
    const answersCount = await statisticsService.getTotalAnswersCount();

    render("index.eta", {
      title: "Home",
      topicsCount,
      questionsCount,
      answersCount,
    });
  } catch (error) {
    console.error("Error rendering home page:", error.message);
    render("index.eta", {
      title: "Home",
      topicsCount: 0,
      questionsCount: 0,
      answersCount: 0,
      error: "Failed to load statistics",
    });
  }
};

const showProfile = ({ render, state, response }) => {
  

  if (state.currentUser) {
      render("user-profile.eta");  
  } else {   
      response.redirect("/auth/login");                        
  }
};




export { showHomePage, showProfile };
