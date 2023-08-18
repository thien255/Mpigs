CREATE PROCEDURE [dbo].[USP_Get_UserRole]
	@_userId BIGINT
AS
BEGIN
	SELECT Roles.* FROM Roles 
	JOIN UserRole ON Roles.[Role] = UserRole.[Role]
	WHERE UserId = @_userId
END
