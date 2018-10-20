using System;

namespace TouresOMS.Models
{
	public class CampaignModelMatchService
	{
		public string FechaFin { get; set; }
		public string FechaInicial { get; set; }
		public long IdCampana { get; set; }
		public long IdProducto { get; set; }
		public string Nombre { get; set; }
		public string RutaImagen { get; set; }
	}

	public class CampaignModel: CampaignModelMatchService
    {
		public long Id { get; set; }
		public string Name { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime EndDate { get; set; }
		public string Image { get; set; }
    }
}
