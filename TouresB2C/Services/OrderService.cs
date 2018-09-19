using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TouresB2C.Models;

namespace TouresB2C.Services
{
    public class OrderService
    {
		private string urlService = "";

		public OrderService(string url)
		{
			urlService = url;
		}

		public async Task<ResponseModel<List<OrderModel>>> GetOrders()
		{
			var response = new ResponseModel<List<OrderModel>>();
			var search = new List<OrderModel>();
			var lst = new List<OrderModel>();

			lst = GetList();

			response.Code = 200;
			response.Data = lst;

			Thread.Sleep(500);

			return await Task.Run(() => response);
		}

		private List<OrderModel> GetList()
		{
			var lst = new List<OrderModel>
			{
				new OrderModel()
				{
					Code = 9001,
					Price = 91000000,
					Count = 10,
					State = 1,
					StateName = "En Proceso"
				},
				new OrderModel()
				{
					Code = 9001,
					Price = 76000000,
					Count = 8,
					State = 2,
					StateName = "Aprobada"
				},
				new OrderModel()
				{
					Code = 9001,
					Price = 23000000,
					Count = 4,
					State = 2,
					StateName = "Aprobada"
				}
			};

			return lst;
		}
	}
}
