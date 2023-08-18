using System;
using System.Collections.Generic;

namespace DAL.Models.Tenant;

public partial class Logged
{
    public long Id { get; set; }

    public string UserName { get; set; } = null!;

    public DateTime CreatedOn { get; set; }

    public string? AccessToken { get; set; }

    public DateTime? ExpTime { get; set; }

    public string? RefreshToken { get; set; }

    public DateTime? RefreshTokenExpiryTime { get; set; }

    public string? DeviceId { get; set; }
}
