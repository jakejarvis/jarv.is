-- CreateTable
CREATE TABLE "hits" (
    "slug" TEXT NOT NULL,
    "hits" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "hits_pkey" PRIMARY KEY ("slug")
);
