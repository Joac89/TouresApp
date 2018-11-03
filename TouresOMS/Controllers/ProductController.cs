using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TouresOMS.Services;

namespace TouresOMS.Controllers
{
	[Produces("application/json")]
	[Route("api/Product")]
	public class ProductController : Controller
	{
		private IConfiguration config;
		private string urlService = "";
		private string urlImages = "";

		public ProductController(IConfiguration configuration)
		{
			config = configuration;
			urlService = config["services:productos"];
			urlImages = config["services:images"];
		}

		[HttpGet]
		public async Task<IActionResult> GetPrincipals()
		{
			var service = new ProductService(urlService, urlImages);
			var response = await service.GetPrincipals();

			if (response.Data != null && response.Data.Count > 0) response.Data = response.Data.Where(x => x.Rating == 5).ToList();

			return Ok(response);
		}

		[HttpGet]
		[Route("search/{textSearch}/{typeSearch}/{pag}")]
		public async Task<IActionResult> GetSearch(string textSearch, int typeSearch, int pag)
		{
			textSearch = Encoding.UTF8.GetString(Convert.FromBase64String(textSearch));

			var url = typeSearch == 1 ? $"{urlService}/{textSearch}/{typeSearch}/{pag - 1}" : $"{urlService}/{textSearch}/0";
			var service = new ProductService(url, urlImages);
			var response = await service.GetSearch(textSearch, typeSearch);

			return Ok(response);
		}

		[HttpGet]
		[Route("search/{textSearch}")]
		public async Task<IActionResult> GetSearch(string textSearch)
		{
			textSearch = Encoding.UTF8.GetString(Convert.FromBase64String(textSearch));

			var service = new ProductService(urlService, urlImages);
			var response = await service.GetSearch(textSearch, 0);

			return Ok(response);
		}

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteProduct(long id)
        {
            //var token = CommonService.Token.TokenBearerHeader(HttpContext, config);
            var service = new ProductService(new HttpService($"{urlService}/{id}"));
            var response = await service.DeleteProduct();

            return this.Ok(response);
        }

    }
}