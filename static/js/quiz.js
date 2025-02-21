document.addEventListener("DOMContentLoaded", async () => {
  const topicsContainer = document.getElementById("quiz-topics");

  try {
    const response = await fetch("/api/quiz/topics");
    const data = await response.json();

    if (!data.topics || data.topics.length === 0) {
     
      topicsContainer.innerHTML = `
        <div class="col-12 text-center">
          <div class="alert alert-info" role="alert">
            No quiz topics available at the moment. Please check back later.
          </div>
        </div>
      `;
    } else {
      
      data.topics.forEach((topic) => {
        const topicCard = `
          <div class="col-md-6 col-lg-4 mb-4">
            <div class="card clickable-card shadow-lg" onclick="startQuiz(${topic.id})">
              <div class="card-body text-center">
                <h5 class="card-title bigger">${topic.name}</h5>
                <button class="btn my-4 view-color">Start Quiz</button>
              </div>
            </div>
          </div>`;
        topicsContainer.innerHTML += topicCard;
      });
    }
  } catch (error) {
    console.error("Error fetching quiz topics:", error);
    topicsContainer.innerHTML = `<p class="text-center text-danger">Failed to load topics. Please try again later.</p>`;
  }
});


window.startQuiz = async (topicId) => {
  try {
    const response = await fetch(`/api/quiz/topics/${topicId}/questions/random`);
    const data = await response.json();

    const questionContainer = document.getElementById("quiz-topics");
    questionContainer.innerHTML = "";

    if (data.question) {
      const question = data.question;
      const questionCard = `
        <div class="container d-flex justify-content-center">
          <div class="col-md-8 col-lg-6">
            <div class="card shadow-lg rounded my-5 p-4">
              <div class="card-body">
                <h5 class="card-title text-center">Question:</h5>
                <p class="card-text text-center">${question.question_text}</p>
                <ul class="list-group my-3">
                  ${question.options.map((option) => `
                    <li class="list-group-item">
                      <input type="radio" name="selectedOption" value="${option.id}" />
                      <label>${option.option_text}</label>
                    </li>
                  `).join("")}
                </ul>
                <div class="text-center">
                  <button class="btn btn-success mt-3" onclick="submitAnswer(${question.id}, ${topicId})">Submit Answer</button>
                </div>
              </div>
            </div>
          </div>
        </div>`;
      questionContainer.innerHTML = questionCard;
    } else {
      questionContainer.innerHTML = `
        <p class="text-center text-danger">No questions available for this topic.</p>`;
    }
  } catch (error) {
    console.error("Error starting quiz:", error.message);
  }
};

window.submitAnswer = async (questionId, topicId) => {
  const selectedOption = document.querySelector('input[name="selectedOption"]:checked');

  if (!selectedOption) {
    Swal.fire({
      icon: "warning",
      title: "No Option Selected",
      text: "Please select an answer before submitting.",
    });
    return;
  }

  try {
    const isCorrect = await checkAnswer(questionId, selectedOption.value);
    if (isCorrect) {
      displayCorrectAnswerScreen(topicId);
    } else {
      await displayIncorrectAnswerScreen(questionId, topicId);
    }
  } catch (error) {
    console.error("Error submitting answer:", error.message);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong. Please try again!",
      footer: '<a href="/quiz">Go back to topics</a>', 
    });
  }
};

const checkAnswer = async (questionId, selectedOptionId) => {
  try {
    const response = await fetch(`/api/quiz/questions/${questionId}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selectedOptionId }),
    });

    const result = await response.json();
    return result.correct;
  } catch (error) {
    console.error("Error checking answer:", error.message);
    throw error;
  }
};


const displayCorrectAnswerScreen = (topicId) => {
  const questionContainer = document.getElementById("quiz-topics");
  questionContainer.innerHTML = `
    <div class="container d-flex justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card shadow-lg rounded my-5 p-4">
          <div class="card-body text-center">
            <h2 class="text-success my-5">Correct!</h2>
            <button id="next-question" class="btn next mt-3 d-block mx-auto">Next question</button>
            <button id="back-to-topics" class="btn delete mt-3 d-block mx-auto" style="margin-top: 20px;">Back to Topics</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("next-question").addEventListener("click", () => {
    startQuiz(topicId);
  });

  document.getElementById("back-to-topics").addEventListener("click", () => {
    window.location.href = "/quiz";
  });
};


const displayIncorrectAnswerScreen = async (questionId, topicId) => {
  try {
    const response = await fetch(`/api/quiz/questions/${questionId}/getCorrect`);
    const correctAnswer = await response.json();

    const questionContainer = document.getElementById("quiz-topics");
    questionContainer.innerHTML = `
      <div class="container d-flex justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card shadow-lg rounded my-5 p-4">
            <div class="card-body text-center">
              <h2 class="text-danger my-5">Incorrect!</h2>
              <h4 class="smaller">The correct option is:</h4>
              <p class="text-success font-weight-bold my-5">${correctAnswer.correct}</p>
              <button id="next-question" class="btn next mt-3 d-block mx-auto">Next question</button>
              <button id="back-to-topics" class="btn delete mt-3 d-block mx-auto" style="margin-top: 20px;">Back to Topics</button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById("next-question").addEventListener("click", () => {
      startQuiz(topicId);
    });

    document.getElementById("back-to-topics").addEventListener("click", () => {
      window.location.href = "/quiz";
    });
  } catch (error) {
    console.error("Error fetching correct answer:", error.message);
  }
};
