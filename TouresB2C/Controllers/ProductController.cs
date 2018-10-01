using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TouresB2C.Services;

namespace TouresB2C.Controllers
{
	[Produces("application/json")]
	[Route("api/Product")]
	[EnableCors("*")]
	public class ProductController : Controller
	{
		private IConfiguration config;
		private string urlService = "";

		public ProductController(IConfiguration configuration)
		{
			config = configuration;
			urlService = config["services:productos"];
		}

		[HttpGet]
		public async Task<IActionResult> GetPrincipals()
		{
			var service = new ProductService(urlService);
			var response = await service.GetPrincipals();

			if (response.Data != null && response.Data.Count > 0) response.Data = response.Data.Where(x => x.Rating == 5).ToList();

			return Ok(response);
		}

		[HttpGet]
		[Route("search/{textSearch}/{typeSearch}/{pag}")]
		public async Task<IActionResult> GetSearch(string textSearch, int typeSearch, int pag)
		{
			textSearch = Encoding.UTF8.GetString(Convert.FromBase64String(textSearch));

			var url = $"{urlService}/{typeSearch}/{textSearch}/{pag}";
			var service = new ProductService(url);
			var response = await service.GetSearch(textSearch, typeSearch, pag);

			return Ok(response);
		}

		[HttpGet]
		[Route("search/{textSearch}")]
		public async Task<IActionResult> GetSearch(string textSearch)
		{
			textSearch = Encoding.UTF8.GetString(Convert.FromBase64String(textSearch));

			var service = new ProductService(urlService);
			var response = await service.GetSearch(textSearch, 0);

			return Ok(response);
		}
	}
}