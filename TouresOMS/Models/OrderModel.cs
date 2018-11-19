using System;
using System.Collections.Generic;

namespace TouresOMS.Models
{
    public class ItemOrderModel
    {
        public long ItemId { get; set; }
        public long OrdId { get; set; }
        public long ProdId { get; set; }
        public string ProductName { get; set; }
        public string PartNum { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }

    public class OrderModel
    {
        public long OrdId { get; set; }
        public long CustId { get; set; }
        public DateTime OrdenDate { get; set; }
        public decimal Price { get; set; }
        public string Status { get; set; }
        public string Comments { get; set; }
        public List<ItemOrderModel> LItems { get; set; }
    }

    public class OrderReportModel
    {
        public long ordid { get; set; }
        public string fname { get; set; }
        public DateTime ordendate { get; set; }
        public double price { get; set; }
        public string comments { get; set; }
        public string nombre_estado { get; set; }
    }

    public class ClienteReportModel
    {
        public string fname { get; set; }
        public double total { get; set; }
        public int custid { get; set; }
    }

    public class ReportProductModel
    {
        public string productname { get; set; }
        public int Cantidad { get; set; }
        public int proid { get; set; }
        public double valor { get; set; }
    }

    public class ReportOrderMonth
    {
        public string month { get; set; }
        public int cantidad { get; set; }
        public double valor { get; set; }
    }
}
