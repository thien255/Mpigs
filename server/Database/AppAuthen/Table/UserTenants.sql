﻿CREATE TABLE [dbo].[UserTenants]
(
	[UserId] BIGINT NOT NULL REFERENCES Users(Id) FOREIGN KEY REFERENCES Users(Id),	
	[TenantId] BIGINT NOT NULL FOREIGN KEY REFERENCES Tenant(Id),
	[IsActive] BIT NOT NULL DEFAULT 0,
)
