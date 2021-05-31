using Microsoft.EntityFrameworkCore.Migrations;

namespace Back.Migrations
{
    public partial class RelacionesUsuario : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.AddForeignKey(
name: "FK_Descuentos_AspNetUsers_IdUsuario",
table: "Descuentos",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);


            migrationBuilder.AddForeignKey(
  name: "FK_PorcentajesRuleta_AspNetUsers_IdUsuario",
  table: "PorcentajesRuleta",
  column: "IdUsuario",
  principalTable: "AspNetUsers",
  principalColumn: "Id",
  onDelete: ReferentialAction.Restrict);


            migrationBuilder.AddForeignKey(
name: "FK_ValorRuleta_AspNetUsers_IdUsuario",
table: "ValorRuleta",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);


            migrationBuilder.AddForeignKey(
name: "FK_DetalleMateriales_AspNetUsers_IdUsuario",
table: "DetalleMateriales",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
name: "FK_Entradas_AspNetUsers_IdUsuario",
table: "Entradas",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
name: "FK_Imagenes  _AspNetUsers_IdUsuario",
table: "Imagenes",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);


            migrationBuilder.AddForeignKey(
name: "FK_Iva_AspNetUsers_IdUsuario",
table: "Iva",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
name: "FK_Materiales_AspNetUsers_IdUsuario",
table: "Materiales",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);


            migrationBuilder.AddForeignKey(
name: "FK_PrecioProductos_AspNetUsers_IdUsuario",
table: "PrecioProductos",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
name: "FK_Productos_AspNetUsers_IdUsuario",
table: "Productos",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
name: "FK_Salidas_AspNetUsers_IdUsuario",
table: "Salidas",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
name: "FK_DetalleEstadosMontajes_AspNetUsers_IdUsuario",
table: "DetalleEstadosMontajes",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);


            migrationBuilder.AddForeignKey(
name: "FK_DetalleEstadosSolicitudPersonalizada_AspNetUsers_IdUsuario",
table: "DetalleEstadosSolicitudPersonalizada",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);


            migrationBuilder.AddForeignKey(
name: "FK_DetalleProductosSolicitud_AspNetUsers_IdUsuario",
table: "DetalleProductosSolicitud",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);


            migrationBuilder.AddForeignKey(
name: "FK_DetallesProductosMontajes_AspNetUsers_IdUsuario",
table: "DetallesProductosMontajes",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);



            migrationBuilder.AddForeignKey(
name: "FK_Montajes_AspNetUsers_IdUsuario",
table: "Montajes",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
name: "FK_RespuestasMontajes_AspNetUsers_IdUsuario",
table: "RespuestasMontajes",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);


            migrationBuilder.AddForeignKey(
name: "FK_RespuestasSolicitudesPersonalizadas_AspNetUsers_IdUsuario",
table: "RespuestasSolicitudesPersonalizadas",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);


            migrationBuilder.AddForeignKey(
name: "FK_SolicitudPersonalizada_AspNetUsers_IdUsuario",
table: "SolicitudPersonalizada",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);


            migrationBuilder.AddForeignKey(
name: "FK_CarritoDeCompras_AspNetUsers_IdUsuario",
table: "CarritoDeCompras",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);


            migrationBuilder.AddForeignKey(
name: "FK_DetalleCarritoDeCompras_AspNetUsers_IdUsuario",
table: "DetalleCarritoDeCompras",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);


            migrationBuilder.AddForeignKey(
name: "FK_Ventas_AspNetUsers_IdUsuario",
table: "Ventas",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);



        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.AddForeignKey(
name: "FK_Descuentos_AspNetUsers_IdUsuario",
table: "Descuentos",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);


            migrationBuilder.AddForeignKey(
  name: "FK_PorcentajesRuleta_AspNetUsers_IdUsuario",
  table: "PorcentajesRuleta",
  column: "IdUsuario",
  principalTable: "AspNetUsers",
  principalColumn: "Id",
  onDelete: ReferentialAction.Restrict);


            migrationBuilder.AddForeignKey(
name: "FK_ValorRuleta_AspNetUsers_IdUsuario",
table: "ValorRuleta",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);


            migrationBuilder.AddForeignKey(
name: "FK_DetalleMateriales_AspNetUsers_IdUsuario",
table: "DetalleMateriales",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
name: "FK_Entradas_AspNetUsers_IdUsuario",
table: "Entradas",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
name: "FK_Imagenes  _AspNetUsers_IdUsuario",
table: "Imagenes",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);


            migrationBuilder.AddForeignKey(
name: "FK_Iva_AspNetUsers_IdUsuario",
table: "Iva",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
name: "FK_Materiales_AspNetUsers_IdUsuario",
table: "Materiales",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);


            migrationBuilder.AddForeignKey(
name: "FK_PrecioProductos_AspNetUsers_IdUsuario",
table: "PrecioProductos",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
name: "FK_Productos_AspNetUsers_IdUsuario",
table: "Productos",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
name: "FK_Salidas_AspNetUsers_IdUsuario",
table: "Salidas",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
name: "FK_DetalleEstadosMontajes_AspNetUsers_IdUsuario",
table: "DetalleEstadosMontajes",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);


            migrationBuilder.AddForeignKey(
name: "FK_DetalleEstadosSolicitudPersonalizada_AspNetUsers_IdUsuario",
table: "DetalleEstadosSolicitudPersonalizada",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);


            migrationBuilder.AddForeignKey(
name: "FK_DetalleProductosSolicitud_AspNetUsers_IdUsuario",
table: "DetalleProductosSolicitud",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);


            migrationBuilder.AddForeignKey(
name: "FK_DetallesProductosMontajes_AspNetUsers_IdUsuario",
table: "DetallesProductosMontajes",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);



            migrationBuilder.AddForeignKey(
name: "FK_Montajes_AspNetUsers_IdUsuario",
table: "Montajes",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
name: "FK_RespuestasMontajes_AspNetUsers_IdUsuario",
table: "RespuestasMontajes",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);


            migrationBuilder.AddForeignKey(
name: "FK_RespuestasSolicitudesPersonalizadas_AspNetUsers_IdUsuario",
table: "RespuestasSolicitudesPersonalizadas",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);


            migrationBuilder.AddForeignKey(
name: "FK_SolicitudPersonalizada_AspNetUsers_IdUsuario",
table: "SolicitudPersonalizada",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);


            migrationBuilder.AddForeignKey(
name: "FK_CarritoDeCompras_AspNetUsers_IdUsuario",
table: "CarritoDeCompras",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);


            migrationBuilder.AddForeignKey(
name: "FK_DetalleCarritoDeCompras_AspNetUsers_IdUsuario",
table: "DetalleCarritoDeCompras",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);


            migrationBuilder.AddForeignKey(
name: "FK_Ventas_AspNetUsers_IdUsuario",
table: "Ventas",
column: "IdUsuario",
principalTable: "AspNetUsers",
principalColumn: "Id",
onDelete: ReferentialAction.Restrict);



        }
    }
}
