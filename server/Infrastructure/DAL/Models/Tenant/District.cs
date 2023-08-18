using System;
using System.Collections.Generic;

namespace DAL.Models.Tenant;

public partial class District
{
    public long Id { get; set; }

    public long StateOrProvinceId { get; set; }

    public string Name { get; set; } = null!;

    public string? Type { get; set; }

    public string? Location { get; set; }
}
