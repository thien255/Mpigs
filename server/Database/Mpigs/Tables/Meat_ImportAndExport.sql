CREATE TABLE [dbo].[Meat_ImportAndExport]
(
	[Id] BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [FarmId] BIGINT NOT NULL FOREIGN KEY REFERENCES Farm(Id), 
    [InvoiceId] BIGINT NOT NULL FOREIGN KEY REFERENCES Meat_Invoice(Id), 
    [HerdId] BIGINT NOT NULL FOREIGN KEY REFERENCES Meat_Herd(Id), 
    [Quantity] INT NOT NULL, 
    [Amount] DECIMAL(18, 2) NULL, 
    [TotalAmount] DECIMAL(18, 2) NULL,  
    [Weight] DECIMAL(18, 2) NULL, 
    [Type] VARCHAR(50) NULL, 
    [Male] INT NULL, 
    [Female] INT NULL, 
    [Undefined] INT NULL, 
    [FarmImportId] BIGINT NULL,  
    [CreatedOn] DATETIME NOT NULL DEFAULT GETDATE(), 
    [CreatedBy] VARCHAR(50) NULL, 
    [LatestUpdatedOn] DATETIME NULL, 
    [LatestUpdatedBy] VARCHAR(50) NULL
)
