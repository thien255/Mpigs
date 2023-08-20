CREATE TABLE [dbo].[Invoice]
(
	[Id] BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [FarmId] BIGINT NOT NULL, 
    [Code] VARCHAR(50) NOT NULL, 
    [Date] DATETIME NOT NULL, 
    [Type] VARCHAR(50) NOT NULL, 
    [Discount] DECIMAL NULL,
    [TotalAmount] DECIMAL NULL, 
    [Customer] VARCHAR(50) NULL, 
    [CreatedOn] DATETIME NOT NULL DEFAULT GETDATE(), 
    [CreatedBy] VARCHAR(50) NULL, 
    [LatestUpdatedOn] DATETIME NULL, 
    [LatestUpdatedBy] VARCHAR(50) NULL
)
