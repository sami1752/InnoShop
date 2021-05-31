using Microsoft.EntityFrameworkCore.Migrations;

namespace Back.Migrations
{
    public partial class PruebaRelacion3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Descuentos_IdPorcentajeRuleta",
                table: "Descuentos",
                column: "IdPorcentajeRuleta");

            migrationBuilder.AddForeignKey(
                name: "FK_Descuentos_PorcentajesRuleta_IdPorcentajeRuleta",
                table: "Descuentos",
                column: "IdPorcentajeRuleta",
                principalTable: "PorcentajesRuleta",
                principalColumn: "IdPorcentajeRuleta",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Descuentos_PorcentajesRuleta_IdPorcentajeRuleta",
                table: "Descuentos");

            migrationBuilder.DropIndex(
                name: "IX_Descuentos_IdPorcentajeRuleta",
                table: "Descuentos");
        }
    }
}
