﻿namespace TouresB2C.Models
{
	public class CustomerModel
    {
		public long CustId { get; set; }
		public string FName { get; set; }
		public string LName { get; set; }
		public string PhoneNumber { get; set; }
		public string Email { get; set; }
		public string Password { get; set; }
		public string CreditCardType { get; set; }
		public string CreditCardNumber { get; set; }
		public string Status { get; set; }
		public string DocNumber { get; set; }
		public string UserName { get; set; }
		public string Address { get; set; }
        public string TipoCliente { get; set; }
	}
}
