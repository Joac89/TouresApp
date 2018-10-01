//using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using TouresB2C.Models;
using TouresB2C.Services;
//using TouresCommon;

namespace TouresB2C.Controllers
{
	[Produces("application/json")]
	[Route("api/Registration")]
	[EnableCors("*")]
	public class RegistrationController : Controller
	{
		private IConfiguration config;
		private string urlService = "";
		private string tokenService = "";

		public RegistrationController(IConfiguration configuration)
		{
			config = configuration;
			urlService = config["services:registration"];
			tokenService = config["services:token"];
		}
		
		[HttpPost]
		[Route("login")]
		public async Task<IActionResult> loginCustomer([FromBody] LoginModel data)
		{
			var token = CommonService.TokenBearerHeader(HttpContext);
			var service = new RegistrationService(new HttpService($"{urlService}/login", token));
			var response = await service.LoginCustomer(data);

			//return this.Result(response.Code, response);
			return response.Code == 200 ? Ok(response) : StatusCode(response.Code, response);
		}

		[HttpGet]
		[Route("get/{id}")]
		public async Task<IActionResult> getCustomer(string id)
		{
			var token = CommonService.TokenBearerHeader(HttpContext);
			var service = new RegistrationService(new HttpService($"{urlService}/{id}", token));
			var response = await service.GetCustomer();

			//return this.Result(response.Code, response);
			return response.Code == 200 ? Ok(response) : StatusCode(response.Code, response);
		}

		[HttpPost]
		[Route("add")]
		public async Task<IActionResult> InsertCustomer([FromBody] RegistrationModel data)
		{
			var token = CommonService.TokenBearerHeader(HttpContext);
			var service = new RegistrationService(new HttpService($"{urlService}", token));
			var response = await service.InsertCustomer(data);

			//return this.Result(response.Code, response);
			return response.Code == 200 ? Ok(response) : StatusCode(response.Code, response);
		}

		[HttpPut]
		[Route("update")]
		public async Task<IActionResult> UpdateCustomer([FromBody] RegistrationModel data)
		{
			var token = CommonService.TokenBearerHeader(HttpContext);
			var service = new RegistrationService(new HttpService($"{urlService}", token));
			var response = await service.UpdateCustomer(data);

			//return this.Result(response.Code, response);
			return response.Code == 200 ? Ok(response) : StatusCode(response.Code, response);
		}	
	}
}