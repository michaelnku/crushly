/*
  Warnings:

  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `Crush` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DatingProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Match` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserPhoto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Crush" DROP CONSTRAINT "Crush_fromUserId_fkey";

-- DropForeignKey
ALTER TABLE "Crush" DROP CONSTRAINT "Crush_toUserId_fkey";

-- DropForeignKey
ALTER TABLE "DatingProfile" DROP CONSTRAINT "DatingProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_userAId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_userBId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_matchId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- DropForeignKey
ALTER TABLE "UserPhoto" DROP CONSTRAINT "UserPhoto_profileId_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role";

-- DropTable
DROP TABLE "Crush";

-- DropTable
DROP TABLE "DatingProfile";

-- DropTable
DROP TABLE "Match";

-- DropTable
DROP TABLE "Message";

-- DropTable
DROP TABLE "UserPhoto";

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "Interest";

-- DropEnum
DROP TYPE "InterestedIn";

-- DropEnum
DROP TYPE "UserRole";
