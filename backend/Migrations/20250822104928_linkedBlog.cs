using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class linkedBlog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Blogs",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ReadTime",
                table: "Blogs",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Blogs_AppUserId",
                table: "Blogs",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Blogs_AspNetUsers_AppUserId",
                table: "Blogs",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Blogs_AspNetUsers_AppUserId",
                table: "Blogs");

            migrationBuilder.DropIndex(
                name: "IX_Blogs_AppUserId",
                table: "Blogs");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Blogs");

            migrationBuilder.DropColumn(
                name: "ReadTime",
                table: "Blogs");
        }
    }
}
