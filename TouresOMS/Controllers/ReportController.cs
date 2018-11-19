using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using TouresOMS.Services;
using TouresCommon;

namespace TouresOMS.Controllers
{
    [Produces("application/json")]
    [Route("api/report")]
    public class ReportController : Controller
    {
        private IConfiguration config;
        private string urlService = "";

        public ReportController(IConfiguration configuration)
        {
            config = configuration;
            urlService = config["services:report"];
        }

        [HttpGet("get/{tipo}/{fecha1}/{fecha2}")]
        public async Task<IActionResult> GetReportOrden(int tipo, string fecha1, string fecha2)
        {
            var service = new ReportService(new HttpService($"{urlService}/{tipo}/{fecha1}/{fecha2}"));
            var response = await service.GetReportOrden();
            return this.Result(response.Code, response);
            //PRUEBAS
        }

        [HttpGet("get/cliente/{tipo}/{fecha1}/{fecha2}")]
        public async Task<IActionResult> GetReportCliente(int tipo, string fecha1, string fecha2)
        {
            var service = new ReportService(new HttpService($"{urlService}/{tipo}/{fecha1}/{fecha2}"));
            var response = await service.GetReportCliente();
            return this.Result(response.Code, response);
        }

        [HttpGet("get/clienteRanking/{cusid}/{fecha1}/{fecha2}")]
        public async Task<IActionResult> GetReportRankingCliente(int cusid, string fecha1, string fecha2)
        {
            var service = new ReportService(new HttpService($"{urlService}/cliente/{cusid}/{fecha1}/{fecha2}"));
            var response = await service.GetReportOrden();
            return this.Result(response.Code, response);
        }

        [HttpGet("get/product/{tipo}/{fecha1}/{fecha2}")]
        public async Task<IActionResult> GetReportRankingProduct(int tipo, string fecha1, string fecha2)
        {
            var service = new ReportService(new HttpService($"{urlService}/product/{tipo}/{fecha1}/{fecha2}"));
            var response = await service.GetReportProduct();
            return this.Result(response.Code, response);
        }
    }
}
