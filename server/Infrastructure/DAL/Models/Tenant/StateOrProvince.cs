using System;
using System.Collections.Generic;

namespace DAL.Models.Tenant;

public partial class StateOrProvince
{
    public long Id { get; set; }

    public long CountryId { get; set; }

    public string? Code { get; set; }

    public string Name { get; set; } = null!;

    public string? Type { get; set; }
}
