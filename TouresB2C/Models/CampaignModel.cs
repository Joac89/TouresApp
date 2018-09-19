using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TouresB2C.Models
{
    public class CampaignModel
    {
		public long Id { get; set; }
		public string Name { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime EndDate { get; set; }
		public string Image { get; set; }
    }
}
