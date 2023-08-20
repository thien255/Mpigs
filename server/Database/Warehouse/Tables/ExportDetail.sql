﻿CREATE TABLE [dbo].[ExportDetail]
(
	[Id] BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [InvoiceId] BIGINT NOT NULL FOREIGN KEY REFERENCES Invoice(Id), 
    [CateId] BIGINT NULL FOREIGN KEY REFERENCES Categories(Id), 
    [BreedingBarnId] BIGINT NULL, 
    [Quantity] DECIMAL(18, 2) NULL
)