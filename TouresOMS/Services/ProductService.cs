using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using TouresOMS.Models;
using TouresCommon;

namespace TouresOMS.Services
{
	public class ProductService
	{
		private string urlImages = "";
		private string urlService = "";
        //private int lote = 4;

        private IHttpService httpService;

        public ProductService(IHttpService httpService_)
        {
            httpService = httpService_;
        }

        public ProductService(string url, string images)
		{
			urlService = url;
			urlImages = images;
		}

		public async Task<ResponseBase<List<ProductModel>>> GetSearch(string textSearch, int typeSearch)
		{
			var response = new ResponseBase<List<ProductModel>>();
			var search = new List<ProductModel>();
			var lst = new List<ProductModel>();

			if (!string.IsNullOrWhiteSpace(textSearch))
			{

				using (var client = new HttpClient())
				{
					try
					{
						var result = await client.GetAsync(urlService);

						if (result.IsSuccessStatusCode)
						{
							var json = result.Content.ReadAsStringAsync().Result;
							var cast = JsonConvert.DeserializeObject<ResponseBase<List<ProductModel>>>(json);

							Parallel.ForEach(cast.Data, x => x = x.Mapper());

							response.Code = Status.Ok;
							response.Data = cast.Data;
						}
					}
					catch (Exception ex)
					{
						response.Code = Status.InternalError;
						response.Message = ex.Message;
					}
				}
			}
			else
			{
				response.Code = Status.Ok;
				response.Data = lst;
			}
			if (response.Data.Count > 0) Parallel.ForEach(response.Data, x => x.Image = x.Image.GetImagePath(urlImages));

			return await Task.Run(() => response);



			//var response = new ResponseBase<List<ProductModel>>();
			//var search = new List<ProductModel>();
			//var lst = new List<ProductModel>();

			//if (!string.IsNullOrWhiteSpace(textSearch))
			//{

			//	lst = GetList();

			//	if (typeSearch == 1)
			//	{
			//		lst = lst.Where(x => x.Title.ToLower().Contains(textSearch) || x.Description.ToLower().Contains(textSearch)).ToList();
			//	}
			//	else if (typeSearch == 2)
			//	{
			//		lst = lst.Where(x => x.Id == long.Parse(textSearch)).ToList();
			//	}
			//	var start = ((pag - 1) * lote);

			//	try
			//	{
			//		lst = lst.GetRange(start, lote);
			//	}
			//	catch (Exception)
			//	{
			//		var lstCount = lst.Count;
			//		var prog = start + lote;
			//		var diff = prog - lstCount;
			//		var nlote = lote - diff;

			//		if (nlote <= 0)
			//		{
			//			lst = new List<ProductModel>();
			//		}
			//		else
			//		{
			//			lst = lst.GetRange(start, nlote);
			//		}
			//	}
			//}
			//response.Code = 200;
			//response.Data = lst;

			//if (response.Data.Count > 0) Parallel.ForEach(response.Data, x => x.Image = x.Image.GetImagePath(urlImages));

			//Thread.Sleep(500);

			//return await Task.Run(() => response);
		}

		public async Task<ResponseBase<List<ProductModel>>> GetPrincipals()
		{
			var response = new ResponseBase<List<ProductModel>>();
			var lst = new List<ProductModel>();

			lst = GetList();
			response.Code = 200;
			response.Data = lst;

			Thread.Sleep(500);

			if (response.Data.Count > 0) Parallel.ForEach(response.Data, x => x.Image = x.Image.GetImagePath(urlImages));

			return await Task.Run(() => response);
		}

        public async Task<ResponseBase<bool>> DeleteProduct()
        {
            var response = new ResponseBase<bool>();

            response = await httpService.Send<bool>(UriMethod.Delete);

            return await Task.Run(() => response);
        }

        public async Task<ResponseBase<bool>> InsertProduct(ProductModel data)
        {
            var response = new ResponseBase<bool>();
            response = await httpService.Send<bool, ProductModel>(data, BodyMethod.Post);

            return await Task.Run(() => response);
        }

