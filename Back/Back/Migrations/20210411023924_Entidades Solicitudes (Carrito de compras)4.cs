using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Back.Migrations
{
    public partial class EntidadesSolicitudesCarritodecompras4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CarritoDeCompras",
                columns: table => new
                {
                    IdCarritoDeCompras = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Estado = table.Column<bool>(type: "bit", nullable: false),
                    Valor = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarritoDeCompras", x => x.IdCarritoDeCompras);
                });

            migrationBuilder.CreateTable(
                name: "DetalleCarritoDeCompras",
                columns: table => new
                {
                    IdDetalleCarritoDeCompras = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdProducto = table.Column<int>(type: "int", nullable: false),
                    IdCarritoDeCompras = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetalleCarritoDeCompras", x => x.IdDetalleCarritoDeCompras);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CarritoDeCompras");

            migrationBuilder.DropTable(
                name: "DetalleCarritoDeCompras");
        }
    }
}
