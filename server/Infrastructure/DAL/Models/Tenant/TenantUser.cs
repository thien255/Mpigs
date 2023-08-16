using System;
using System.Collections.Generic;

namespace DAL.Models.Tenant;

public partial class TenantUser
{
    public long Id { get; set; }

    public string User { get; set; } = null!;

    public long TenantId { get; set; }

    public string IsActive { get; set; } = null!;
}
