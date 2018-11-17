using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using TouresOMS.Services;
using TouresOMS.Models;
using TouresCommon;

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