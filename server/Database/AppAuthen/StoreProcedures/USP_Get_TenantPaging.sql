CREATE PROC USP_Get_TenantPaging
@_startDate VARCHAR(10) NULL,
@_endDate VARCHAR(10) NULL,
@_search VARCHAR(10) NULL,
@_status INT NULL,
@_sortExp VARCHAR(10) NULL,
@_sortDir VARCHAR(10) NULL,
@_offset INT = 0,
@_fetch INT = 20,
@_totalRows INT OUT
AS
BEGIN
	SELECT 
		*
	INTO #_dataTemp 
	FROM Tenant
	WHERE 
	(@_startDate IS NULL OR CreatedOn >= @_startDate)
	AND (@_startDate IS NULL OR CreatedOn <= @_startDate)
	AND (@_search IS NULL OR [Name] LIKE '%'+@_search+'%' OR [ShortName] LIKE '%'+@_search+'%')
	
	SET @_totalRows = @@ROWCOUNT;
	SELECT * FROM #_dataTemp
	ORDER BY 
		CASE WHEN @_sortExp IS NULL THEN CreatedOn END DESC, 
		CASE WHEN @_sortExp = 'CreatedOn' and (@_sortDir = 'ASC' or @_SortDir is null) THEN CreatedOn END ASC, 
		CASE WHEN @_sortExp = 'CreatedOn' and @_SortDir = 'DESC' THEN CreatedOn END DESC, 
		CASE WHEN @_sortExp = 'ShortName' and (@_SortDir = 'ASC' or @_SortDir is null) THEN ShortName END ASC, 
		CASE WHEN @_sortExp = 'ShortName' and @_SortDir = 'DESC' THEN ShortName END DESC,
		CASE WHEN @_sortExp = 'Name' and (@_SortDir = 'ASC' or @_SortDir is null) THEN [Name] END ASC,
		CASE WHEN @_sortExp = 'Name' and @_SortDir = 'DESC' THEN [Name] END DESC,
		CASE WHEN @_sortExp = 'Type' and (@_SortDir = 'ASC' or @_SortDir is null) THEN [Type] END ASC,
		CASE WHEN @_sortExp = 'Type' and @_SortDir = 'DESC' THEN [Type] END DESC,
		CASE WHEN @_sortExp = 'Expired' and (@_SortDir = 'ASC' or @_SortDir is null) THEN Expired END ASC,
		CASE WHEN @_sortExp = 'Expired' and @_SortDir = 'DESC' THEN Expired END DESC,
		CASE WHEN @_sortExp = 'Email' and (@_SortDir = 'ASC' or @_SortDir is null) THEN Email END ASC,
		CASE WHEN @_sortExp = 'Email' and @_SortDir = 'DESC' THEN Email END DESC,
		CASE WHEN @_sortExp = 'IsActive' and (@_SortDir = 'ASC' or @_SortDir is null) THEN IsActive END ASC,
		CASE WHEN @_sortExp = 'IsActive' and @_SortDir = 'DESC' THEN IsActive END DESC,
		CASE WHEN @_sortExp = 'IsDelete' and (@_SortDir = 'ASC' or @_SortDir is null) THEN IsDelete END ASC,
		CASE WHEN @_sortExp = 'IsDelete' and @_SortDir = 'DESC' THEN IsDelete END DESC
	OFFSET @_offset ROWS FETCH NEXT @_fetch ROWS ONLY
END
