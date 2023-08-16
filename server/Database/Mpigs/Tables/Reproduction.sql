CREATE TABLE [dbo].[Reproduction]
(
	[Id] BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [AnimalId] BIGINT NOT NULL FOREIGN KEY REFERENCES Animal(Id), 
    [InseminationId] BIGINT NOT NULL FOREIGN KEY REFERENCES Insemination(Id), 
    [NumberOfBirths] INT NOT NULL, 
    [Date] DATETIME NOT NULL, 
    [Alive] INT NULL,  --Số con sống
    [DieHardDry] INT NULL,  --Số chết Khô
    [DieDefects] INT NULL, --Số chết Dị tật
    [DieOrther] INT NULL, --Số chết Khác
    [MoveIn] INT NULL,  --Số đến
    [MoveAway] INT NULL,  --Số đi
    [Remaining] INT NULL,  --Số còn lại
    [Weight] DECIMAL(10, 2) NULL,
    [CreatedOn] DATETIME NOT NULL DEFAULT GETDATE(), 
    [CreatedBy] VARCHAR(50) NULL, 
    [LatestUpdatedOn] DATETIME NULL, 
    [LatestUpdatedBy] VARCHAR(50) NULL
)
