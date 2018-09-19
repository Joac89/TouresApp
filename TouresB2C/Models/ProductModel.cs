using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TouresB2C.Models
{
    public class ProductModel
    {
		public long Id { get; set; }
		public decimal Price { get; set; }
		public string Image { get; set; }
		public DateTime Date { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public int Rating { get; set; }
		public int Count { get; set; } = 0;
	}
}
