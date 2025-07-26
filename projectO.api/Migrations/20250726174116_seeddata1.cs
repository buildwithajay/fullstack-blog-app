using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace projectO.api.Migrations
{
    /// <inheritdoc />
    public partial class seeddata1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Topic",
                table: "blogs");

            migrationBuilder.DropColumn(
                name: "description",
                table: "blogs");

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "blogs",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Slug",
                table: "blogs",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "blogs",
                type: "TEXT",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "blogs",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Content", "Slug", "Title" },
                values: new object[] { "The job market is clutter right now i dont know why", null, "Infaltion" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Content",
                table: "blogs");

            migrationBuilder.DropColumn(
                name: "Slug",
                table: "blogs");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "blogs");

            migrationBuilder.AddColumn<string>(
                name: "Topic",
                table: "blogs",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "description",
                table: "blogs",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "blogs",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Topic", "description" },
                values: new object[] { "Infaltion", "The job market is clutter right now i dont know why" });
        }
    }
}
