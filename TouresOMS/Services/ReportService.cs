using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using TouresOMS.Models;
using TouresCommon;

namespace TouresOMS.Services
{
    public class ReportService
    {
        private IHttpService httpService;

        public ReportService(IHttpService httpService_)
        {
            httpService = httpService_;
        }

        public async Task<ResponseBase<List<OrderReportModel>>> GetReportOrden()
        {
            var response = new ResponseBase<List<OrderReportModel>>();
            response = await httpService.Send<List<OrderReportModel>>(UriMethod.Get);

            return await Task.Run(() => response);
        }

        public async Task<ResponseBase<List<ClienteReportModel>>> GetReportCliente()
        {
            var response = new ResponseBase<List<ClienteReportModel>>();
            response = await httpService.Send<List<ClienteReportModel>>(UriMethod.Get);
            return await Task.Run(() => response);
        }

        public async Task<ResponseBase<List<ReportProductModel>>> GetReportProduct()
        {
            var response = new ResponseBase<List<ReportProductModel>>();
            response = await httpService.Send<List<ReportProductModel>>(UriMethod.Get);
            return await Task.Run(() => response);
        }
    }
}
