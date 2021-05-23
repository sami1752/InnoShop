using Microsoft.EntityFrameworkCore.Migrations;

namespace Back.Migrations
{
    public partial class Eliminacionvalortotalmontajes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ValorTotal",
                table: "Montajes");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "ValorTotal",
                table: "Montajes",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }
    }
}
