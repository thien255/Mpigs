CREATE TABLE [dbo].[Categories]
(
	[Id] BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [FarmId] BIGINT NOT NULL,
    [Code] VARCHAR(50) NOT NULL,
    [Name] NVARCHAR(150) NOT NULL, 
    [Type] VARCHAR(50) NOT NULL, 
    [Specifications] NVARCHAR(MAX) NULL, 
    [Weight] DECIMAL(10, 2) NULL, 
    [Unit] VARCHAR(50) NULL, 
    [Amount] DECIMAL(18, 2) NULL, 
    [Provider] VARCHAR(50) NULL, 
    [Description] NVARCHAR(500) NULL, 
    [Note] NVARCHAR(MAX) NULL, 
    [Logo] NVARCHAR(250) NULL, 
    [CreatedOn] DATETIME NOT NULL DEFAULT GETDATE(), 
    [CreatedBy] VARCHAR(50) NULL, 
    [LatestUpdatedOn] DATETIME NULL, 
    [LatestUpdatedBy] VARCHAR(50) NULL
)
