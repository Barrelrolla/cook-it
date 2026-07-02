CREATE TYPE "recipeDifficulty" AS ENUM('easy', 'medium', 'hard');--> statement-breakpoint
CREATE TABLE "recipes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL UNIQUE,
	"image_url" varchar NOT NULL,
	"author" varchar NOT NULL,
	"instructions" varchar NOT NULL,
	"preparation_time" integer NOT NULL,
	"difficulty" "recipeDifficulty" NOT NULL,
	"is_liked" boolean DEFAULT false,
	"rating" numeric DEFAULT '0',
	"ratings_count" integer DEFAULT 0,
	"created_at" time DEFAULT now(),
	"updated_at" time DEFAULT now()
);
