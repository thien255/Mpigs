CREATE TABLE [dbo].[Animal]
(
	[Id] BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [FarmId] BIGINT NOT NULL FOREIGN KEY REFERENCES Farm(Id), 
    [Code] VARCHAR(50) NULL, 
    [Name] VARCHAR(30) NOT NULL, 
    [Species] VARCHAR(30) NULL, -- Giống loài
    [BreedLevel] VARCHAR(30) NULL, -- Cấp Giống
    [Source] VARCHAR(30) NULL, -- Nguồn gốc
    [BirthDay] DATETIME NULL, 
    [Sex] VARCHAR(20) NOT NULL,  
    [Status] VARCHAR(30) NULL, -- Hiện trạng
    [Note] NVARCHAR(500) NULL, 
    [CreatedOn] DATETIME NOT NULL DEFAULT GETDATE(), 
    [CreatedBy] VARCHAR(50) NULL, 
    [LatestUpdatedOn] DATETIME NULL, 
    [LatestUpdatedBy] VARCHAR(50) NULL
)
