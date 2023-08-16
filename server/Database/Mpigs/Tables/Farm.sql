CREATE TABLE [dbo].[Farm]
(
	[Id] BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [Tenant] BIGINT NOT NULL, 
    [Parent] BIGINT NULL, 
    [Type] VARCHAR(50) NOT NULL, 
    [Code] VARCHAR(50) NULL, 
    [Name] VARCHAR(150) NOT NULL, 
    [ShortName] NVARCHAR(50) NULL, 
    [Discription] NVARCHAR(1000) NULL, 
    [Address] NVARCHAR(250) NULL, 
    [Phone] VARCHAR(20) NULL, 
    [Email] VARCHAR(60) NULL, 
    [Scale] NVARCHAR(250) NULL, 
    [Logo] NVARCHAR(250) NULL,
    [IsActive] BIT NOT NULL DEFAULT 1, 
    [IsDelete] BIT NOT NULL DEFAULT 0, 
    [CreatedOn] DATETIME NOT NULL DEFAULT GETDATE(), 
    [CreatedBy] VARCHAR(50) NULL, 
    [LatestUpdatedOn] DATETIME NULL, 
    [LatestUpdatedBy] VARCHAR(50) NULL
)
