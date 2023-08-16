CREATE TABLE [dbo].[AnimalChild]
(
	[Id] BIGINT NOT NULL PRIMARY KEY, 
    [FarmId] BIGINT NOT NULL, 
    [Mother] BIGINT NOT NULL, 
    [ReproductionId] BIGINT NOT NULL, 
    [Code] VARCHAR(50) NOT NULL, 
    [BirtDay] DATETIME NOT NULL,
    [Weight] DECIMAL(10, 2) NULL, 
    [Sex] VARCHAR(20) NOT NULL,  
    [Status] VARCHAR(30) NULL, -- Hiện trạng
    [DateWean] DATETIME NULL-- Ngày cai sữa 
)
