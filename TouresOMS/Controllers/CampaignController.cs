using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using TouresOMS.Services;
using TouresCommon;

namespace TouresOMS.Controllers
{
	[Produces("application/json")]
	[Route("api/Campaign")]
	public class CampaignController : Controller
	{
		private IConfiguration config;
		private string urlImages = "";
		private string urlService = "";

		public CampaignController(IConfiguration configuration)
		{
			config = configuration;
			urlImages = config["services:images"];
			urlService = config["services:campaign"];
		}

		[HttpGet("all")]
		public async Task<IActionResult> GetCampaigns()
		{
			var service = new CampaignService(new HttpService($"{urlService}/0"), urlImages);
			var response = await service.GetCampaign();

			//temporal
			foreach (var x in response.Data)
			{
				x.Image = x.Image.Replace("Imagen1.jpg", "/campaigns/camp101.jpg");
				x.Image = x.Image.Replace("image6.jpg", "/campaigns/camp102.jpg");
				x.Image = x.Image.Replace("image5.jpg", "/campaigns/camp103.jpg");

				x.RutaImagen = x.Image;
			};

			return this.Result(response.Code, response);
		}

		[HttpGet("get/{id}")]
		public async Task<IActionResult> GetCampaignsById(long id)
		{
			//temporal
			id = 52;
			var token = CommonService.Token.TokenBearerHeader(HttpContext, config);
			var service = new CampaignService(new HttpService($"{urlService}/{id}/2", token), urlImages);
			var response = await service.GetCampaignByProduct();

			return this.Result(response.Code, response);
		}

		[HttpGet]
		public async Task<IActionResult> GetCampaign()
		{
			var service = new CampaignService();
			var response = await service.GetCampaignMock(urlImages);

			return Ok(response);
		}
	}
}