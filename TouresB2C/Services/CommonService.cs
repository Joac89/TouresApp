using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;

namespace TouresB2C.Services
{
	public static class CommonService
	{
		public static string GetImagePath(this string image, string path)
		{
			return $"{path}{image}";
		}

		public static class Token
		{
			public static string TokenBearerHeader(HttpContext context)
			{
				var token = context.Request.Headers["Authorization"].ToString();
				token = token.Contains("Bearer") ? token.Substring("Bearer ".Length).Trim() : token;

				return token;
			}

			public static string TokenBearerHeader(HttpContext context, IConfiguration setting)
			{
				var issuer = setting["tokenconfig:issuer"];
				var audience = setting["tokenconfig:audience"];
				var key = setting["tokenconfig:key"];
				var user = setting["tokenconfig:user"];
				var password = setting["tokenconfig:password"];
				var url = setting["services:token"];

				var token = context.Request.Headers["Authorization"].ToString();
				token = token.Contains("Bearer") ? token.Substring("Bearer ".Length).Trim() : token;

				var validate = ValidateToken(token, audience, issuer, key);
				token = validate == 1 ? RefreshToken(user, password, url) : validate == -1 ? "" : token;

				return token;
			}

			private static int ValidateToken(string token, string audience, string issuer, string key)
			{
				var tokenHandler = new JwtSecurityTokenHandler();

				SecurityToken validatedToken;
				TokenValidationParameters validationParameters = new TokenValidationParameters()
				{
					IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(key)),
					ValidAudience = audience,
					ValidIssuer = issuer
				};

				try
				{
					var result = tokenHandler.ValidateToken(token, validationParameters, out validatedToken);
					return 0;
				}
				catch (SecurityTokenException ex)
				{
					var error = ex.Message.ToLower().Contains("lifetime validation failed") ? 1 : -1;
					return error;
				}
				catch (Exception)
				{
					return -1;
				}
			}

			private static string RefreshToken(string userToken, string pswToken, string url)
			{
				var service = new TokenService(new HttpService(url));
				var response = service.GetToken(userToken, pswToken).Result;

				return response.Code == 200 ? response.Data : "";
			}
		}
	}
}
