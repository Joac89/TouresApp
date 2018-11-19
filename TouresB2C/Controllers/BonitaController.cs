using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Threading.Tasks;
using TouresB2C.Models;
using TouresB2C.Services;
using TouresCommon;

namespace TouresB2C.Controllers
{
    [Produces("application/json")]
    [Route("api/Bonita")]
    public class BonitaController : Controller
    {
        private IConfiguration config;
        public BonitaController(IConfiguration configuration)
        {
            config = configuration;
        }

        [HttpPost("deploy")]
        public async Task<IActionResult> Deploy([FromBody] BonitaInstantiationModel data)
        {
            var user = config["bonita:user"]; 
            var password = config["bonita:password"];
            var proccess = config["bonita:proccess"];
            var service = new BonitaService();
            var response = await service.Deploy(data, user, password, proccess);

            return this.Result(response.Code, response);
        }

        //[HttpGet("authenticate/{proccess}")]
        //public async Task<IActionResult> Authenticate(string proccess)
        //{
        //    var token = "";
        //    var urlService = "http://10.39.1.135:8080/bonita/loginservice?username=walter.bates&password=bpm";
        //    var httpservice = new HttpService($"{urlService}", true);
        //    var service = new BonitaService(httpservice);
        //    var result = await service.Authentication();
        //    System.Net.Cookie cookie;

        //    if (result.Code == Status.Ok)
        //    {
        //        var cookies = httpservice.Cookies;
        //        cookie = cookies.Where(x => x.Name == "X-Bonita-API-Token").FirstOrDefault();
        //        token = cookie.Value;

        //        var cheaders = Request.Headers["Set-Cookie"];
        //    }

        //    var urlService2 = $"http://10.39.1.135:8080/bonita/API/bpm/process/{proccess}/instantiation";
        //    var httpservice2 = new HttpService($"{urlService}");

        //    var service2 = new BonitaService(httpservice2);
        //    var headers = new HeaderDictionary() {              
        //        { "X-Bonita-API-Token", Request.Headers["X-Bonita-API-Token"].ToString() },
        //    };
        //    //var response = await service.Instantiation(data, headers);


        //    var response = new ResponseBase<string>()
        //    {
        //        Code = result.Code,
        //        Message = result.Code == Status.Ok ? "" : result.Message,
        //        Data = token
        //    };

        //    return this.Result(response.Code, response);
        //}

        //[HttpPost("instantiation/{id}")]
        //public async Task<IActionResult> Instantiation([FromBody] BonitaInstantiationModel data, string id)
        //{
        //    var urlService = $"http://10.39.1.135:8080/bonita/API/bpm/process/{id}/instantiation";
        //    var httpservice = new HttpService($"{urlService}", token_: "asasasasasasas");

        //    var service = new BonitaService(httpservice);
        //    var headers = new HeaderDictionary() { { "Cookie", Request.Headers["X-Bonita-API-Token"].ToString() } };
        //    var response = await service.Instantiation(data, headers);


        //    return this.Result(response.Code, response);
        //}
    }
}