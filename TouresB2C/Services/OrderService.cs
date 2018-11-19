using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using TouresB2C.Models;
using TouresCommon;

namespace TouresB2C.Services
{
	public class OrderService
    {
		private IHttpService httpService;

		public OrderService(IHttpService httpService_)
		{
			httpService = httpService_;
		}

		public async Task<ResponseBase<long>> InsertOrder(OrderModel data)
		{
			var response = new ResponseBase<long>();
			response = await httpService.Send<long, OrderModel>(data, BodyMethod.Post);

			return await Task.Run(() => response);
		}

		public async Task<ResponseBase<List<OrderModel>>> GetOrders()
		{
			var response = new ResponseBase<List<OrderModel>>();
			response = await httpService.Send<List<OrderModel>>(UriMethod.Get);

			return await Task.Run(() => response);


			//var response = new ResponseBase<List<OrderModel>>();
			//var search = new List<OrderModel>();
			//var lst = new List<OrderModel>();

			//lst = GetList();

			//response.Code = 200;
			//response.Data = lst;

			//Thread.Sleep(500);

			//return await Task.Run(() => response);
		}

		public async Task<ResponseBase<bool>> DeleteOrder()
		{
			var response = new ResponseBase<bool>();
			response = await httpService.Send<bool>(UriMethod.Delete);

			return await Task.Run(() => response);
		}

		private List<OrderModel> GetList()
		{
			var lst = new List<OrderModel>
			{
				//new OrderModel()
				//{
				//	Code = 9001,
				//	Price = 91000000,
				//	Count = 10,
				//	State = 1,
				//	StateName = "En Proceso"
				//},
				//new OrderModel()
				//{
				//	Code = 9001,
				//	Price = 76000000,
				//	Count = 8,
				//	State = 2,
				//	StateName = "Aprobada"
				//},
				//new OrderModel()
				//{
				//	Code = 9001,
				//	Price = 23000000,
				//	Count = 4,
				//	State = 2,
				//	StateName = "Aprobada"
				//}
			};

			return lst;
		}
	}
}
