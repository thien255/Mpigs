CREATE TABLE [dbo].[MovingIndividual]
(
	[Id] BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [AnimalId] BIGINT NOT NULL FOREIGN KEY REFERENCES Animal(Id), 
    [BreedingBarnId] BIGINT NOT NULL FOREIGN KEY REFERENCES BreedingBarn(Id), 
    [ONuoiId] BIGINT NULL FOREIGN KEY REFERENCES ONuoi(Id),  
    [DateJoin] DATETIME NOT NULL, 
    [StatusJoin] VARBINARY(MAX) NULL, 
    [DateOut] DATETIME NULL, 
    [StatusOut] VARCHAR(50) NULL, 
    [WeightIn] DECIMAL(10, 2) NULL, 
    [WeightOut] DECIMAL(10, 2) NULL,
    [Executor] VARCHAR(50) NULL,
    [CreatedBy] VARCHAR(50) NULL, 
    [CreatedOn] DATETIME NOT NULL DEFAULT GETDATE(), 
    [LatestUpdatedOn] DATETIME NULL, 
    [LatestUpdatedBy] VARCHAR(50) NULL
)