        public async Task<ResponseBase<bool>> UpdateProduct(ProductModel data)
        {
            var response = new ResponseBase<bool>();
            response = await httpService.Send<bool, ProductModel>(data, BodyMethod.Put);

            return await Task.Run(() => response);
        }

        private List<ProductModel> GetList()
		{
			var lst = new List<ProductModel>
			{
				new ProductModel()
				{
					Id = 1101,
					Price = 76000000,
					Image = "/products/product003.jpg",
					Date = new DateTime(2018, 09, 16),
					Title = "NFL Touch-Down!",
					Description = "Dicen que es el Touch-Down m&aacute;s salvaje de la historia!. No te pierdas el gran encuentro entre <strong>Patriots</strong> y <strong>Buffalo Bills</strong>",
					Rating = 5
				},
				new ProductModel()
				{
					Id = 2001,
					Price = 83000000,
					Image = "/products/product004.jpg",
					Date = new DateTime(2018, 11, 24),
					Title = "UFC Combat",
					Description = "Encuentro explosivo entre <strong>McGregor</strong> y <strong>Nurmagomedov</strong>. Dice Mark Wahlberg que ser&aacute; la mayor pelea de la historia!",
					Rating = 5
				},
				new ProductModel()
				{
					Id = 3201,
					Price = 32000000,
					Image = "/products/product002.jpg",
					Date = new DateTime(2018, 11, 24),
					Title = "Rusia 2018",
					Description = "Duelo de titanes en semi finales de la Copa del mundo con el encuentro entre <strong>Francia</strong> y <strong>B&eacute;lgica</strong>. Final adelantada!",
					Rating = 4
				},
				new ProductModel()
				{
					Id = 4004,
					Price = 20000000,
					Image = "/products/product001.jpg",
					Date = new DateTime(2018, 08, 15),
					Title = "Final Champions!",
					Description = "Vive la final de la Champions League con el encuentro entre <strong>Real Madrid</strong> de Espa&ntilde;a y <strong>Liverpool</strong> de Inglaterra",
					Rating = 3
				},
				new ProductModel()
				{
					Id = 5020,
					Price = 76000000,
					Image = "/products/product001.jpg",
					Date = new DateTime(2018, 09, 16),
					Title = "NFL Touch-Down!",
					Description = "Dicen que es el Touch-Down m&aacute;s salvaje de la historia!. No te pierdas el gran encuentro entre <strong>Patriots</strong> y <strong>Buffalo Bills</strong>",
					Rating = 4
				},
				new ProductModel()
				{
					Id = 60,
					Price = 83000000,
					Image = "/products/product004.jpg",
					Date = new DateTime(2018, 11, 24),
					Title = "UFC Combat",
					Description = "Encuentro explosivo entre <strong>McGregor</strong> y <strong>Nurmagomedov</strong>. Dice Mark Wahlberg que ser&aacute; la mayor pelea de la historia!",
					Rating = 4
				},
				new ProductModel()
				{
					Id = 701,
					Price = 32000000,
					Image = "/products/product003.jpg",
					Date = new DateTime(2018, 11, 24),
					Title = "Rusia 2018",
					Description = "Duelo de titanes en semi finales de la Copa del mundo con el encuentro entre <strong>Francia</strong> y <strong>B&eacute;lgica</strong>. Final adelantada!",
					Rating = 4
				},
				new ProductModel()
				{
					Id = 8,
					Price = 20000000,
					Image = "/products/product002.jpg",
					Date = new DateTime(2018, 08, 15),
					Title = "Final Champions!",
					Description = "Vive la final de la Champions League con el encuentro entre <strong>Real Madrid</strong> de Espa&ntilde;a y <strong>Liverpool</strong> de Inglaterra",
					Rating = 3
				}
			};

			return lst;
		}
	}
}
