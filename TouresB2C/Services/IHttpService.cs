using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TouresCommon;

namespace TouresB2C.Services
{
	public interface IHttpService
	{
		Task<ResponseBase<Response>> Send<Response, Request>(Request data, BodyMethod type);
		Task<ResponseBase<Response>> Send<Response>(UriMethod type);
	}
}
