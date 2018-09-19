using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using TouresB2C.Services;

namespace TouresB2C.Controllers
{
    [Produces("application/json")]
    [Route("api/Order")]
	[EnableCors("*")]
	public class OrderController : Controller
    {
		private IConfiguration config;
		private string urlService = "";

		public OrderController(IConfiguration configuration)
		{
			config = configuration;
			urlService = config["services:productos"];
		}

		[HttpGet]
		public async Task<IActionResult> GetOrders()
		{
			var service = new OrderService(urlService);
			var response = await service.GetOrders();
			
			return Ok(response);
		}

	}
}