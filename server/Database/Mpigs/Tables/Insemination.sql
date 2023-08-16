﻿CREATE TABLE [dbo].[Insemination]
(
	[Id] BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [AnimalId] BIGINT NOT NULL FOREIGN KEY REFERENCES Animal(Id), 
    [AnimalMaleId] BIGINT NULL, 
    [Date] DATETIME NOT NULL, 
    [NumberOfBirths] INT NOT NULL, 
    [StatusJoin] VARCHAR(50) NOT NULL,
    [TimesPerformed] INT NOT NULL, 
    [Type] VARCHAR(50) NOT NULL,  
    [Result] VARCHAR(50) NULL, 
    [Executor] VARCHAR(50) NULL, 
    [Note] NVARCHAR(500) NULL, 
    [DateCheckup1] DATETIME NULL, 
    [ResultCheckup1] VARCHAR(50) NULL, 
    [ExecutorCheckup1] DATETIME NULL, 
    [DateCheckup2] DATETIME NULL, 
    [ResultCheckup2] VARCHAR(50) NULL, 
    [ExecutorCheckup2] DATETIME NULL, 
    [EstimatedDueDate] DATETIME NULL,
    [CreatedOn] DATETIME NOT NULL DEFAULT GETDATE(), 
    [CreatedBy] VARCHAR(50) NULL, 
    [LatestUpdatedOn] DATETIME NULL, 
    [LatestUpdatedBy] VARCHAR(50) NULL
)