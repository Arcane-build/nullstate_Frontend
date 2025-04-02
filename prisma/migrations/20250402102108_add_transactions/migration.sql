-- CreateTable
CREATE TABLE "NFTTransaction" (
    "id" SERIAL NOT NULL,
    "nftId" TEXT NOT NULL,
    "fromAddress" TEXT NOT NULL,
    "toAddress" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "transactionType" TEXT NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NFTTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NFTTransaction_transactionHash_key" ON "NFTTransaction"("transactionHash");

-- AddForeignKey
ALTER TABLE "NFTTransaction" ADD CONSTRAINT "NFTTransaction_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "NFTMinting"("nftId") ON DELETE RESTRICT ON UPDATE CASCADE;
