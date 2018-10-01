using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TouresB2C.Models
{
    public class TokenResponse
    {
		public long Id { get; set; }
		public string Names { get; set; }
		public string Surnames { get; set; }
		public string Status { get; set; }
		public string Token { get; set; }
	}
}
