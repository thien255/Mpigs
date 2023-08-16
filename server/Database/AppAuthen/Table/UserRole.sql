CREATE TABLE [dbo].[UserRole]
( 
    [UserName] VARCHAR(60) NOT NULL, 
    [Role] VARCHAR(100) NOT NULL,
    [CreatedOn] DATETIME NOT NULL DEFAULT GETDATE(),
    [CreatedBy] VARCHAR(60) DEFAULT 'system'
)
