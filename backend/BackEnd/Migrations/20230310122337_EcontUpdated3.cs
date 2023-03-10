using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd.Migrations
{
    /// <inheritdoc />
    public partial class EcontUpdated3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "shipmentId",
                table: "Econt",
                type: "text",
                nullable: false,
                oldClrType: typeof(byte),
                oldType: "smallint");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte>(
                name: "shipmentId",
                table: "Econt",
                type: "smallint",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");
        }
    }
}
