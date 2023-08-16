using System.ComponentModel.DataAnnotations;

namespace Infrastructure.Models
{
    public class EntityBaseTime
    {

        [StringLength(100)]
        public string CreatedBy { get; set; }

        public DateTimeOffset CreatedOn { get; set; }

        public DateTimeOffset? LatestUpdatedOn { get; set; }

        [StringLength(100)]
        public string? LatestUpdatedBy { get; set; }
    }
}
