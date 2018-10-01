using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using TouresB2C.Models;
using TouresCommon;

namespace TouresB2C.Services
{
	public class RegistrationService
	{
		private IHttpService httpService;

		public RegistrationService(IHttpService httpService_)
		{
			httpService = httpService_;
		}

		public async Task<ResponseBase<bool>> InsertCustomer(RegistrationModel data)
		{
			var response = new ResponseBase<bool>();
			response = await httpService.Send<bool, RegistrationModel>(data, BodyMethod.Post);

			return await Task.Run(() => response);
		}

		public async Task<ResponseBase<bool>> UpdateCustomer(RegistrationModel data)
		{
			var response = new ResponseBase<bool>();
			response = await httpService.Send<bool, RegistrationModel>(data, BodyMethod.Put);

			return await Task.Run(() => response);
		}

		public async Task<ResponseBase<RegistrationModel>> GetCustomer()
		{
			var response = new ResponseBase<RegistrationModel>();
			response = await httpService.Send<RegistrationModel>(UriMethod.Get);

			return await Task.Run(() => response);
		}

		public async Task<ResponseBase<RegistrationModel>> LoginCustomer(LoginModel data)
		{
			var response = new ResponseBase<RegistrationModel>();
			response = await httpService.Send<RegistrationModel, LoginModel>(data, BodyMethod.Post);
						
			return await Task.Run(() => response);
		}
	}
}
