using Microsoft.EntityFrameworkCore.Migrations;

namespace Back.Migrations
{
    public partial class EliminarVTS : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ValorTotal",
                table: "SolicitudPersonalizada");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "ValorTotal",
                table: "SolicitudPersonalizada",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }
    }
}
