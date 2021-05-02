using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Back.Migrations
{
    public partial class Descuentos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "Iva",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)");

            migrationBuilder.CreateTable(
                name: "Descuentos",
                columns: table => new
                {
                    IdDescuento = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FechaVencimiento = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Estado = table.Column<bool>(type: "bit", nullable: false),
                    IdPorcentajeRuleta = table.Column<int>(type: "int", nullable: false),
                    IdValorRuleta = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Descuentos", x => x.IdDescuento);
                });

            migrationBuilder.CreateTable(
                name: "PorcentajesRuleta",
                columns: table => new
                {
                    IdPorcentajeRuleta = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Porcentaje = table.Column<float>(type: "real", nullable: false),
                    Estado = table.Column<bool>(type: "bit", nullable: false),
                    IdUsuario = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PorcentajesRuleta", x => x.IdPorcentajeRuleta);
                });

            migrationBuilder.CreateTable(
                name: "ValorRuleta",
                columns: table => new
                {
                    IdValorRuleta = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ValorDeRuleta = table.Column<int>(type: "int", nullable: false),
                    FechaInicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FechaFin = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ValorRuleta", x => x.IdValorRuleta);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Descuentos");

            migrationBuilder.DropTable(
                name: "PorcentajesRuleta");

            migrationBuilder.DropTable(
                name: "ValorRuleta");

            migrationBuilder.AlterColumn<string>(
                name: "IdUsuario",
                table: "Iva",
                type: "varchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }
    }
}
