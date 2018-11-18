using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using TouresOMS.Services;
using TouresOMS.Models;
using TouresCommon;
using System.Collections.Generic;

namespace TouresOMS.Controllers
{
	[Produces("application/json")]
	[Route("api/Order")]
	public class OrderController : Controller
	{
		private IConfiguration config;
		private string urlService = "";

		public OrderController(IConfiguration configuration)
		{
			config = configuration;
			urlService = config["services:orders"];
		}

		[HttpGet("get/{customer}")]
		public async Task<IActionResult> GetOrders(long customer)
		{
			var token = CommonService.Token.TokenBearerHeader(HttpContext, config);
			var service = new OrderService(new HttpService($"{urlService}/{customer}", token));
			var response = await service.GetOrders();

			return this.Result(response.Code, response);
		}

<<<<<<< HEAD
<<<<<<< HEAD
        [HttpGet("get/all/{Id}")]
        public async Task<IActionResult> GetOrdersById(long Id)
        {
            var token = CommonService.Token.TokenBearerHeader(HttpContext, config);
            var service = new OrderService(new HttpService($"{urlService}/{"all"}/{Id}"));
            var response = await service.GetOrdersById();

            return this.Result(response.Code, response);
        }

        [HttpGet("get/all/Product/{Product}")]
        public async Task<IActionResult> GetOrdersByProduct(long Product)
        {
            var token = CommonService.Token.TokenBearerHeader(HttpContext, config);
            var service = new OrderService(new HttpService($"{urlService}/{"all/Product"}/{Product}"));
            var response = await service.GetOrdersByProduct();                      

            return this.Result(response.Code, response);
        }

        [HttpGet("get/all")]
        public async Task<IActionResult> GetAllOrders()
        {
            var token = CommonService.Token.TokenBearerHeader(HttpContext, config);
            var service = new OrderService(new HttpService($"{urlService}/{"all"}"));
            var response = await service.GetAllOrders();

            //var response1 = response.Data.Find(x => x.OrdId.Equals(68));

            //List<OrderModel> result = new List<OrderModel>();
            //result.Add(response1);

            return this.Result(response.Code, response);
        }

=======
>>>>>>> f691a8a0865f78ac5d64cf3761840358e29b9534
=======
>>>>>>> master
        [HttpPost]
		[Route("create")]
		public async Task<IActionResult> InsertOrder([FromBody] OrderModel data)
		{
			var token = CommonService.Token.TokenBearerHeader(HttpContext, config);
			var service = new OrderService(new HttpService($"{urlService}", token));
			var response = await service.InsertOrder(data);

			return this.Result(response.Code, response);
		}

		[HttpDelete]
		[Route("delete/{id}")]
		public async Task<IActionResult> DeleteOrder(long id)
		{
			var token = CommonService.Token.TokenBearerHeader(HttpContext, config);
			var service = new OrderService(new HttpService($"{urlService}/{id}", token));
			var response = await service.DeleteOrder();

			return this.Result(response.Code, response);
		}
	}
}