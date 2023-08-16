using System;
using System.Collections.Generic;

namespace DAL.Models.Tenant;

public partial class Tenant
{
    public long Id { get; set; }

    public string? Code { get; set; }

    public string Name { get; set; } = null!;

    public bool? IsInTrialPeriod { get; set; }

    public DateTime? SubscriptionEndDateUtc { get; set; }

    public string? Address { get; set; }

    public string? Representative { get; set; }

    public string? RepresentativePhone { get; set; }

    public string? TaxCode { get; set; }

    public string? Logo { get; set; }

    public DateTime CreatedOn { get; set; }

    public DateTime? LatestUpdatedOn { get; set; }

    public string? CreatedBy { get; set; }

    public string? LatestUpdatedBy { get; set; }

    public bool? IsActive { get; set; }

    public bool IsDelete { get; set; }
}
