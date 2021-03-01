using Microsoft.EntityFrameworkCore.Migrations;

namespace Back.Migrations
{
    public partial class TodosDatos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Asunto",
                table: "HistorialCorreo",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Mensaje",
                table: "HistorialCorreo",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "NombreEvi",
                table: "HistorialCorreo",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Asunto",
                table: "HistorialCorreo");

            migrationBuilder.DropColumn(
                name: "Mensaje",
                table: "HistorialCorreo");

            migrationBuilder.DropColumn(
                name: "NombreEvi",
                table: "HistorialCorreo");
        }
    }
}
