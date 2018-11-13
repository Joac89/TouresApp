using System;

namespace TouresOMS.Models
{
	public class ProductSModel
    {
        public long id { get; set; }        
		public string nombre { get; set; }        
		public string espectaculo { get; set; }
        public string fechaSalida { get; set; }        
        public string cuidadEspectaculo { get; set; }
        public string fechaLlegada { get; set; }
        public string fechaEspectaculo { get; set; }
        public decimal tipoEspectaculo { get; set; }
        public decimal tipoHospedaje { get; set; }
        public decimal tipoTransporte { get; set; }
        public string rutaImagen { get; set; }
        public int route { get; set; }				
	}
	public class ProductImgModel : ProductSModel
    {
		public string image { get; set; }		
	}
}
