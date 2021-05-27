using Microsoft.EntityFrameworkCore.Migrations;

namespace Back.Migrations
{
    public partial class correcionventas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SubTotal",
                table: "Ventas");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "SubTotal",
                table: "Ventas",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }
    }
}
