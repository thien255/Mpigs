using System;
using System.Collections.Generic;

namespace DAL.Models.Tenant;

public partial class UserTenant
{
    public long UserId { get; set; }

    public long TenantId { get; set; }

    public bool IsActive { get; set; }

    public virtual Tenant Tenant { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
