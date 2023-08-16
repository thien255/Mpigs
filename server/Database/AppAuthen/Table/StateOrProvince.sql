﻿CREATE TABLE [dbo].[StateOrProvince]
(
	[Id] BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [CountryId] BIGINT NOT NULL, 
    [Code] VARCHAR(60) NULL, 
    [Name] NVARCHAR(150) NOT NULL, 
    [Type] VARCHAR(60) NULL
)
