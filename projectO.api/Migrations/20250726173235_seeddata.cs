using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace projectO.api.Migrations
{
    /// <inheritdoc />
    public partial class seeddata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "blogs",
                columns: new[] { "Id", "Topic", "description" },
                values: new object[] { 1, "Infaltion", "The job market is clutter right now i dont know why" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "blogs",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
