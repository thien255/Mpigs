CREATE TABLE [dbo].[BreedingBarn]
(
	[Id] BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [FarmId] BIGINT NOT NULL FOREIGN KEY REFERENCES Farm(Id),
    [Name] NVARCHAR(150) NOT NULL, 
    [Manage] VARCHAR(50) NULL, 
    [Type] VARCHAR(50) NULL, 
    [Description] NVARCHAR(500) NULL, 
    [Address] NVARCHAR(500) NULL, 
    [CreatedOn] DATETIME NOT NULL DEFAULT GETDATE(), 
    [CreatedBy] VARCHAR(50) NULL, 
    [LatestUpdatedOn] DATETIME NULL, 
    [LatestUpdatedBy] VARCHAR(50) NULL
)
