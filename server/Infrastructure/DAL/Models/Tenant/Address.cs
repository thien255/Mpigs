using System;
using System.Collections.Generic;

namespace DAL.Models.Tenant;

public partial class Address
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Phone { get; set; }

    public string City { get; set; } = null!;

    public string? Zipcode { get; set; }

    public long DistrictId { get; set; }

    public long StateOrProvinceId { get; set; }

    public long CountryId { get; set; }
}
