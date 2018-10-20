using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using TouresOMS.Models;
using TouresOMS.Services;
using TouresCommon;

namespace TouresOMS.Controllers
{
	[Produces("application/json")]
	[Route("api/Customer")]
	public class CustomerController : Controller
	{
		private IConfiguration config;
		private string urlService = "";

		public CustomerController(IConfiguration configuration)
		{
			config = configuration;
			urlService = config["services:customer"];			
		}

		[HttpPost]
		[Route("login")]
		public async Task<IActionResult> loginCustomer([FromBody] LoginModel data)
		{
			var token = CommonService.Token.TokenBearerHeader(HttpContext, config);			
			var service = new CustomerService(new HttpService($"{urlService}/login", token));
			var response = await service.LoginCustomer(data);

			return this.Result(response.Code, response);
		}

		[HttpGet]
		[Route("get/{id}")]
		public async Task<IActionResult> getCustomer(string id)
		{
			var token = CommonService.Token.TokenBearerHeader(HttpContext, config);
			var service = new CustomerService(new HttpService($"{urlService}/{id}", token));
			var response = await service.GetCustomer();

			return this.Result(response.Code, response);
		}

		[HttpPost]
		[Route("create")]
		public async Task<IActionResult> InsertCustomer([FromBody] CustomerModel data)
		{
			var token = CommonService.Token.TokenBearerHeader(HttpContext, config);
			var service = new CustomerService(new HttpService($"{urlService}", token));
			var response = await service.InsertCustomer(data);

			return this.Result(response.Code, response);
		}

		[HttpPut]
		[Route("update")]
		public async Task<IActionResult> UpdateCustomer([FromBody] CustomerModel data)
		{
			var token = CommonService.Token.TokenBearerHeader(HttpContext, config);
			var service = new CustomerService(new HttpService($"{urlService}", token));
			var response = await service.UpdateCustomer(data);

			return this.Result(response.Code, response);
		}
	}
}