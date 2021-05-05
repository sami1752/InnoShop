using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Back.Migrations
{
    public partial class ventas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DetalleVentaMontajes",
                columns: table => new
                {
                    IdDetalleVentaMontaje = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Cantidad = table.Column<int>(type: "int", nullable: false),
                    SubTotal = table.Column<float>(type: "real", nullable: false),
                    IdVenta = table.Column<int>(type: "int", nullable: false),
                    IdMontaje = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetalleVentaMontajes", x => x.IdDetalleVentaMontaje);
                });

            migrationBuilder.CreateTable(
                name: "DetalleVentaProductos",
                columns: table => new
                {
                    IdDetalleVentaProducto = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Cantidad = table.Column<int>(type: "int", nullable: false),
                    SubTotal = table.Column<float>(type: "real", nullable: false),
                    IdVenta = table.Column<int>(type: "int", nullable: false),
                    IdProducto = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetalleVentaProductos", x => x.IdDetalleVentaProducto);
                });

            migrationBuilder.CreateTable(
                name: "DetalleVentaSolicitudes",
                columns: table => new
                {
                    IdDetalleVentaSolicitud = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Cantidad = table.Column<int>(type: "int", nullable: false),
                    SubTotal = table.Column<float>(type: "real", nullable: false),
                    IdVenta = table.Column<int>(type: "int", nullable: false),
                    IdSolicitudPersonalizada = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetalleVentaSolicitudes", x => x.IdDetalleVentaSolicitud);
                });

            migrationBuilder.CreateTable(
                name: "Ventas",
                columns: table => new
                {
                    IdVenta = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdUsuario = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdDescuento = table.Column<int>(type: "int", nullable: false),
                    Total = table.Column<float>(type: "real", nullable: false),
                    IdIva = table.Column<int>(type: "int", nullable: false),
                    TotalIva = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ventas", x => x.IdVenta);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DetalleVentaMontajes");

            migrationBuilder.DropTable(
                name: "DetalleVentaProductos");

            migrationBuilder.DropTable(
                name: "DetalleVentaSolicitudes");

            migrationBuilder.DropTable(
                name: "Ventas");
        }
    }
}
