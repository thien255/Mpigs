CREATE TABLE [dbo].[Tenant]
(
	[Id] BIGINT PRIMARY KEY IDENTITY(1,1), 
    [Code] VARCHAR(60) NULL, 
    [Name] VARCHAR(120) NOT NULL, 
    [IsInTrialPeriod] BIT NULL, 
    [SubscriptionEndDateUtc] DATETIME NULL, 
    [Address] NVARCHAR(500) NULL,  
    [Representative] nvarchar(100),
    [RepresentativePhone] varchar(20),
    [TaxCode] varchar(50),
    [Logo] NVARCHAR(500) NULL, 
    [CreatedOn] DATETIME NOT NULL DEFAULT GETDATE(), 
    [LatestUpdatedOn] DATETIME NULL, 
    [CreatedBy] VARCHAR(60) NULL, 
    [LatestUpdatedBy] VARCHAR(60) NULL, 
    [IsActive] BIT NOT NULL DEFAULT 1, 
    [IsDelete] BIT NOT NULL DEFAULT 0 
)
