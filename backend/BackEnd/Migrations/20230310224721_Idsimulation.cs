using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd.Migrations
{
    /// <inheritdoc />
    public partial class Idsimulation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "IdSimolations",
                columns: table => new
                {
                    personalNo = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IdSimolations", x => x.personalNo);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "IdSimolations");
        }
    }
}
