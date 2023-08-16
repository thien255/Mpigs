CREATE TABLE [dbo].[AnimalExport]
(
	[Id] BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [AnimalId] BIGINT NOT NULL  FOREIGN KEY REFERENCES Animal(Id), 
    [InvoiceId] BIGINT NOT NULL  FOREIGN KEY REFERENCES Invoice(Id), 
    [FarmImport] BIGINT NULL, 
    [Weight] DECIMAL(10, 2) NULL, 
    [AmountByMeat] DECIMAL(18, 2) NULL, 
    [AmountBySpecie] DECIMAL(18, 2) NULL, 
    [Amount] DECIMAL(18, 2) NULL,
    [Discount] DECIMAL(18, 2) NULL, 
    [TotalAmount] DECIMAL(18, 2) NULL, 
    [CreatedOn] DATETIME NOT NULL DEFAULT GETDATE(), 
    [CreatedBy] VARCHAR(50) NULL, 
    [LatestUpdatedOn] DATETIME NULL, 
    [LatestUpdatedBy] VARCHAR(50) NULL
)
