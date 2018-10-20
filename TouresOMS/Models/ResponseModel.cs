using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TouresOMS.Models
{
    public class ResponseModel<T>
    {
		public int Code { get; set; } = 0;
		public string Message { get; set; } = "";
		public T Data { get; set; }
    }
}
