using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using TouresOMS.Services;
using TouresOMS.Models;
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

        [HttpGet("get/{tipo}")]
        public async Task<IActionResult> GetReportOrden(int tipo)
        {
            var service = new OrderService(new HttpService($"{urlService}/{tipo}"));
            var response = await service.GetReportOrden();
            return this.Result(response.Code, response);
        }




    }
}
