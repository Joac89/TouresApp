using ReportOMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ReportOMS.Controllers
{
    public class ReporteController : Controller
    {
        // GET: Reporte
        public ActionResult ReporteIndex()
        {           
            return View();
        }

        public ActionResult ReporteData(ReporteModel data)
        {
            var result = new List<OMS_PRODUCTO>();
            using (var context = new OMSEntitiesSQL())
            {
                result = context.OMS_PRODUCTO.Where(
                    x => x.FECHA_SALIDA >= data.FechaSalida &&
                    x.FECHA_LLEGADA <= data.FechaLlegada
                    ).ToList();
            }

            return View("ReporteData", result);
        }
    }
}