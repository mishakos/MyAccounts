using Microsoft.EntityFrameworkCore.Migrations;

namespace MyAccounts.Migrations.Migrations
{
    public partial class CurrencyCodesAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ShortCode",
                table: "Currencies",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Symbol",
                table: "Currencies",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ShortCode",
                table: "Currencies");

            migrationBuilder.DropColumn(
                name: "Symbol",
                table: "Currencies");
        }
    }
}
