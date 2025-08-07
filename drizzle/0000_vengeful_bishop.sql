CREATE TABLE "Record" (
	"id" text PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"amount" real NOT NULL,
	"category" text DEFAULT 'Other' NOT NULL,
	"date" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"userId" text NOT NULL,
	"createdAt" timestamp (3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" text PRIMARY KEY NOT NULL,
	"clerkUserId" text NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"imageUrl" text,
	"createdAt" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp (3) with time zone NOT NULL,
	CONSTRAINT "User_clerkUserId_unique" UNIQUE("clerkUserId"),
	CONSTRAINT "User_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX "Record_userId_idx" ON "Record" USING btree ("userId");