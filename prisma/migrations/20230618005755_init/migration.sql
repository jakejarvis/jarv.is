-- CreateTable
CREATE TABLE "hits" (
    "slug" VARCHAR(128) NOT NULL,
    "hits" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "hits_pkey" PRIMARY KEY ("slug")
);
