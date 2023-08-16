CREATE TABLE [dbo].[DieChildAnimal]
(
	[Id] BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [IndividualId] BIGINT NOT NULL FOREIGN KEY REFERENCES Animal(Id), 
    [ReproductionId] BIGINT NOT NULL FOREIGN KEY REFERENCES Reproduction(Id), 
    [Date] DATETIME NOT NULL, 
    [Quantity] INT NOT NULL, 
    [Weight] DECIMAL(10, 2) NULL, 
    [Reason] VARCHAR(50) NULL, -- Lý do
    [DaysOfRearing] INT NULL, -- Số ngày theo mẹ
    [Note] NVARCHAR(500) NULL ,
    [CreatedOn] DATETIME NOT NULL DEFAULT GETDATE(), 
    [CreatedBy] VARCHAR(50) NULL, 
    [LatestUpdatedOn] DATETIME NULL, 
    [LatestUpdatedBy] VARCHAR(50) NULL
)
