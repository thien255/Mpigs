CREATE PROC USP_Get_UserPaging
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
		FullName,UserName,Email,EmailConfirmed,PhoneNumber,PhoneNumberConfirmed,LockoutEnabled,CreatedOn,CreatedBy
	INTO #_dataTemp 
	FROM Users
	WHERE 
	(@_startDate IS NULL OR CreatedOn >= @_startDate)
	AND (@_startDate IS NULL OR CreatedOn <= @_startDate)
	AND (@_search IS NULL OR Email LIKE '%'+@_search+'%' OR UserName LIKE '%'+@_search+'%' OR FullName LIKE '%'+@_search+'%')
	AND (@_status IS NULL OR LockoutEnabled = @_status)
	
	SET @_totalRows = @@ROWCOUNT;
	SELECT * FROM #_dataTemp
	ORDER BY 
		CASE WHEN @_sortExp IS NULL THEN CreatedOn END DESC, 
		CASE WHEN @_sortExp = 'CreatedOn' and (@_sortDir = 'ASC' or @_SortDir is null) THEN CreatedOn END ASC, 
		CASE WHEN @_sortExp = 'CreatedOn' and @_SortDir = 'DESC' THEN CreatedOn END DESC, 
		CASE WHEN @_sortExp = 'UserName' and (@_SortDir = 'ASC' or @_SortDir is null) THEN UserName END ASC, 
		CASE WHEN @_sortExp = 'UserName' and @_SortDir = 'DESC' THEN UserName END DESC,
		CASE WHEN @_sortExp = 'Email' and (@_SortDir = 'ASC' or @_SortDir is null) THEN Email END ASC,
		CASE WHEN @_sortExp = 'Email' and @_SortDir = 'DESC' THEN Email END DESC,
		CASE WHEN @_sortExp = 'EmailConfirmed' and (@_SortDir = 'ASC' or @_SortDir is null) THEN EmailConfirmed END ASC,
		CASE WHEN @_sortExp = 'EmailConfirmed' and @_SortDir = 'DESC' THEN EmailConfirmed END DESC,
		CASE WHEN @_sortExp = 'LockoutEnabled' and (@_SortDir = 'ASC' or @_SortDir is null) THEN LockoutEnabled END ASC,
		CASE WHEN @_sortExp = 'LockoutEnabled' and @_SortDir = 'DESC' THEN LockoutEnabled END DESC
	OFFSET @_offset ROWS FETCH NEXT @_fetch ROWS ONLY
END
