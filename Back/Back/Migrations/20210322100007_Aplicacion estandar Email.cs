using Microsoft.EntityFrameworkCore.Migrations;

namespace Back.Migrations
{
    public partial class AplicacionestandarEmail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Correo",
                table: "RestablecimientoContrasena",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "Correo",
                table: "HistorialCorreo",
                newName: "Email");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Email",
                table: "RestablecimientoContrasena",
                newName: "Correo");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "HistorialCorreo",
                newName: "Correo");
        }
    }
}
