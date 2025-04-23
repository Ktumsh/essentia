CREATE TABLE "user_review_answer" (
	"user_id" uuid NOT NULL,
	"review_id" uuid NOT NULL,
	"question_id" uuid NOT NULL,
	"selected" integer NOT NULL,
	"answered_at" timestamp DEFAULT now(),
	CONSTRAINT "user_review_answer_user_id_question_id_pk" PRIMARY KEY("user_id","question_id")
);
--> statement-breakpoint
ALTER TABLE "user_review_answer" ADD CONSTRAINT "user_review_answer_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_review_answer" ADD CONSTRAINT "user_review_answer_review_id_review_id_fk" FOREIGN KEY ("review_id") REFERENCES "public"."review"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_review_answer" ADD CONSTRAINT "user_review_answer_question_id_review_question_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."review_question"("id") ON DELETE cascade ON UPDATE no action;