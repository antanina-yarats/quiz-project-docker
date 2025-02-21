const showQuizPage = async ({ render }) => {
  render("quiz.eta", {
    title: "Quiz",
  });
};

export { showQuizPage };
