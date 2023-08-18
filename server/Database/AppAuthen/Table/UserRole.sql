CREATE TABLE [dbo].[UserRole]
( 
    [UserId] BIGINT NOT NULL, 
    [Role] VARCHAR(100) NOT NULL,
    [CreatedOn] DATETIME NOT NULL DEFAULT GETDATE(),
    [CreatedBy] VARCHAR(60) DEFAULT 'system'
)
