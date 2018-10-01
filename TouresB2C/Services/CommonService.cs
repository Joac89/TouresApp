using Microsoft.AspNetCore.Http;

namespace TouresB2C.Services
{
	public static class CommonService
	{
		public static string TokenBearerHeader(HttpContext context)
		{
			var token = context.Request.Headers["Authorization"].ToString();
			token = token.Contains("Bearer") ? token.Substring("Bearer ".Length).Trim() : token;

			return token;
		}
	}
}
