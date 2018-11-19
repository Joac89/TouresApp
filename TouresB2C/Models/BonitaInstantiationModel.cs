using System.Collections.Generic;

namespace TouresB2C.Models
{
    public class BonitaInstantiationModel
    {
        public BonitaOrdenRequest ordenInput { get; set; }
        public List<BonitaProductRequest> productosInput { get; set; }
    }

    public class BonitaOrdenRequest
    {
        public string TipoTarjeta { get; set; }
        public string Monto { get; set; }
        public string NumeroTarjeta { get; set; }
        public string TipoCliente { get; set; }
        public string correo { get; set; }
        public string NombreCliente { get; set; }
        public string IDOrdenOMS { get; set; }
        public string IdUsuario { get; set; }
        public string Estado { get; set; }
    }

    public class BonitaProductRequest
    {
        public string ciudadOrigen { get; set; }
        public string ciudadLlegada { get; set; }
        public string Clase { get; set; }
        public string CodigoPromo { get; set; }
        public string cantidadHabitacion { get; set; }
        public string tipoHabitacion { get; set; }
        public string precioHotel { get; set; }
        public string modalidadTransporte { get; set; }
        public string FechaLlegada { get; set; }
        public string FechaSalida { get; set; }
        public string pais { get; set; }
    }

    public class BonitaOrdenResponse
    {
        public string CaseId { get; set; }
    }

    public class BonitaSession
    {
        public string Cookie { get; set; }
        public string Token { get; set; }
    }
}
