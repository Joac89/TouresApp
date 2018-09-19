using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TouresB2C.Models
{
    public class OrderModel
    {
		public long Code { get; set; }
		public int Count { get; set; }
		public decimal Price { get; set; }
		public int State { get; set; }
		public string StateName { get; set; }
    }
}
