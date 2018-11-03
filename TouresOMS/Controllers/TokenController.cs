using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using TouresOMS.Models;
using TouresOMS.Services;
using TouresCommon;

namespace TouresOMS.Controllers
{
	[Produces("application/json")]
    [Route("api/Token")]
	public class TokenController : Controller
    {
		private IConfiguration config;
		private string urlService = "";
		private string tokenService = "";
		private string userToken = "";
		private string pswToken = "";

		public TokenController(IConfiguration configuration)
		{
			config = configuration;
			urlService = config["services:registration"];
			tokenService = config["services:token"];

			userToken = config["tokenconfig:user"];
			pswToken = config["tokenconfig:password"];
		}

		[AllowAnonymous]
		[HttpPost]
		public async Task<IActionResult> GetToken()
		{

            var service = new TokenService(new HttpService(tokenService));
			var response = await service.GetToken(userToken, pswToken);

			return this.Result(response.Code, response);
		}
	}
}