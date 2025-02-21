import { assertEquals, assertNotEquals } from "../deps.js";

import * as questionService from "./mocks/questionServiceMock.js";

Deno.test("Add a question with valid text", async () => {
    questionService.clearMockData();

    const result = await questionService.addQuestion(1, "What is JavaScript?");
    assertEquals(result.success, true);
    assertNotEquals(result.id, undefined);
});

Deno.test("Add a question with empty text", async() => {
    questionService.clearMockData();

    const result = await questionService.addQuestion(1, "");
    assertEquals(result.success, false);
    assertNotEquals(result.errors.questionText, undefined);
});

Deno.test("Retrieve all questions for a topic", async() => {
    questionService.clearMockData();

    await questionService.addQuestion(1, "What is JavaScript?");
    await questionService.addQuestion(1, "What is Deno?");

    const questions = await questionService.getQuestions(1);
    assertEquals(questions.length, 2);
    assertEquals(questions[0].text, "What is JavaScript?");
});

Deno.test("Retrieve a question by ID", async() => {
    questionService.clearMockData();
    
    const result = await questionService.addQuestion(1,"What is JavaScript?");
    const question = await questionService.getQuestionById(result.id);

    assertEquals(question.text, "What is JavaScript?");
});

Deno.test("Add options to a question and retrieve them", async() => {
    questionService.clearMockData();

    const questionResult = await questionService.addQuestion(1, "What is JavaScript?");
    await questionService.addOptionToQuestion(questionResult.id, "A programming language", true);
    await questionService.addOptionToQuestion(questionResult.id, "A fruit", false);

    const options = await questionService.getOptionsByQuestionId(questionResult.id);

    assertEquals(options.length, 2);
    assertEquals(options[0].text, "A programming language");
    assertEquals(options[0].is_correct, true);
}) ;

Deno.test("Retrieve an option by ID", async() => {
    questionService.clearMockData();

    const questionResult = await questionService.addQuestion(1, "What is JavaScript?");
    const optionResult = await questionService.addOptionToQuestion(questionResult.id, "A programming language", true);

    assertNotEquals(optionResult.id, undefined);

    const option = await questionService.getOptionById(optionResult.id);
    assertEquals(option.text, "A programming language");

});

Deno.test("Delete a question and ensure it is removed", async() => {
    questionService.clearMockData();
    
    const questionResult = await questionService.addQuestion(1, "What is JavaScript?");
    await questionService.deleteQuestion(questionResult.id);

    const question = await questionService.getQuestionById(questionResult.id);
    assertEquals(question, null);
})
