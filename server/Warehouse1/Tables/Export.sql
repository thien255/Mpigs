CREATE TABLE [dbo].[Export]
(
	[Id] BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),   
    [CateId] BIGINT NOT NULL FOREIGN KEY REFERENCES Categories(Id), 
    [InvoiceId] BIGINT NOT NULL FOREIGN KEY REFERENCES Invoice(Id),
    [Quantity] DECIMAL(18, 2) NOT NULL, 
    [Amount] DECIMAL(18, 2) NULL, 
    [Note] NVARCHAR(500) NULL,
    [CreatedOn] DATETIME NOT NULL DEFAULT GETDATE(), 
    [CreatedBy] VARCHAR(50) NULL, 
    [LatestUpdatedOn] DATETIME NULL, 
    [LatestUpdatedBy] VARCHAR(50) NULL
)
