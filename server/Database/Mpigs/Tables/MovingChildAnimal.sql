CREATE TABLE [dbo].[MovingChildAnimal]
(
	[Id] BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [AnimalId] BIGINT NOT NULL FOREIGN KEY REFERENCES Animal(Id), 
    [ReproductionId] BIGINT NOT NULL FOREIGN KEY REFERENCES Reproduction(Id), 
    [Date] DATETIME NOT NULL, 
    [Quantity] INT NOT NULL, 
    [DaysToMother] INT NULL,
    [Type] VARCHAR(50) NOT NULL, 
    [Reason] VARCHAR(50) NULL, 
    [Weight] DECIMAL(10, 2) NULL ,
    [Note] DECIMAL(10, 2) NULL ,
    [CreatedOn] DATETIME NOT NULL DEFAULT GETDATE(), 
    [CreatedBy] VARCHAR(50) NULL, 
    [LatestUpdatedOn] DATETIME NULL, 
    [LatestUpdatedBy] VARCHAR(50) NULL
)
