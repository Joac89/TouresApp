﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class OMSEntitiesSQL : DbContext
    {
        public OMSEntitiesSQL()
            : base("name=OMSEntitiesSQL")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<OMS_CAMPANA_PRODUCTO> OMS_CAMPANA_PRODUCTO { get; set; }
        public DbSet<OMS_CAMPANAS> OMS_CAMPANAS { get; set; }
        public DbSet<OMS_CIUDAD> OMS_CIUDAD { get; set; }
        public DbSet<OMS_LOAD_CIUDAD> OMS_LOAD_CIUDAD { get; set; }
        public DbSet<OMS_LOAD_PRODUCTO> OMS_LOAD_PRODUCTO { get; set; }
        public DbSet<OMS_LOAD_TARIFA_CIUDAD> OMS_LOAD_TARIFA_CIUDAD { get; set; }
        public DbSet<OMS_LOAD_TARIFA_ESPECTACULO> OMS_LOAD_TARIFA_ESPECTACULO { get; set; }
        public DbSet<OMS_LOAD_TARIFA_HOSPEDAJE> OMS_LOAD_TARIFA_HOSPEDAJE { get; set; }
        public DbSet<OMS_LOAD_TARIFA_TRANSPORTE> OMS_LOAD_TARIFA_TRANSPORTE { get; set; }
        public DbSet<OMS_MENU> OMS_MENU { get; set; }
        public DbSet<OMS_PRODUCTO> OMS_PRODUCTO { get; set; }
        public DbSet<OMS_ROL> OMS_ROL { get; set; }
        public DbSet<OMS_TARIFA_CIUDAD> OMS_TARIFA_CIUDAD { get; set; }
        public DbSet<OMS_TARIFA_ESPECTACULO> OMS_TARIFA_ESPECTACULO { get; set; }
        public DbSet<OMS_TARIFA_HOSPEDAJE> OMS_TARIFA_HOSPEDAJE { get; set; }
        public DbSet<OMS_TARIFA_TRANSPORTE> OMS_TARIFA_TRANSPORTE { get; set; }
    }
}