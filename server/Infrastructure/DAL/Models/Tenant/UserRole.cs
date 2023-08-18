using System;
using System.Collections.Generic;

namespace DAL.Models.Tenant;

public partial class UserRole
{
    public long UserId { get; set; }

    public string Role { get; set; } = null!;

    public DateTime CreatedOn { get; set; }

    public string? CreatedBy { get; set; }
}
