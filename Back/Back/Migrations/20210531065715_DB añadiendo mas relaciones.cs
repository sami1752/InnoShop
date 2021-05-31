using Microsoft.EntityFrameworkCore.Migrations;

namespace Back.Migrations
{
    public partial class DBañadiendomasrelaciones : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "Ventas",
                type: "varchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "ValorRuleta",
                type: "varchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "SolicitudPersonalizada",
                type: "varchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Descripcion",
                table: "SolicitudPersonalizada",
                type: "varchar(500)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Respuesta",
                table: "RespuestasSolicitudesPersonalizadas",
                type: "varchar(500)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "RespuestasSolicitudesPersonalizadas",
                type: "varchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Respuesta",
                table: "RespuestasMontajes",
                type: "varchar(500)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "RespuestasMontajes",
                type: "varchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "TipoPuerta",
                table: "Productos",
                type: "varchar(30)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "varchar(20)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Descripcion",
                table: "Productos",
                type: "varchar(500)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "varchar(250)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "PorcentajesRuleta",
                type: "varchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "Montajes",
                type: "varchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Direccion",
                table: "Montajes",
                type: "varchar(250)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Descripcion",
                table: "Montajes",
                type: "varchar(500)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "Materiales",
                type: "varchar(50)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Descripcion",
                table: "Materiales",
                type: "varchar(500)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "Iva",
                type: "varchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "Estados",
                type: "varchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Estado",
                table: "Estados",
                type: "varchar(60)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "DetallesProductosMontajes",
                type: "varchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "DetalleProductosSolicitud",
                type: "varchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "DetalleEstadosSolicitudPersonalizada",
                type: "varchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "DetalleEstadosMontajes",
                type: "varchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "DetalleCarritoDeCompras",
                type: "varchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "Descuentos",
                type: "varchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "CarritoDeCompras",
                type: "varchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Ventas_IdDescuento",
                table: "Ventas",
                column: "IdDescuento");

            migrationBuilder.CreateIndex(
                name: "IX_Ventas_IdIva",
                table: "Ventas",
                column: "IdIva");

            migrationBuilder.CreateIndex(
                name: "IX_RespuestasSolicitudesPersonalizadas_IdSolicitudPersonalizada",
                table: "RespuestasSolicitudesPersonalizadas",
                column: "IdSolicitudPersonalizada");

            migrationBuilder.CreateIndex(
                name: "IX_RespuestasMontajes_IdMontaje",
                table: "RespuestasMontajes",
                column: "IdMontaje");

            migrationBuilder.CreateIndex(
                name: "IX_Productos_IdCategoria",
                table: "Productos",
                column: "IdCategoria");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleVentaSolicitudes_IdSolicitudPersonalizada",
                table: "DetalleVentaSolicitudes",
                column: "IdSolicitudPersonalizada");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleVentaSolicitudes_IdVenta",
                table: "DetalleVentaSolicitudes",
                column: "IdVenta");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleVentaProductos_IdVenta",
                table: "DetalleVentaProductos",
                column: "IdVenta");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleVentaMontajes_IdMontaje",
                table: "DetalleVentaMontajes",
                column: "IdMontaje");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleVentaMontajes_IdVenta",
                table: "DetalleVentaMontajes",
                column: "IdVenta");

            migrationBuilder.CreateIndex(
                name: "IX_DetallesProductosMontajes_IdMontaje",
                table: "DetallesProductosMontajes",
                column: "IdMontaje");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleProductosSolicitud_IdSolicitudPersonalizada",
                table: "DetalleProductosSolicitud",
                column: "IdSolicitudPersonalizada");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleEstadosSolicitudPersonalizada_IdEstado",
                table: "DetalleEstadosSolicitudPersonalizada",
                column: "IdEstado");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleEstadosSolicitudPersonalizada_IdSolicitudPersonalizada",
                table: "DetalleEstadosSolicitudPersonalizada",
                column: "IdSolicitudPersonalizada");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleEstadosMontajes_IdEstado",
                table: "DetalleEstadosMontajes",
                column: "IdEstado");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleEstadosMontajes_IdMontaje",
                table: "DetalleEstadosMontajes",
                column: "IdMontaje");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleCarritoDeCompras_IdCarritoDeCompras",
                table: "DetalleCarritoDeCompras",
                column: "IdCarritoDeCompras");

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleCarritoDeCompras_CarritoDeCompras_IdCarritoDeCompras",
                table: "DetalleCarritoDeCompras",
                column: "IdCarritoDeCompras",
                principalTable: "CarritoDeCompras",
                principalColumn: "IdCarritoDeCompras",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleEstadosMontajes_Estados_IdEstado",
                table: "DetalleEstadosMontajes",
                column: "IdEstado",
                principalTable: "Estados",
                principalColumn: "IdEstado",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleEstadosMontajes_Montajes_IdMontaje",
                table: "DetalleEstadosMontajes",
                column: "IdMontaje",
                principalTable: "Montajes",
                principalColumn: "IdMontaje",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleEstadosSolicitudPersonalizada_Estados_IdEstado",
                table: "DetalleEstadosSolicitudPersonalizada",
                column: "IdEstado",
                principalTable: "Estados",
                principalColumn: "IdEstado",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleEstadosSolicitudPersonalizada_SolicitudPersonalizada_IdSolicitudPersonalizada",
                table: "DetalleEstadosSolicitudPersonalizada",
                column: "IdSolicitudPersonalizada",
                principalTable: "SolicitudPersonalizada",
                principalColumn: "IdSolicitudPersonalizada",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleProductosSolicitud_SolicitudPersonalizada_IdSolicitudPersonalizada",
                table: "DetalleProductosSolicitud",
                column: "IdSolicitudPersonalizada",
                principalTable: "SolicitudPersonalizada",
                principalColumn: "IdSolicitudPersonalizada",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DetallesProductosMontajes_Montajes_IdMontaje",
                table: "DetallesProductosMontajes",
                column: "IdMontaje",
                principalTable: "Montajes",
                principalColumn: "IdMontaje",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleVentaMontajes_Montajes_IdMontaje",
                table: "DetalleVentaMontajes",
                column: "IdMontaje",
                principalTable: "Montajes",
                principalColumn: "IdMontaje",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleVentaMontajes_Ventas_IdVenta",
                table: "DetalleVentaMontajes",
                column: "IdVenta",
                principalTable: "Ventas",
                principalColumn: "IdVenta",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleVentaProductos_Ventas_IdVenta",
                table: "DetalleVentaProductos",
                column: "IdVenta",
                principalTable: "Ventas",
                principalColumn: "IdVenta",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleVentaSolicitudes_SolicitudPersonalizada_IdSolicitudPersonalizada",
                table: "DetalleVentaSolicitudes",
                column: "IdSolicitudPersonalizada",
                principalTable: "SolicitudPersonalizada",
                principalColumn: "IdSolicitudPersonalizada",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleVentaSolicitudes_Ventas_IdVenta",
                table: "DetalleVentaSolicitudes",
                column: "IdVenta",
                principalTable: "Ventas",
                principalColumn: "IdVenta",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Productos_Categorias_IdCategoria",
                table: "Productos",
                column: "IdCategoria",
                principalTable: "Categorias",
                principalColumn: "IdCategoria",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RespuestasMontajes_Montajes_IdMontaje",
                table: "RespuestasMontajes",
                column: "IdMontaje",
                principalTable: "Montajes",
                principalColumn: "IdMontaje",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RespuestasSolicitudesPersonalizadas_SolicitudPersonalizada_IdSolicitudPersonalizada",
                table: "RespuestasSolicitudesPersonalizadas",
                column: "IdSolicitudPersonalizada",
                principalTable: "SolicitudPersonalizada",
                principalColumn: "IdSolicitudPersonalizada",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Ventas_Descuentos_IdDescuento",
                table: "Ventas",
                column: "IdDescuento",
                principalTable: "Descuentos",
                principalColumn: "IdDescuento",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Ventas_Iva_IdIva",
                table: "Ventas",
                column: "IdIva",
                principalTable: "Iva",
                principalColumn: "IdIva",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DetalleCarritoDeCompras_CarritoDeCompras_IdCarritoDeCompras",
                table: "DetalleCarritoDeCompras");

            migrationBuilder.DropForeignKey(
                name: "FK_DetalleEstadosMontajes_Estados_IdEstado",
                table: "DetalleEstadosMontajes");

            migrationBuilder.DropForeignKey(
                name: "FK_DetalleEstadosMontajes_Montajes_IdMontaje",
                table: "DetalleEstadosMontajes");

            migrationBuilder.DropForeignKey(
                name: "FK_DetalleEstadosSolicitudPersonalizada_Estados_IdEstado",
                table: "DetalleEstadosSolicitudPersonalizada");

            migrationBuilder.DropForeignKey(
                name: "FK_DetalleEstadosSolicitudPersonalizada_SolicitudPersonalizada_IdSolicitudPersonalizada",
                table: "DetalleEstadosSolicitudPersonalizada");

            migrationBuilder.DropForeignKey(
                name: "FK_DetalleProductosSolicitud_SolicitudPersonalizada_IdSolicitudPersonalizada",
                table: "DetalleProductosSolicitud");

            migrationBuilder.DropForeignKey(
                name: "FK_DetallesProductosMontajes_Montajes_IdMontaje",
                table: "DetallesProductosMontajes");

            migrationBuilder.DropForeignKey(
                name: "FK_DetalleVentaMontajes_Montajes_IdMontaje",
                table: "DetalleVentaMontajes");

            migrationBuilder.DropForeignKey(
                name: "FK_DetalleVentaMontajes_Ventas_IdVenta",
                table: "DetalleVentaMontajes");

            migrationBuilder.DropForeignKey(
                name: "FK_DetalleVentaProductos_Ventas_IdVenta",
                table: "DetalleVentaProductos");

            migrationBuilder.DropForeignKey(
                name: "FK_DetalleVentaSolicitudes_SolicitudPersonalizada_IdSolicitudPersonalizada",
                table: "DetalleVentaSolicitudes");

            migrationBuilder.DropForeignKey(
                name: "FK_DetalleVentaSolicitudes_Ventas_IdVenta",
                table: "DetalleVentaSolicitudes");

            migrationBuilder.DropForeignKey(
                name: "FK_Productos_Categorias_IdCategoria",
                table: "Productos");

            migrationBuilder.DropForeignKey(
                name: "FK_RespuestasMontajes_Montajes_IdMontaje",
                table: "RespuestasMontajes");

            migrationBuilder.DropForeignKey(
                name: "FK_RespuestasSolicitudesPersonalizadas_SolicitudPersonalizada_IdSolicitudPersonalizada",
                table: "RespuestasSolicitudesPersonalizadas");

            migrationBuilder.DropForeignKey(
                name: "FK_Ventas_Descuentos_IdDescuento",
                table: "Ventas");

            migrationBuilder.DropForeignKey(
                name: "FK_Ventas_Iva_IdIva",
                table: "Ventas");

            migrationBuilder.DropIndex(
                name: "IX_Ventas_IdDescuento",
                table: "Ventas");

            migrationBuilder.DropIndex(
                name: "IX_Ventas_IdIva",
                table: "Ventas");

            migrationBuilder.DropIndex(
                name: "IX_RespuestasSolicitudesPersonalizadas_IdSolicitudPersonalizada",
                table: "RespuestasSolicitudesPersonalizadas");

            migrationBuilder.DropIndex(
                name: "IX_RespuestasMontajes_IdMontaje",
                table: "RespuestasMontajes");

            migrationBuilder.DropIndex(
                name: "IX_Productos_IdCategoria",
                table: "Productos");

            migrationBuilder.DropIndex(
                name: "IX_DetalleVentaSolicitudes_IdSolicitudPersonalizada",
                table: "DetalleVentaSolicitudes");

            migrationBuilder.DropIndex(
                name: "IX_DetalleVentaSolicitudes_IdVenta",
                table: "DetalleVentaSolicitudes");

            migrationBuilder.DropIndex(
                name: "IX_DetalleVentaProductos_IdVenta",
                table: "DetalleVentaProductos");

            migrationBuilder.DropIndex(
                name: "IX_DetalleVentaMontajes_IdMontaje",
                table: "DetalleVentaMontajes");

            migrationBuilder.DropIndex(
                name: "IX_DetalleVentaMontajes_IdVenta",
                table: "DetalleVentaMontajes");

            migrationBuilder.DropIndex(
                name: "IX_DetallesProductosMontajes_IdMontaje",
                table: "DetallesProductosMontajes");

            migrationBuilder.DropIndex(
                name: "IX_DetalleProductosSolicitud_IdSolicitudPersonalizada",
                table: "DetalleProductosSolicitud");

            migrationBuilder.DropIndex(
                name: "IX_DetalleEstadosSolicitudPersonalizada_IdEstado",
                table: "DetalleEstadosSolicitudPersonalizada");

            migrationBuilder.DropIndex(
                name: "IX_DetalleEstadosSolicitudPersonalizada_IdSolicitudPersonalizada",
                table: "DetalleEstadosSolicitudPersonalizada");

            migrationBuilder.DropIndex(
                name: "IX_DetalleEstadosMontajes_IdEstado",
                table: "DetalleEstadosMontajes");

            migrationBuilder.DropIndex(
                name: "IX_DetalleEstadosMontajes_IdMontaje",
                table: "DetalleEstadosMontajes");

            migrationBuilder.DropIndex(
                name: "IX_DetalleCarritoDeCompras_IdCarritoDeCompras",
                table: "DetalleCarritoDeCompras");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "Ventas",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "ValorRuleta",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "SolicitudPersonalizada",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)");

            migrationBuilder.AlterColumn<string>(
                name: "Descripcion",
                table: "SolicitudPersonalizada",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(500)");

            migrationBuilder.AlterColumn<string>(
                name: "Respuesta",
                table: "RespuestasSolicitudesPersonalizadas",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(500)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "RespuestasSolicitudesPersonalizadas",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)");

            migrationBuilder.AlterColumn<string>(
                name: "Respuesta",
                table: "RespuestasMontajes",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(500)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "RespuestasMontajes",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)");

            migrationBuilder.AlterColumn<string>(
                name: "TipoPuerta",
                table: "Productos",
                type: "varchar(20)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(30)");

            migrationBuilder.AlterColumn<string>(
                name: "Descripcion",
                table: "Productos",
                type: "varchar(250)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(500)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "PorcentajesRuleta",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "Montajes",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)");

            migrationBuilder.AlterColumn<string>(
                name: "Direccion",
                table: "Montajes",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(250)");

            migrationBuilder.AlterColumn<string>(
                name: "Descripcion",
                table: "Montajes",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(500)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "Materiales",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(50)");

            migrationBuilder.AlterColumn<string>(
                name: "Descripcion",
                table: "Materiales",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(500)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "Iva",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "Estados",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)");

            migrationBuilder.AlterColumn<string>(
                name: "Estado",
                table: "Estados",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(60)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "DetallesProductosMontajes",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "DetalleProductosSolicitud",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "DetalleEstadosSolicitudPersonalizada",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "DetalleEstadosMontajes",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "DetalleCarritoDeCompras",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "Descuentos",
                type: "nvarchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "CarritoDeCompras",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)");
        }
    }
}
