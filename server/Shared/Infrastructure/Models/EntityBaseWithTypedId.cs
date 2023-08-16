using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class EntityBaseWithTypedId<TId>: IEntityWithTypedId<TId>
    {
        public virtual TId Id { get; protected set; }
    }
}
