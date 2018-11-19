using System.Threading.Tasks;
using TouresOMS.Models;
using TouresCommon;
using System.Collections.Generic;

namespace TouresOMS.Services
{
	public class CustomerService
	{
		private IHttpService httpService;

		public CustomerService(IHttpService httpService_)
		{
			httpService = httpService_;
		}

		public async Task<ResponseBase<bool>> InsertCustomer(CustomerModel data)
		{
			var response = new ResponseBase<bool>();
			response = await httpService.Send<bool, CustomerModel>(data, BodyMethod.Post);

			return await Task.Run(() => response);
		}

		public async Task<ResponseBase<bool>> UpdateCustomer(CustomerModel data)
		{
			var response = new ResponseBase<bool>();
			response = await httpService.Send<bool, CustomerModel>(data, BodyMethod.Put);

			return await Task.Run(() => response);
		}

		public async Task<ResponseBase<CustomerModel>> GetCustomer()
		{
			var response = new ResponseBase<CustomerModel>();
			response = await httpService.Send<CustomerModel>(UriMethod.Get);

			return await Task.Run(() => response);
		}
        public async Task<ResponseBase<List<CustomerModel>>> GetCustomerByProduct()
        {
            var response = new ResponseBase<List<CustomerModel>>();
            response = await httpService.Send<List<CustomerModel>>(UriMethod.Get);

            return await Task.Run(() => response);
        }

        public async Task<ResponseBase<CustomerModel>> LoginCustomer(LoginModel data)
		{
			if (ValidateState(data))
			{
				var response = new ResponseBase<CustomerModel>();
				response = await httpService.Send<CustomerModel, LoginModel>(data, BodyMethod.Post);

				return await Task.Run(() => response);
			}
			else
			{
				return await Task.Run(() => new ResponseBase<CustomerModel>()
				{
					Code = Status.InvalidData,
					Message = "Invalid Data"
				});
			}

		}

		private bool ValidateState(LoginModel data)
		{
			var result = true;

			result = data.Username != "" && data.Password != "" ? true : false;

			return result;
		}
	}
}
