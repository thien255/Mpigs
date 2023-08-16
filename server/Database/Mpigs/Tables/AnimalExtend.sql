CREATE TABLE [dbo].[AnimalExtend]
(
	[Id] BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [AnimalId] BIGINT NOT NULL  FOREIGN KEY REFERENCES Animal(Id), 
    [DateJoinIn] DATETIME NULL,  -- Ngày gia nhập
    [DateLeave] DATETIME NULL, -- Ngày rời đi
    [StatusJoin] VARCHAR(50) NULL, 
    [Weight] DECIMAL(18, 2) NULL, 
    [Price] DECIMAL(18, 2) NULL, 
    [CreatedBy] VARCHAR(50) NULL, 
    [CreatedOn] DATETIME NOT NULL DEFAULT GETDATE(), 
    [LastUpdatedOn] VARCHAR(50) NULL, 
    [LastUpdatedBy] DATETIME NULL,
    [FarmExport] BIGINT NULL, 
)
