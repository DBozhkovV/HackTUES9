﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd.Migrations
{
    /// <inheritdoc />
    public partial class EcontUpdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "requestCourierTimeFrom",
                table: "Econt");

            migrationBuilder.DropColumn(
                name: "requestCourierTimeTo",
                table: "Econt");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "requestCourierTimeFrom",
                table: "Econt",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "requestCourierTimeTo",
                table: "Econt",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
