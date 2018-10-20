using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using TouresCommon;

namespace TouresOMS.Services
{
	public enum BodyMethod
	{
		Post = 0,
		Put = 1
	}

	public enum UriMethod
	{
		Get = 0,
		Delete = 1
	}

	public class HttpService : IHttpService
	{
		private string urlService = "";
		private string token = "";

		public HttpService(string urlService_)
		{
			urlService = urlService_;
		}

		public HttpService(string urlService_, string token_)
		{
			urlService = urlService_;
			token = token_;
		}

		public async Task<ResponseBase<Response>> Send<Response, Request>(Request data, BodyMethod type)
		{
			var response = new ResponseBase<Response>();

			using (var client = new HttpClient())
			{
				try
				{
					if (!string.IsNullOrWhiteSpace(token)) client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

					var content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
					var result = new HttpResponseMessage();

					switch (type)
					{
						case BodyMethod.Post:
							result = await client.PostAsync(urlService, content);
							break;
						case BodyMethod.Put:
							result = await client.PutAsync(urlService, content);
							break;
					}

					if (result.IsSuccessStatusCode)
					{
						var json = result.Content.ReadAsStringAsync().Result;
						response = JsonConvert.DeserializeObject<ResponseBase<Response>>(json);
					}
					else
					{
						response.Code = (int)result.StatusCode;
						response.Message = result.ReasonPhrase;
					}
				}
				catch (Exception ex)
				{
					response.Code = Status.InternalError;
					response.Message = ex.Message;
				}
			}

			return await Task.Run(() => response);
		}

		public async Task<ResponseBase<Response>> Send<Response>(UriMethod type)
		{
			var response = new ResponseBase<Response>();

			using (var client = new HttpClient())
			{
				try
				{
					if (!string.IsNullOrWhiteSpace(token)) client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
					var result = new HttpResponseMessage();

					switch (type)
					{
						case UriMethod.Get:
							result = await client.GetAsync(urlService);
							break;
						case UriMethod.Delete:
							result = await client.DeleteAsync(urlService);
							break;
					}

					if (result.IsSuccessStatusCode)
					{
						var json = result.Content.ReadAsStringAsync().Result;
						response = JsonConvert.DeserializeObject<ResponseBase<Response>>(json);
					}
					else
					{
						response.Code = (int)result.StatusCode;
						response.Message = result.ReasonPhrase;
					}
				}
				catch (Exception ex)
				{
					response.Code = Status.InternalError;
					response.Message = ex.Message;
				}
			}

			return await Task.Run(() => response);
		}
	}
}