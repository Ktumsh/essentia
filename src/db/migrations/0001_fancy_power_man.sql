ALTER TABLE "review_question" ALTER COLUMN "options" SET DATA TYPE json USING options::json;
