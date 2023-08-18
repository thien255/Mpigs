CREATE PROCEDURE [dbo].[USP_Get_UserTenant]
	@_userId BIGINT
AS
BEGIN
	SELECT Tenant.* FROM Tenant 
	JOIN UserTenants ON Tenant.[Id] = UserTenants.[TenantId]
	WHERE UserId = @_userId
END
