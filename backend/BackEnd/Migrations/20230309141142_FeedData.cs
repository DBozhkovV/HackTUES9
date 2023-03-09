using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd.Migrations
{
    /// <inheritdoc />
    public partial class FeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Feed",
                columns: table => new
                {
                    FeedId = table.Column<Guid>(type: "uuid", nullable: false),
                    Key = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    UserId1 = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feed", x => x.FeedId);
                    table.ForeignKey(
                        name: "FK_Feed_Users_UserId1",
                        column: x => x.UserId1,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Coments",
                columns: table => new
                {
                    ComentsId = table.Column<Guid>(type: "uuid", nullable: false),
                    Coment = table.Column<string>(type: "text", nullable: false),
                    FeedId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    UserId1 = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coments", x => x.ComentsId);
                    table.ForeignKey(
                        name: "FK_Coments_Feed_FeedId",
                        column: x => x.FeedId,
                        principalTable: "Feed",
                        principalColumn: "FeedId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Coments_Users_UserId1",
                        column: x => x.UserId1,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Likes",
                columns: table => new
                {
                    LikeId = table.Column<Guid>(type: "uuid", nullable: false),
                    Id = table.Column<int>(type: "integer", nullable: false),
                    FeedId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    UserId1 = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Likes", x => x.LikeId);
                    table.ForeignKey(
                        name: "FK_Likes_Feed_FeedId",
                        column: x => x.FeedId,
                        principalTable: "Feed",
                        principalColumn: "FeedId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Likes_Users_UserId1",
                        column: x => x.UserId1,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Coments_FeedId",
                table: "Coments",
                column: "FeedId");

            migrationBuilder.CreateIndex(
                name: "IX_Coments_UserId1",
                table: "Coments",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_Feed_UserId1",
                table: "Feed",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_Likes_FeedId",
                table: "Likes",
                column: "FeedId");

            migrationBuilder.CreateIndex(
                name: "IX_Likes_UserId1",
                table: "Likes",
                column: "UserId1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Coments");

            migrationBuilder.DropTable(
                name: "Likes");

            migrationBuilder.DropTable(
                name: "Feed");
        }
    }
}
