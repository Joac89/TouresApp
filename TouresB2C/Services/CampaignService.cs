using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TouresB2C.Models;

namespace TouresB2C.Services
{
	public class CampaignService
	{
		public async Task<ResponseModel<List<CampaignModel>>> GetCampaign()
		{
			var response = new ResponseModel<List<CampaignModel>>();
			var search = new List<CampaignModel>();
			var lst = new List<CampaignModel>();

			lst = GetList();

			response.Code = 200;
			response.Data = lst;

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
					Image = "img/campaigns/camp202.jpg"
				},
				new CampaignModel()
				{
					Id = 2,
					Name="Vive el Super Tazon con TouresBalon",
					StartDate = new DateTime(2018, 07, 20),
					EndDate = new DateTime(2018, 08, 26),
					Image = "img/campaigns/camp201.jpg"
				},
				new CampaignModel()
				{
					Id = 3,
					Name="Rusia 2018 está aquí!",
					StartDate = new DateTime(2018, 09, 05),
					EndDate = new DateTime(2018, 11, 20),
					Image = "img/campaigns/camp203.jpg"
				},
				new CampaignModel()
				{
					Id = 4,
					Name="Vuelve la Champions League",
					StartDate = new DateTime(2018, 12, 15),
					EndDate = new DateTime(2018, 12, 30),
					Image = "img/campaigns/camp204.jpg"
				}
			};

			return lst;
		}
	}
}
