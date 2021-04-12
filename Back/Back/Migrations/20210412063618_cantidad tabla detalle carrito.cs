using Microsoft.EntityFrameworkCore.Migrations;

namespace Back.Migrations
{
    public partial class cantidadtabladetallecarrito : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Cantidad",
                table: "DetalleCarritoDeCompras",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cantidad",
                table: "DetalleCarritoDeCompras");
        }
    }
}
