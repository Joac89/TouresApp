//------------------------------------------------------------------------------
// <auto-generated>
//    Este código se generó a partir de una plantilla.
//
//    Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//    Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ReportOMS
{
    using System;
    using System.Collections.Generic;
    
    public partial class OMS_LOAD_TARIFA_TRANSPORTE
    {
        public OMS_LOAD_TARIFA_TRANSPORTE()
        {
            this.OMS_LOAD_PRODUCTO = new HashSet<OMS_LOAD_PRODUCTO>();
        }
    
        public int ID { get; set; }
        public string NOMBRE_TARIFA_TRANS { get; set; }
        public Nullable<decimal> PRECIO_TRANSPORTE { get; set; }
    
        public virtual ICollection<OMS_LOAD_PRODUCTO> OMS_LOAD_PRODUCTO { get; set; }
    }
}
