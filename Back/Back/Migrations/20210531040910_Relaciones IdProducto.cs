using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Back.Migrations
{
    public partial class RelacionesIdProducto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PrecioMontajes");

            migrationBuilder.DropColumn(
                name: "IdUsuario",
                table: "Categorias");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "Descuentos",
                type: "nvarchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Salidas_IdProducto",
                table: "Salidas",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_PrecioProductos_IdProducto",
                table: "PrecioProductos",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_Imagenes_IdProducto",
                table: "Imagenes",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_Entradas_IdProducto",
                table: "Entradas",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleVentaProductos_IdProducto",
                table: "DetalleVentaProductos",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_DetallesProductosMontajes_IdProducto",
                table: "DetallesProductosMontajes",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleProductosSolicitud_IdProducto",
                table: "DetalleProductosSolicitud",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleMateriales_IdMaterial",
                table: "DetalleMateriales",
                column: "IdMaterial");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleMateriales_IdProducto",
                table: "DetalleMateriales",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleCarritoDeCompras_IdProducto",
                table: "DetalleCarritoDeCompras",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_Descuentos_IdValorRuleta",
                table: "Descuentos",
                column: "IdValorRuleta");

            migrationBuilder.AddForeignKey(
                name: "FK_Descuentos_ValorRuleta_IdValorRuleta",
                table: "Descuentos",
                column: "IdValorRuleta",
                principalTable: "ValorRuleta",
                principalColumn: "IdValorRuleta",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleCarritoDeCompras_Productos_IdProducto",
                table: "DetalleCarritoDeCompras",
                column: "IdProducto",
                principalTable: "Productos",
                principalColumn: "IdProducto",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleMateriales_Materiales_IdMaterial",
                table: "DetalleMateriales",
                column: "IdMaterial",
                principalTable: "Materiales",
                principalColumn: "IdMaterial",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleMateriales_Productos_IdProducto",
                table: "DetalleMateriales",
                column: "IdProducto",
                principalTable: "Productos",
                principalColumn: "IdProducto",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleProductosSolicitud_Productos_IdProducto",
                table: "DetalleProductosSolicitud",
                column: "IdProducto",
                principalTable: "Productos",
                principalColumn: "IdProducto",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DetallesProductosMontajes_Productos_IdProducto",
                table: "DetallesProductosMontajes",
                column: "IdProducto",
                principalTable: "Productos",
                principalColumn: "IdProducto",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleVentaProductos_Productos_IdProducto",
                table: "DetalleVentaProductos",
                column: "IdProducto",
                principalTable: "Productos",
                principalColumn: "IdProducto",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Entradas_Productos_IdProducto",
                table: "Entradas",
                column: "IdProducto",
                principalTable: "Productos",
                principalColumn: "IdProducto",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Imagenes_Productos_IdProducto",
                table: "Imagenes",
                column: "IdProducto",
                principalTable: "Productos",
                principalColumn: "IdProducto",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PrecioProductos_Productos_IdProducto",
                table: "PrecioProductos",
                column: "IdProducto",
                principalTable: "Productos",
                principalColumn: "IdProducto",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Salidas_Productos_IdProducto",
                table: "Salidas",
                column: "IdProducto",
                principalTable: "Productos",
                principalColumn: "IdProducto",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Descuentos_ValorRuleta_IdValorRuleta",
                table: "Descuentos");

            migrationBuilder.DropForeignKey(
                name: "FK_DetalleCarritoDeCompras_Productos_IdProducto",
                table: "DetalleCarritoDeCompras");

            migrationBuilder.DropForeignKey(
                name: "FK_DetalleMateriales_Materiales_IdMaterial",
                table: "DetalleMateriales");

            migrationBuilder.DropForeignKey(
                name: "FK_DetalleMateriales_Productos_IdProducto",
                table: "DetalleMateriales");

            migrationBuilder.DropForeignKey(
                name: "FK_DetalleProductosSolicitud_Productos_IdProducto",
                table: "DetalleProductosSolicitud");

            migrationBuilder.DropForeignKey(
                name: "FK_DetallesProductosMontajes_Productos_IdProducto",
                table: "DetallesProductosMontajes");

            migrationBuilder.DropForeignKey(
                name: "FK_DetalleVentaProductos_Productos_IdProducto",
                table: "DetalleVentaProductos");

            migrationBuilder.DropForeignKey(
                name: "FK_Entradas_Productos_IdProducto",
                table: "Entradas");

            migrationBuilder.DropForeignKey(
                name: "FK_Imagenes_Productos_IdProducto",
                table: "Imagenes");

            migrationBuilder.DropForeignKey(
                name: "FK_PrecioProductos_Productos_IdProducto",
                table: "PrecioProductos");

            migrationBuilder.DropForeignKey(
                name: "FK_Salidas_Productos_IdProducto",
                table: "Salidas");

            migrationBuilder.DropIndex(
                name: "IX_Salidas_IdProducto",
                table: "Salidas");

            migrationBuilder.DropIndex(
                name: "IX_PrecioProductos_IdProducto",
                table: "PrecioProductos");

            migrationBuilder.DropIndex(
                name: "IX_Imagenes_IdProducto",
                table: "Imagenes");

            migrationBuilder.DropIndex(
                name: "IX_Entradas_IdProducto",
                table: "Entradas");

            migrationBuilder.DropIndex(
                name: "IX_DetalleVentaProductos_IdProducto",
                table: "DetalleVentaProductos");

            migrationBuilder.DropIndex(
                name: "IX_DetallesProductosMontajes_IdProducto",
                table: "DetallesProductosMontajes");

            migrationBuilder.DropIndex(
                name: "IX_DetalleProductosSolicitud_IdProducto",
                table: "DetalleProductosSolicitud");

            migrationBuilder.DropIndex(
                name: "IX_DetalleMateriales_IdMaterial",
                table: "DetalleMateriales");

            migrationBuilder.DropIndex(
                name: "IX_DetalleMateriales_IdProducto",
                table: "DetalleMateriales");

            migrationBuilder.DropIndex(
                name: "IX_DetalleCarritoDeCompras_IdProducto",
                table: "DetalleCarritoDeCompras");

            migrationBuilder.DropIndex(
                name: "IX_Descuentos_IdValorRuleta",
                table: "Descuentos");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "Descuentos",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)");

            migrationBuilder.AddColumn<string>(
                name: "IdUsuario",
                table: "Categorias",
                type: "varchar(50)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "PrecioMontajes",
                columns: table => new
                {
                    IdPrecioMontajes = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FechaFin = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FechaInicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdMontaje = table.Column<int>(type: "int", nullable: false),
                    IdUsuario = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Precio = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrecioMontajes", x => x.IdPrecioMontajes);
                });
        }
    }
}
