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

	/*public class OrderModel: OrderModelMatchService
    {
		public long Code { get; set; }
		public int Count { get; set; }
		public int State { get; set; }
		public string StateName { get; set; }
		public List<ItemOrderModel> Items { get; set; }
    }*/
}
