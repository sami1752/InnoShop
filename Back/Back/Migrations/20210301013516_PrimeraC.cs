using Microsoft.EntityFrameworkCore.Migrations;

namespace Back.Migrations
{
    public partial class PrimeraC : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "correo",
                table: "HistorialCorreo",
                newName: "Correo");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Correo",
                table: "HistorialCorreo",
                newName: "correo");
        }
    }
}
