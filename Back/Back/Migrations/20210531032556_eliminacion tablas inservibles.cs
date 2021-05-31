using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Back.Migrations
{
    public partial class eliminaciontablasinservibles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DetalleEstadosProductosPersoanlizados");

            migrationBuilder.DropTable(
                name: "DetallesMaterialesMontajes");

            migrationBuilder.DropTable(
                name: "DetallesMaterialesSolicitudesPersonalizadas");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DetalleEstadosProductosPersoanlizados",
                columns: table => new
                {
                    IdDetalleEstadosProductosPersoanlizados = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FechaFin = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FechaInicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdEstado = table.Column<int>(type: "int", nullable: false),
                    IdProducto = table.Column<int>(type: "int", nullable: false),
                    IdUsuario = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetalleEstadosProductosPersoanlizados", x => x.IdDetalleEstadosProductosPersoanlizados);
                });

            migrationBuilder.CreateTable(
                name: "DetallesMaterialesMontajes",
                columns: table => new
                {
                    IdDetallesMaterialesMontajes = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdMaterial = table.Column<int>(type: "int", nullable: false),
                    IdMontaje = table.Column<int>(type: "int", nullable: false),
                    IdUsuario = table.Column<string>(type: "nvarchar(max)", nullable: false)
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
                    IdMaterial = table.Column<int>(type: "int", nullable: false),
                    IdSolicitudPersonalizada = table.Column<int>(type: "int", nullable: false),
                    IdUsuario = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetallesMaterialesSolicitudesPersonalizadas", x => x.IdDetallesMaterialesSolicitudesPersonalizadas);
                });
        }
    }
}
