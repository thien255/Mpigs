CREATE TABLE [dbo].[District]
(
	[Id] BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [StateOrProvinceId] BIGINT NOT NULL, 
    [Name] NVARCHAR(150) NOT NULL, 
    [Type] VARCHAR(60) NULL, 
    [Location] NVARCHAR(MAX) NULL
)
