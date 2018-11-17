using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using TouresOMS.Models;
using TouresCommon;

namespace TouresOMS.Services
{
	public class OrderService
    {
		private IHttpService httpService;

		public OrderService(IHttpService httpService_)
		{
			httpService = httpService_;
		}

		public async Task<ResponseBase<bool>> InsertOrder(OrderModel data)
		{
			var response = new ResponseBase<bool>();
			response = await httpService.Send<bool, OrderModel>(data, BodyMethod.Post);

			return await Task.Run(() => response);
		}

		public async Task<ResponseBase<List<OrderModel>>> GetOrders()
		{
			var response = new ResponseBase<List<OrderModel>>();
			response = await httpService.Send<List<OrderModel>>(UriMethod.Get);

			return await Task.Run(() => response);
		}

        public async Task<ResponseBase<List<OrderReportModel>>> GetReportOrden()
        {
            var response = new ResponseBase<List<OrderReportModel>>();
            response = await httpService.Send<List<OrderReportModel>>(UriMethod.Get);

            return await Task.Run(() => response);
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
