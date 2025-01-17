/*
  Warnings:

  - You are about to drop the column `authorId` on the `Classroom` table. All the data in the column will be lost.
  - You are about to drop the `_students` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Classroom" DROP CONSTRAINT "Classroom_authorId_fkey";

-- DropForeignKey
ALTER TABLE "_students" DROP CONSTRAINT "_students_A_fkey";

-- DropForeignKey
ALTER TABLE "_students" DROP CONSTRAINT "_students_B_fkey";

-- AlterTable
ALTER TABLE "Classroom" DROP COLUMN "authorId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'STUDENT';

-- DropTable
DROP TABLE "_students";
