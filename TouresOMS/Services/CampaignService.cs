using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using TouresOMS.Models;
using TouresCommon;

namespace TouresOMS.Services
{
	public class CampaignService
	{
		private IHttpService httpService;
		private string urlImages = "";

        public CampaignService(IHttpService httpService_)
        {
            httpService = httpService_;
        }

        public CampaignService(IHttpService httpService_, string images)
		{
			httpService = httpService_;
			urlImages = images;
		}

		public async Task<ResponseBase<List<CampaignModel>>> GetCampaign()
		{
			var response = new ResponseBase<List<CampaignModel>>();
			response = await httpService.Send<List<CampaignModel>>(UriMethod.Get);

			if (response.Data.Count > 0)
			{
				for (var x = 0; x < response.Data.Count; ++x)
				{
					response.Data[x] = response.Data[x].Mapper();
					response.Data[x].Image = response.Data[x].Image.GetImagePath(urlImages);
				};
			}

			return await Task.Run(() => response);
		}

		public async Task<ResponseBase<List<ProductModel>>> GetCampaignByProduct()
		{
			var response = new ResponseBase<List<ProductModel>>();
			response = await httpService.Send<List<ProductModel>>(UriMethod.Get);

			if (response.Data.Count > 0)
			{
				for (var x = 0; x < response.Data.Count; ++x)
				{
					response.Data[x] = response.Data[x].Mapper(true);
					response.Data[x].Image = response.Data[x].Image.GetImagePath(urlImages);
				};
			}

			return await Task.Run(() => response);
		}

		public CampaignService()
		{
		}
		public async Task<ResponseBase<List<CampaignModel>>> GetCampaignMock(string urlImages)
		{
			var response = new ResponseBase<List<CampaignModel>>();
			var search = new List<CampaignModel>();
			var lst = new List<CampaignModel>();

			lst = GetList();

			response.Code = 200;
			response.Data = lst;

			if (response.Data.Count > 0) Parallel.ForEach(response.Data, x => x.Image = x.Image.GetImagePath(urlImages));

			Thread.Sleep(500);

			return await Task.Run(() => response);
		}

		private List<CampaignModel> GetList()
		{
			var lst = new List<CampaignModel>
			{
				new CampaignModel()
				{
					Id = 1,
					Name="Los juegos olímpicos se acercan",
					StartDate = new DateTime(2018, 12, 15),
					EndDate = new DateTime(2018, 12, 30),
					Image = "/campaigns/camp202.jpg"
				},
				new CampaignModel()
				{
					Id = 2,
					Name="Vive el Super Tazon con TouresBalon",
					StartDate = new DateTime(2018, 07, 20),
					EndDate = new DateTime(2018, 08, 26),
					Image = "/campaigns/camp201.jpg"
				},
				new CampaignModel()
				{
					Id = 3,
					Name="Rusia 2018 está aquí!",
					StartDate = new DateTime(2018, 09, 05),
					EndDate = new DateTime(2018, 11, 20),
					Image = "/campaigns/camp203.jpg"
				},
				new CampaignModel()
				{
					Id = 4,
					Name="Vuelve la Champions League",
					StartDate = new DateTime(2018, 12, 15),
					EndDate = new DateTime(2018, 12, 30),
					Image = "/campaigns/camp204.jpg"
				}
			};

			return lst;
		}

        public async Task<ResponseBase<bool>> DeleteCampaign()
        {
            var response = new ResponseBase<bool>();

            response = await httpService.Send<bool>(UriMethod.Delete);

            return await Task.Run(() => response);
        }
    }
}
