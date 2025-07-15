/*
  Warnings:

  - You are about to drop the column `entityId` on the `Phone` table. All the data in the column will be lost.
  - You are about to drop the column `entityType` on the `Phone` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `Phone` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Phone" DROP CONSTRAINT "customer_entityId";

-- DropForeignKey
ALTER TABLE "Phone" DROP CONSTRAINT "user_entityId";

-- AlterTable
ALTER TABLE "Phone" DROP COLUMN "entityId",
DROP COLUMN "entityType",
ADD COLUMN     "customerId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "PhoneEntityType";

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
