CREATE TABLE [dbo].[Address]
(
	[Id] BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [Name] NVARCHAR(150) NOT NULL, 
    [Phone] VARCHAR(20) NULL, 
    [City] NVARCHAR(450) NOT NULL, 
    [Zipcode] VARCHAR(60) NULL, 
    [DistrictId] BIGINT NOT NULL, 
    [StateOrProvinceId] BIGINT NOT NULL, 
    [CountryId] BIGINT NOT NULL
)
