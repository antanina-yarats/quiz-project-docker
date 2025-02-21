import { assertEquals, assertNotEquals } from "../deps.js";
import * as topicService from "./mocks/topicServiceMock.js";

Deno.test("Add topic with valid name", async () => {
    topicService.clearMockTopics();

    const result  = await topicService.addTopic("JavaScript");
    assertEquals(result.success, true);
    assertNotEquals(result.id, undefined);
});

Deno.test("Add topic with empty name", async() => {
    topicService.clearMockTopics();

    const result = await topicService.addTopic("");
    assertEquals(result.success, false);
    assertNotEquals(result.errors.topicName, undefined);
});

Deno.test("Add topic with short name", async () => {
    topicService.clearMockTopics();

    const result = await topicService.addTopic("J");
    assertEquals(result.success, false);
    assertNotEquals(result.errors.topicName, undefined);
});

Deno.test("Retrieve all topics after adding one", async()=> {
    topicService.clearMockTopics();

    await topicService.addTopic("Deno Testing");
    const topics = await topicService.getAllTopics();

    
    assertEquals(topics.length, 1);
    assertEquals(topics[0].name, "Deno Testing");
});


