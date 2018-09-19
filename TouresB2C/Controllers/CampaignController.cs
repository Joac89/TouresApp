using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TouresB2C.Services;

namespace TouresB2C.Controllers
{
    [Produces("application/json")]
    [Route("api/Campaign")]
	[EnableCors("*")]
	public class CampaignController : Controller
    {
		[HttpGet]
		public async Task<IActionResult> GetCampaign()
		{
			var service = new CampaignService();
			var response = await service.GetCampaign();

			return Ok(response);
		}

	}
}