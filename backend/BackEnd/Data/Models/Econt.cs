using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackEnd.Data.Models
{
    public class Econt
    {
        [Key]
        public string shipmentId { get; set; }
        public string userName { get; set; }
        public string phoneNumber { get; set; }
        public string countryCode { get; set; }
        public string cityName { get; set; }
        public string postCode { get; set; }
        public string street { get; set; }
        public string streetNumber { get; set; }
        public int weight { get; set; }
        public string shipmentDescription { get; set; }

    }
}
