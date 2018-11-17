using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TouresOMS.Services;
using TouresOMS.Models;
using System.IO;

namespace TouresOMS.Controllers
{
	[Produces("application/json")]
	[Route("api/Product")]
	public class ProductController : Controller
	{
		private IConfiguration config;
		private string urlService = "";
		private string urlImageslocal = "";
        private string urlImages = "";

        public ProductController(IConfiguration configuration)
		{
			config = configuration;
			urlService = config["services:productos"];
			urlImageslocal = config["services:imageslocal"];
            urlImages = config["services:images"];
        }

		[HttpGet]
		public async Task<IActionResult> GetPrincipals()
		{
			var service = new ProductService(urlService, urlImages);
			var response = await service.GetPrincipals();

			if (response.Data != null && response.Data.Count > 0) response.Data = response.Data.Where(x => x.Rating == 5).ToList();

			return Ok(response);
		}

		[HttpGet]
		[Route("search/{textSearch}/{typeSearch}/{pag}")]
		public async Task<IActionResult> GetSearch(string textSearch, int typeSearch, int pag)
		{
			textSearch = Encoding.UTF8.GetString(Convert.FromBase64String(textSearch));

			var url = typeSearch == 1 ? $"{urlService}/{textSearch}/{typeSearch}/{pag - 1}" : $"{urlService}/{textSearch}/0";
			var service = new ProductService(url, urlImages);
			var response = await service.GetSearch(textSearch, typeSearch);

			return Ok(response);
		}

		[HttpGet]
		[Route("search/{textSearch}")]
		public async Task<IActionResult> GetSearch(string textSearch)
		{
			textSearch = Encoding.UTF8.GetString(Convert.FromBase64String(textSearch));

			var service = new ProductService(urlService, urlImages);
			var response = await service.GetSearch(textSearch, 0);

			return Ok(response);
		}

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteProduct(long id)
        {
            //var token = CommonService.Token.TokenBearerHeader(HttpContext, config);
            var service = new ProductService(new HttpService($"{urlService}/{id}"));
            var response = await service.DeleteProduct();

            return this.Ok(response);
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> InsertProduct([FromBody] ProductImgModel data)
        {
            ///var token = CommonService.Token.TokenBearerHeader(HttpContext, config);
            var service = new ProductService(new HttpService($"{urlService}"));
            ProductSModel data1 = new ProductSModel();

            data1.id = data.id;
            data1.nombre = data.nombre;
            data1.espectaculo = data.espectaculo;
            data1.fechaSalida = data.fechaSalida + " 00:00:00";
            data1.cuidadEspectaculo = data.cuidadEspectaculo;
            data1.fechaLlegada = data.fechaLlegada + " 00:00:00";
            data1.fechaEspectaculo = data.fechaEspectaculo + " 00:00:00";
            data1.tipoEspectaculo = data.tipoEspectaculo;
            data1.tipoHospedaje = data.tipoHospedaje;
            data1.tipoTransporte = data.tipoTransporte;
            data1.rutaImagen = data.rutaImagen;
            data1.route = data.route;

            saveImg(data.image, data.rutaImagen);

            var response = await service.InsertProduct(data1);

            return this.Ok(response);
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdateProduct([FromBody] ProductImgModel data, long id)
        {
           // var token = CommonService.Token.TokenBearerHeader(HttpContext, config);
            var service = new ProductService(new HttpService($"{urlService}/{id}"));
            ProductSModel data1 = new ProductSModel();

            data1.id = data.id;
            data1.nombre = data.nombre;
            data1.espectaculo = data.espectaculo;
            data1.fechaSalida = data.fechaSalida + " 00:00:00";
            data1.cuidadEspectaculo = data.cuidadEspectaculo;
            data1.fechaLlegada = data.fechaLlegada + " 00:00:00";
            data1.fechaEspectaculo = data.fechaEspectaculo + " 00:00:00";
            data1.tipoEspectaculo = data.tipoEspectaculo;
            data1.tipoHospedaje = data.tipoHospedaje;
            data1.tipoTransporte = data.tipoTransporte;
            data1.rutaImagen = data.rutaImagen;
            data1.route = data.route;

            saveImg(data.image, data.rutaImagen);
              
            
            var response = await service.UpdateProduct(data1);

            return this.Ok(response);
        }

        private bool saveImg(string img, string rutaimg)
        {
            bool success = false;

            if (img != "")
            {
                //string converted = data.image.Replace('-', '+');
                //converted = converted.Replace('_', '/');

                string[] urlImages = img.Split(',');
                string[] uriext = urlImages[0].Split(';');
                string[] ext = uriext[0].Split('/');

                
                string fullPath = urlImageslocal + rutaimg;

                if (Directory.Exists(urlImageslocal))
                {
                    try
                    {
                        using (FileStream fs = new FileStream(fullPath, FileMode.CreateNew, FileAccess.Write))
                        {
                            byte[] bytes = Convert.FromBase64String(urlImages[1]);
                            fs.Write(bytes, 0, bytes.Length);
                            //System.IO.File.WriteAllBytes(urlImageslocal, Convert.FromBase64String(urlImages[1]));
                        }

                        if (System.IO.File.Exists(fullPath))
                        {
                            //System.IO.File.Delete(fullPath);
                            success = true;
                        }
                    }
                    catch (Exception ex)
                    {
                      success = false;
                    }
                }                            
            }

            return success;
        }


    }
}