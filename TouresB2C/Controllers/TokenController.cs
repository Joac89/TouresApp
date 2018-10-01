using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using TouresB2C.Models;
using TouresB2C.Services;
using TouresCommon;

namespace TouresB2C.Controllers
{
	[Produces("application/json")]
    [Route("api/Token")]
	//[EnableCors("*")]
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
			userToken = config["credentials:user"];
			pswToken = config["credentials:password"];
		}

		[AllowAnonymous]
		[HttpPost]
		public async Task<IActionResult> GetToken()
		{
			var data = new TokenModel()
			{
				Username = userToken,
				Password = pswToken
			};
			var service = new TokenService(new HttpService(tokenService));
			var response = await service.GetToken(data);

			return this.Result(response.Code, response);
		}
	}
}