using System;
using System.Collections.Generic;

namespace DAL.Models.Tenant;

public partial class Country
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public string Code { get; set; } = null!;
}
