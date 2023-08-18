﻿CREATE TABLE [dbo].[Roles]
(
	[Role] VARCHAR(100) NOT NULL PRIMARY KEY, 
    [Description] VARCHAR(250) NULL, 
    [IsDelete] BIT NOT NULL DEFAULT 0, 
    [CreatedOn] DATETIME NOT NULL DEFAULT GETDATE(), 
    [CreatedBy] VARCHAR(50) NOT NULL DEFAULT 'system'
)
