CREATE TABLE [dbo].[Kho]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [TraiId] BIGINT NOT NULL, 
    [CateId] BIGINT NOT NULL FOREIGN KEY REFERENCES Categories(Id), 
    [TotalImport] DECIMAL(18, 2) NOT NULL,
    [TotalExport] DECIMAL(18, 2) NOT NULL,
    [Inventory] DECIMAL(18, 2) NOT NULL,
    [CreatedOn] DATETIME NOT NULL DEFAULT GETDATE(), 
    [CreatedBy] VARCHAR(50) NULL, 
    [LatestUpdatedOn] DATETIME NULL, 
    [LatestUpdatedBy] VARCHAR(50) NULL
)
