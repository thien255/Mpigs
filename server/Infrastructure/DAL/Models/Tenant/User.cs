using System;
using System.Collections.Generic;

namespace DAL.Models.Tenant;

public partial class User
{
    public long Id { get; set; }

    public string UserName { get; set; } = null!;

    public string? Password { get; set; }

    public string? FullName { get; set; }

    public string? FistName { get; set; }

    public string? LastName { get; set; }

    public string? Email { get; set; }

    public bool? EmailConfirmed { get; set; }

    public string? PhoneNumber { get; set; }

    public bool? PhoneNumberConfirmed { get; set; }

    public bool? TwoFactorEnabled { get; set; }

    public bool? LockoutEnabled { get; set; }

    public string? Culture { get; set; }

    public bool IsActive { get; set; }

    public bool? IsDelete { get; set; }

    public DateTime CreatedOn { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? LatestUpdatedOn { get; set; }

    public string? LatestUpdatedBy { get; set; }
}
