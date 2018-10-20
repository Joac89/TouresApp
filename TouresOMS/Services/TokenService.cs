using System.Threading.Tasks;
using TouresOMS.Models;
using TouresCommon;

namespace TouresOMS.Services
{
	public class TokenService
	{
		protected IHttpService httpService;

		public TokenService(IHttpService httpService_)
		{
			httpService = httpService_;
		}

		public async Task<ResponseBase<string>> GetToken(string userToken, string pswToken)
		{
			var data = new TokenModel()
			{
				Username = userToken,
				Password = pswToken
			};
			var response = new ResponseBase<string>() { Data = "" };
			var httpResponse = await httpService.Send<TokenResponse, TokenModel>(data, BodyMethod.Post);

			if(httpResponse.Code == Status.Ok && httpResponse.Data != null)
			{				
				response.Data = httpResponse.Data.Token;
			}
			response.Code = httpResponse.Code;

			return await Task.Run(() => response);
		}		
	}
}
