using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;
using TouresB2C.Models;
using TouresB2C.Services;
using TouresCommon;

namespace TouresB2C.Controllers
{
    [Produces("application/json")]
    [Route("api/Order")]
    public class OrderController : Controller
    {
        private IConfiguration config;
        private string urlService = "";

        public OrderController(IConfiguration configuration)
        {
            config = configuration;
            urlService = config["services:orders"];
        }

        [HttpGet("get/{customer}")]
        public async Task<IActionResult> GetOrders(long customer)
        {
            var token = CommonService.Token.TokenBearerHeader(HttpContext, config);
            var service = new OrderService(new HttpService($"{urlService}/{customer}", token));
            var response = await service.GetOrders();

            return this.Result(response.Code, response);
        }

        //[HttpPost]
        //[Route("create")]
        //public async Task<IActionResult> InsertOrder([FromBody] OrderModel data)
        //{
        //	var token = CommonService.Token.TokenBearerHeader(HttpContext, config);
        //	var service = new OrderService(new HttpService($"{urlService}/insert", token));
        //	var response = await service.InsertOrder(data);

        //	return this.Result(response.Code, response);
        //}

        [HttpPost]
        [Route("create/{bpm}")]
        public async Task<IActionResult> InsertOrder([FromBody] OrderBonita data, bool bpm = true)
        {
            var token = CommonService.Token.TokenBearerHeader(HttpContext, config);
            var service = new OrderService(new HttpService($"{urlService}/insert", token));
            var response = await service.InsertOrder(data.Order);
            var responseOrder = new ResponseBase<ResponseOrder>();

            if (response.Code == Status.Ok)
            {
                responseOrder.Code = response.Code;
                responseOrder.Data = new ResponseOrder() { IdOrder = response.Data };

                //BONITA IMPLEMENT
                if (bpm)
                {
                    try
                    {
                        data.Bonita.ordenInput.IDOrdenOMS = response.Data.ToString();
                        var user = config["bonita:user"];
                        var password = config["bonita:password"];
                        var proccess = config["bonita:proccess"];
                        var service2 = new BonitaService();
                        var response2 = await service2.Deploy(data.Bonita, user, password, proccess);

                        if (response2.Code == Status.Ok)
                        {
                            responseOrder.Data.Case = response2.Data.CaseId;
                        }
                    }
                    catch (Exception)
                    {
                        responseOrder.Message = response.Message + " - Hubo inconvenientes con el BPM";
                    }
                }
                else
                {
                    responseOrder.Data.Case = "0";
                }
                //BONITA IMPLEMENT
            }
            else
            {
                responseOrder.Code = response.Code;
                responseOrder.Message = response.Message;
            }

            return this.Result(responseOrder.Code, responseOrder);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteOrder(long id)
        {
            var token = CommonService.Token.TokenBearerHeader(HttpContext, config);
            var service = new OrderService(new HttpService($"{urlService}/{id}", token));
            var response = await service.DeleteOrder();

            return this.Result(response.Code, response);
        }

        public class OrderBonita
        {
            public OrderModel Order { get; set; }
            public BonitaInstantiationModel Bonita { get; set; }
        }

        public class ResponseOrder
        {
            public long IdOrder { get; set; } = -1;
            public string Case { get; set; } = "-1";
        }
    }
}