using Microsoft.EntityFrameworkCore.Migrations;

namespace MyAccounts.Migrations.Migrations
{
    public partial class ClientFieldsAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Clients",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Clients",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Clients");
        }
    }
}
