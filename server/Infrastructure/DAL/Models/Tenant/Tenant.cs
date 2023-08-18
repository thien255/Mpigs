using System;
using System.Collections.Generic;

namespace DAL.Models.Tenant;

public partial class Tenant
{
    public long Id { get; set; }

    public string Code { get; set; } = null!;

    public string ShortName { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public string Type { get; set; } = null!;

    public string? Logo { get; set; }

    public string? Address { get; set; }

    public string? Phone { get; set; }

    public string? Representative { get; set; }

    public string? License { get; set; }

    public DateTime? Expired { get; set; }

    public string? Email { get; set; }

    public string? Scale { get; set; }

    public bool? IsActive { get; set; }

    public bool IsDelete { get; set; }

    public DateTime CreatedOn { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? LatestUpdatedOn { get; set; }

    public string? UpdatedBy { get; set; }
}
