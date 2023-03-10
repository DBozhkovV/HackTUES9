using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd.Migrations
{
    /// <inheritdoc />
    public partial class Econt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Econt",
                columns: table => new
                {
                    shipmentId = table.Column<Guid>(type: "uuid", nullable: false),
                    userName = table.Column<string>(type: "text", nullable: false),
                    phoneNumber = table.Column<string>(type: "text", nullable: false),
                    countryCode = table.Column<string>(type: "text", nullable: false),
                    cityName = table.Column<string>(type: "text", nullable: false),
                    postCode = table.Column<string>(type: "text", nullable: false),
                    street = table.Column<string>(type: "text", nullable: false),
                    streetNumber = table.Column<string>(type: "text", nullable: false),
                    weight = table.Column<int>(type: "integer", nullable: false),
                    shipmentDescription = table.Column<string>(type: "text", nullable: false),
                    requestCourierTimeFrom = table.Column<int>(type: "integer", nullable: false),
                    requestCourierTimeTo = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Econt", x => x.shipmentId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Econt");
        }
    }
}
