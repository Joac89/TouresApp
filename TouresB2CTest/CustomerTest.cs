using Microsoft.VisualStudio.TestTools.UnitTesting;
using TouresB2C.Models;
using TouresB2C.Services;
using TouresCommon;

namespace TouresB2CTest
{
	[TestClass]
	public class CustomerTest
	{
		private string url = "http://localhost:4002/api/v1/customer/login";

		[TestMethod]
		public void LoginCustomer_Ok()
		{
			var data = new LoginModel()
			{
				Username = "peperez",
				Password = "123456"
			};
			var layer = new CustomerService(new HttpService(url, BaseTest.Token));
			var result = layer.LoginCustomer(data).Result;

			Assert.IsTrue(result.Code == Status.Ok);
		}

		[TestMethod]
		public void LoginCustomer_ValidData()
		{
			var data = new LoginModel()
			{
				Username = "",
				Password = "123456"
			};
			var layer = new CustomerService(new HttpService(url, BaseTest.Token));
			var result = layer.LoginCustomer(data).Result;

			Assert.IsTrue(result.Code == Status.InvalidData);
		}

		[TestMethod]
		public void LoginCustomer_NotExist()
		{
			var data = new LoginModel()
			{
				Username = "abc",
				Password = "123456"
			};
			var layer = new CustomerService(new HttpService(url, BaseTest.Token));
			var result = layer.LoginCustomer(data).Result;

			Assert.IsTrue(result.Code == Status.NotFound);
		}
	}
}
