import { validate, required, minLength } from "../../deps.js";

const topicValidationRules = {
    topicName: [required, minLength(2)],
};

let topics = [];
let currentId = 1;

const addTopic = async(topicName) => {
    const [passes, errors] = await validate({ topicName }, topicValidationRules);

    if(!passes) {
        return { success: false, errors }; 
    }

    topics.push({ id: currentId++, name: topicName });
    return { success: true, id: currentId -1 };
}

const getAllTopics = async () => {
    return topics;
}

const clearMockTopics = () => {
    topics = [];
    currentId = 1;
}

export { addTopic, getAllTopics, clearMockTopics };