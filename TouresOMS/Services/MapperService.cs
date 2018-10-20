using System;
using System.Linq;
using TouresOMS.Models;

namespace TouresOMS.Services
{
	public static class MapperService
    {
		public static ProductModel Mapper(this ProductModel data, bool fromCampaign = false)
		{
			data.Price = data.ValorProducto;
			data.Image = data.RutaImagen;
			data.Date = DateTime.Parse(data.FechaEspectaculo);
			data.Title = data.Nombre;
			data.Description = data.Espectaculo;
			data.Rating = 0;
			data.Count = 0;
			if(fromCampaign) data.Id = data.IdProducto;

			return data;
		}

		public static CampaignModel Mapper(this CampaignModel data)
		{
			data.Name = data.Nombre;
			data.StartDate = DateTime.Parse(data.FechaInicial);
			data.EndDate = DateTime.Parse(data.FechaFin);
			data.Id = data.IdCampana;
			data.Image = data.RutaImagen;

			return data;
		}
	}
}
