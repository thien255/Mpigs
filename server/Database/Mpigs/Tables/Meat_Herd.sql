CREATE TABLE [dbo].[Meat_Herd]
(
	[Id] BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [FarmId] BIGINT NOT NULL FOREIGN KEY REFERENCES Farm(Id), 
    [BreedingBarnId] BIGINT NOT NULL FOREIGN KEY REFERENCES BreedingBarn(Id), 
    [StartDate] DATETIME NULL, 
    [TotalImport] INT NOT NULL, 
    [TotalExport] INT NULL, 
    [Quantity] INT NULL, 
    [TotalWeightExport] DECIMAL(18, 2) NULL, 
    [TotalWeightImport] DECIMAL(18, 2) NULL,  
    [EndDate] DATETIME NULL, 
    [CreatedOn] DATETIME NOT NULL DEFAULT GETDATE(), 
    [CreatedBy] VARCHAR(50) NULL, 
    [LatestUpdatedOn] DATETIME NULL, 
    [LatestUpdatedBy] VARCHAR(50) NULL
)
