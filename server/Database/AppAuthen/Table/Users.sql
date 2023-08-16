CREATE TABLE [dbo].[Users]
(
	[Id] BIGINT NOT NULL PRIMARY KEY, 
    [UserName] VARCHAR(50) NOT NULL, 
    [Password] VARCHAR(MAX) NULL, 
    [FullName] NVARCHAR(60) NULL, 
    [FistName] NVARCHAR(30) NULL, 
    [LastName] VARCHAR(30) NULL, 
    [Email] VARCHAR(60) NULL, 
    [EmailConfirmed] BIT NULL, 
    [PhoneNumber] VARCHAR(20) NULL, 
    [PhoneNumberConfirmed] BIT NULL, 
    [TwoFactorEnabled] BIT NULL DEFAULT 0, 
    [Culture] VARCHAR(20) NULL, 
    [IsActive] BIT NOT NULL, 
    [IsDelete] BIT NULL DEFAULT 0, 
    [CreatedOn] DATETIME NOT NULL DEFAULT GETDATE(), 
    [LatestUpdatedOn] DATETIME NULL
)
