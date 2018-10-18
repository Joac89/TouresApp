using System;

namespace TouresB2C.Models
{
	public class ProductModelMatchService
	{
		public decimal TipoHospedaje { get; set; }
		public string Nombre { get; set; }
		public string Pais { get; set; }
		public string Espectaculo { get; set; }
		public decimal PrecioCiudad { get; set; }
		public string FechaLlegada { get; set; }
		public string RutaImagen { get; set; }
		public string FechaSalida { get; set; }
		public decimal PrecioEsp { get; set; }
		public decimal ValorProducto { get; set; }
		public int Route { get; set; }
		public string CiudadEspectaculo { get; set; }
		public string NombreTarifaTrans { get; set; }
		public decimal PrecioTransporte { get; set; }
		public string FechaEspectaculo { get; set; }
		public decimal TipoTransporte { get; set; }
		public string NombreTarifaEsp { get; set; }
		public decimal TipoEspectaculo { get; set; }
		public decimal PrecioHospedaje { get; set; }
		public string NombreTarifaHosp { get; set; }
		public long IdProducto { get; set; }
		public long IdCampana { get; set; }
	}

	public class ProductModel: ProductModelMatchService
	{
		public long Id { get; set; }
		public decimal Price { get; set; }
		public string Image { get; set; }
		public DateTime Date { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public int Rating { get; set; }
		public int Count { get; set; } = 0;
	}
}
