using System.ComponentModel.DataAnnotations;

namespace App.Host.ViewModels
{
    public class TenantForm
    {
        [Required]
        public string Name { get; set; }
        public string Code { get; set; }
        public string IsInTrialPeriod { get; set; }
        public DateTime SubscriptionEndDateUtc { get; set; }
        public string Address { get; set; }
        public string Representative { get; set; }
    }
}
