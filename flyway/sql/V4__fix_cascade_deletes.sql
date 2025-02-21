ALTER TABLE question_answers
DROP CONSTRAINT question_answers_question_id_fkey,
ADD CONSTRAINT question_answers_question_id_fkey
FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE;