CREATE TABLE [dbo].[Meat_Invoice]
(
	[Id] BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [FarmId] BIGINT NOT NULL FOREIGN KEY REFERENCES Farm(Id), 
    [Code] VARCHAR(50) NOT NULL, 
    [Date] DATETIME NOT NULL, 
    [Type] VARCHAR(50) NOT NULL, 
    [Quantity] INT NOT NULL, 
    [Weight] DECIMAL(18, 2) NULL, 
    [Amount] DECIMAL(18, 2) NULL, 
    [Discount] DECIMAL NULL, 
    [TotalAmount] DECIMAL NULL, 
    [FarmExportId] BIGINT NULL , 
    [Note] NVARCHAR(500) NULL, 
    [Executor] VARCHAR(50) NULL, 
    [CreatedOn] DATETIME NOT NULL DEFAULT GETDATE(), 
    [CreatedBy] VARCHAR(50) NULL, 
    [LatestUpdatedOn] DATETIME NULL, 
    [LatestUpdatedBy] VARCHAR(50) NULL
)
