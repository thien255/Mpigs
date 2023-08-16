CREATE TABLE [dbo].[Tenant]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [Code] VARCHAR(50) NOT NULL, 
    [ShortName] NVARCHAR(60) NOT NULL, 
    [Name] NVARCHAR(150) NOT NULL,  
    [Description] NVARCHAR(MAX) NULL, 
    [Type] VARCHAR(50) NOT NULL, 
    [Logo] NVARCHAR(250) NULL, 
    [Address] NVARCHAR(250) NULL, 
    [Phone] VARCHAR(20) NULL, 
    [Representative] NVARCHAR(60) NULL, 
    [License] NVARCHAR(250) NULL, 
    [Expired] DATETIME NULL, 
    [Email] VARCHAR(60) NULL, 
    [Scale] NVARCHAR(250) NULL,  
    [IsActive] BIT NOT NULL DEFAULT 1, 
    [IsDelete] BIT NOT NULL DEFAULT 0, 
    [CreatedOn] DATETIME NOT NULL DEFAULT GETDATE(), 
    [CreatedBy] VARCHAR(50) NULL, 
    [LatestUpdatedOn] DATETIME NULL, 
    [UpdatedBy] VARCHAR(50) NULL
)
