ALTER TABLE topics
DROP CONSTRAINT topics_user_id_fkey,
ADD CONSTRAINT topics_user_id_fkey
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE questions
DROP CONSTRAINT questions_topic_id_fkey,
ADD CONSTRAINT questions_topic_id_fkey
FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE;

ALTER TABLE question_answer_options
DROP CONSTRAINT question_answer_options_question_id_fkey,
ADD CONSTRAINT question_answer_options_question_id_fkey
FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE;

