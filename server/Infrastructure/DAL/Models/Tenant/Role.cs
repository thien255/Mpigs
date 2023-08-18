using System;
using System.Collections.Generic;

namespace DAL.Models.Tenant;

public partial class Role
{
    public string Key { get; set; } = null!;

    public string? Description { get; set; }

    public bool IsDelete { get; set; }

    public DateTime CreatedOn { get; set; }

    public string CreatedBy { get; set; } = null!;
}
