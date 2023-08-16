CREATE TABLE [dbo].[AnimalExtend2]
(
	[Id] BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [AnimalId] BIGINT NOT NULL FOREIGN KEY REFERENCES Animal(Id), 
    [Father] VARCHAR(30) NULL, 
    [Mother] VARCHAR(30) NULL, 
    [GrandFather] VARCHAR(30) NULL, 
    [PaternalGrandFather] VARCHAR(30) NULL, 
    [GrandMother] VARCHAR(30) NULL, 
    [PaternalGrandMother] VARCHAR(30) NULL, 
    [CreatedOn] DATETIME NOT NULL DEFAULT GETDATE(), 
    [CreatedBy] VARCHAR(50) NULL, 
    [LatestUpdatedOn] DATETIME NULL, 
    [LatestUpdatedBy] VARCHAR(50) NULL
)
