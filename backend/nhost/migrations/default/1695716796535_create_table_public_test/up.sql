CREATE TABLE "public"."test" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "text" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
