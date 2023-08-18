CREATE PROCEDURE [dbo].[USP_Get_RolePaging]
	@_search NVARCHAR(60) = NULL,
	@_sortDir NVARCHAR(5) = NULL,
	@_sortExp NVARCHAR(60) = NULL,
	@_offset INT = 0,
	@_fetch INT = 20,
	@_totalRows INT OUTPUT
AS
	SELECT 
		[Role],[Description],IsDelete,CreatedOn,CreatedBy
	INTO #_dataTemp 
	FROM Roles
	WHERE  
	(@_search IS NULL OR [Role] LIKE '%'+@_search+'%' OR [Description] LIKE '%'+@_search+'%')
	
	SET @_totalRows = @@ROWCOUNT;
	SELECT * FROM #_dataTemp
	ORDER BY 
		CASE WHEN @_sortExp IS NULL THEN CreatedOn END DESC, 
		CASE WHEN @_sortExp = 'CreatedOn' and (@_sortDir = 'ASC' or @_SortDir is null) THEN CreatedOn END ASC, 
		CASE WHEN @_sortExp = 'CreatedOn' and @_SortDir = 'DESC' THEN CreatedOn END DESC, 
		CASE WHEN @_sortExp = 'Role' and (@_SortDir = 'ASC' or @_SortDir is null) THEN [Role] END ASC, 
		CASE WHEN @_sortExp = 'Role' and @_SortDir = 'DESC' THEN [Role] END DESC,
		CASE WHEN @_sortExp = 'IsDelete' and (@_SortDir = 'ASC' or @_SortDir is null) THEN IsDelete END ASC,
		CASE WHEN @_sortExp = 'IsDelete' and @_SortDir = 'DESC' THEN IsDelete END DESC,
		CASE WHEN @_sortExp = 'CreatedBy' and (@_SortDir = 'ASC' or @_SortDir is null) THEN CreatedBy END ASC,
		CASE WHEN @_sortExp = 'CreatedBy' and @_SortDir = 'DESC' THEN CreatedBy END DESC
	OFFSET @_offset ROWS FETCH NEXT @_fetch ROWS ONLY
RETURN 0
