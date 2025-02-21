import * as topicService from "../services/topicService.js";
import * as questionService from "../services/questionService.js";  
import { validate, required, minLength } from "../deps.js";

const topicValidationRules = {
  topicName: [required, minLength(2)],
}


const showTopicsPage = async ({render, state}) => {
  const topics = await topicService.getAllTopics();
  const currentUser = state.currentUser;

  render("topics.eta", {
   title: "Topics",
   topics,
   currentUser, 
  });
 };

  const showTopicDetails = async ({render,params,state}) => {
    const topicId = params.id;
    const topicTitle = await topicService.getTopicTitle(topicId);
    const questions = await questionService.getQuestions(topicId);
    const currentUser = state.currentUser;

    render("topic.eta", { 
      topic: { id: topicId, name: topicTitle, questions },
      currentUser,
     });
  };


  const addTopic = async (context) => {

    const user = await context.state.session.get("currentUser");
    
     if(!user || user.email !== "admin@admin.com"){
      response.status = 403;
      response.body = "Access denied: Admin only!";
      return;
     }

  
    const body = await context.request.body({ type: "form"}).value;
    const topicName = body.get("topicName");

    const [passes, errors] = await validate({ topicName }, topicValidationRules);

    if(!passes) {
      context.render("topics.eta", {
        title: "Topics",
        topics: await topicService.getAllTopics(),
        currentUser: context.state.currentUser,
        validationErrors: errors,
        previousInput: topicName,
      });
      return;
    }


    await topicService.addTopic(topicName);
    context.response.redirect("/topics");
  }

  const deleteTopicById = async (context) => {
    const user = await context.state.session.get("currentUser");

    if(!user || user.email !== "admin@admin.com"){
      context.response.status = 403;
      context.response.body = "Access denied: Admins only!";
      return;
    }

    const id = context.params.id;
  
    try {
      await topicService.deleteTopicById(id); 
      context.response.redirect("/topics");
    } catch (error) {
      console.error("Error deleting topic:", error.message);
      context.response.status = 500;
      context.response.body = { error: "Failed to delete topic" };
    }
  };

  
  const showAddQuestionPage = async (context) => {
    const topicId = context.params.id;
    const topicName = `Sample Topic ${topicId}`;
    const currentUser = context.state.currentUser;
  
    context.render("add-question.eta", {
      title: "Add Question",
      topicId,
      topicName,
      currentUser,
    });
  };
  
  export { showTopicsPage, addTopic, deleteTopicById, showTopicDetails, showAddQuestionPage };
  