using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Back.Migrations
{
    public partial class EntidadesSolicitudePersonalizadas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DetalleEstadosMontajes",
                columns: table => new
                {
                    IdDetalleEstadosMontajes = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdEstado = table.Column<int>(type: "int", nullable: false),
                    FechaInicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FechaFin = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdMontaje = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetalleEstadosMontajes", x => x.IdDetalleEstadosMontajes);
                });

            migrationBuilder.CreateTable(
                name: "DetalleEstadosProductosPersoanlizados",
                columns: table => new
                {
                    IdDetalleEstadosProductosPersoanlizados = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdEstado = table.Column<int>(type: "int", nullable: false),
                    FechaInicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FechaFin = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdProducto = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetalleEstadosProductosPersoanlizados", x => x.IdDetalleEstadosProductosPersoanlizados);
                });

            migrationBuilder.CreateTable(
                name: "DetalleEstadosSolicitudPersonalizada",
                columns: table => new
                {
                    IdDetalleEstadoSolicitudPersonalizada = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdEstado = table.Column<int>(type: "int", nullable: false),
                    FechaInicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FechaFin = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdSolicitudPersonalizada = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetalleEstadosSolicitudPersonalizada", x => x.IdDetalleEstadoSolicitudPersonalizada);
                });

            migrationBuilder.CreateTable(
                name: "DetalleProductosSolicitud",
                columns: table => new
                {
                    IdDetalleProductosSolicitud = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdSolicitudPersonalizada = table.Column<int>(type: "int", nullable: false),
                    IdProducto = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetalleProductosSolicitud", x => x.IdDetalleProductosSolicitud);
                });

            migrationBuilder.CreateTable(
                name: "DetallesMaterialesMontajes",
                columns: table => new
                {
                    IdDetallesMaterialesMontajes = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdMontaje = table.Column<int>(type: "int", nullable: false),
                    IdMaterial = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetallesMaterialesMontajes", x => x.IdDetallesMaterialesMontajes);
                });

            migrationBuilder.CreateTable(
                name: "DetallesMaterialesSolicitudesPersonalizadas",
                columns: table => new
                {
                    IdDetallesMaterialesSolicitudesPersonalizadas = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdSolicitudPersonalizada = table.Column<int>(type: "int", nullable: false),
                    IdMaterial = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetallesMaterialesSolicitudesPersonalizadas", x => x.IdDetallesMaterialesSolicitudesPersonalizadas);
                });

            migrationBuilder.CreateTable(
                name: "DetallesProductosMontajes",
                columns: table => new
                {
                    IdDetallesProductosMontajes = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdMontaje = table.Column<int>(type: "int", nullable: false),
                    IdProducto = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetallesProductosMontajes", x => x.IdDetallesProductosMontajes);
                });

            migrationBuilder.CreateTable(
                name: "Estados",
                columns: table => new
                {
                    IdEstado = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Estado = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Estados", x => x.IdEstado);
                });

            migrationBuilder.CreateTable(
                name: "Montajes",
                columns: table => new
                {
                    IdMontaje = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Direccion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ancho = table.Column<float>(type: "real", nullable: false),
                    Fondo = table.Column<float>(type: "real", nullable: false),
                    Alto = table.Column<float>(type: "real", nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ValorTotal = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Montajes", x => x.IdMontaje);
                });

            migrationBuilder.CreateTable(
                name: "PrecioMontajes",
                columns: table => new
                {
                    IdPrecioMontajes = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Precio = table.Column<float>(type: "real", nullable: false),
                    FechaInicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FechaFin = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdMontaje = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrecioMontajes", x => x.IdPrecioMontajes);
                });

            migrationBuilder.CreateTable(
                name: "RespuestasSolicitudesPersonalizadas",
                columns: table => new
                {
                    IdRespuestaSolicitudesPersonalizadas = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdSolicitudPersonalizada = table.Column<int>(type: "int", nullable: false),
                    Respuesta = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RespuestasSolicitudesPersonalizadas", x => x.IdRespuestaSolicitudesPersonalizadas);
                });

            migrationBuilder.CreateTable(
                name: "SolicitudPersonalizada",
                columns: table => new
                {
                    IdSolicitudPersonalizada = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdCategoria = table.Column<int>(type: "int", nullable: false),
                    Ancho = table.Column<float>(type: "real", nullable: false),
                    Fondo = table.Column<float>(type: "real", nullable: false),
                    Alto = table.Column<float>(type: "real", nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ValorTotal = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SolicitudPersonalizada", x => x.IdSolicitudPersonalizada);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DetalleEstadosMontajes");

            migrationBuilder.DropTable(
                name: "DetalleEstadosProductosPersoanlizados");

            migrationBuilder.DropTable(
                name: "DetalleEstadosSolicitudPersonalizada");

            migrationBuilder.DropTable(
                name: "DetalleProductosSolicitud");

            migrationBuilder.DropTable(
                name: "DetallesMaterialesMontajes");

            migrationBuilder.DropTable(
                name: "DetallesMaterialesSolicitudesPersonalizadas");

            migrationBuilder.DropTable(
                name: "DetallesProductosMontajes");

            migrationBuilder.DropTable(
                name: "Estados");

            migrationBuilder.DropTable(
                name: "Montajes");

            migrationBuilder.DropTable(
                name: "PrecioMontajes");

            migrationBuilder.DropTable(
                name: "RespuestasSolicitudesPersonalizadas");

            migrationBuilder.DropTable(
                name: "SolicitudPersonalizada");
        }
    }
}
