using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Back.Migrations
{
    public partial class DataBaseI : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Nombres = table.Column<string>(type: "varchar(40)", nullable: true),
                    Apellidos = table.Column<string>(type: "varchar(40)", nullable: true),
                    Sexo = table.Column<string>(type: "varchar(20)", nullable: true),
                    IdRol = table.Column<int>(type: "int", nullable: true),
                    TipoDocumento = table.Column<string>(type: "varchar(25)", nullable: true),
                    NumDocumento = table.Column<string>(type: "varchar(10)", nullable: true),
                    Telefono = table.Column<string>(type: "varchar(10)", nullable: true),
                    Direccion = table.Column<string>(type: "varchar(50)", nullable: true),
                    Puntos = table.Column<int>(type: "int", nullable: true),
                    Estado = table.Column<bool>(type: "bit", nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CarritoDeCompras",
                columns: table => new
                {
                    IdCarritoDeCompras = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Estado = table.Column<bool>(type: "bit", nullable: false),
                    Valor = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarritoDeCompras", x => x.IdCarritoDeCompras);
                });

            migrationBuilder.CreateTable(
                name: "Categorias",
                columns: table => new
                {
                    IdCategoria = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "varchar(20)", nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categorias", x => x.IdCategoria);
                });

            migrationBuilder.CreateTable(
                name: "Estados",
                columns: table => new
                {
                    IdEstado = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Estado = table.Column<string>(type: "varchar(60)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Estados", x => x.IdEstado);
                });

            migrationBuilder.CreateTable(
                name: "Iva",
                columns: table => new
                {
                    IdIva = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Porcentaje = table.Column<float>(type: "real", nullable: false),
                    FechaInicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FechaFin = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdUsuario = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Iva", x => x.IdIva);
                });

            migrationBuilder.CreateTable(
                name: "Materiales",
                columns: table => new
                {
                    IdMaterial = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "varchar(150)", nullable: false),
                    Descripcion = table.Column<string>(type: "varchar(500)", nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdUsuario = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Materiales", x => x.IdMaterial);
                });

            migrationBuilder.CreateTable(
                name: "Montajes",
                columns: table => new
                {
                    IdMontaje = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Direccion = table.Column<string>(type: "varchar(250)", nullable: false),
                    Ancho = table.Column<float>(type: "real", nullable: false),
                    Fondo = table.Column<float>(type: "real", nullable: false),
                    Alto = table.Column<float>(type: "real", nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Descripcion = table.Column<string>(type: "varchar(500)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Montajes", x => x.IdMontaje);
                });

            migrationBuilder.CreateTable(
                name: "PorcentajesRuleta",
                columns: table => new
                {
                    IdPorcentajeRuleta = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Porcentaje = table.Column<float>(type: "real", nullable: false),
                    Estado = table.Column<bool>(type: "bit", nullable: false),
                    IdUsuario = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PorcentajesRuleta", x => x.IdPorcentajeRuleta);
                });

            migrationBuilder.CreateTable(
                name: "SolicitudPersonalizada",
                columns: table => new
                {
                    IdSolicitudPersonalizada = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Ancho = table.Column<float>(type: "real", nullable: false),
                    Fondo = table.Column<float>(type: "real", nullable: false),
                    Alto = table.Column<float>(type: "real", nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Descripcion = table.Column<string>(type: "varchar(500)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SolicitudPersonalizada", x => x.IdSolicitudPersonalizada);
                });

            migrationBuilder.CreateTable(
                name: "ValorRuleta",
                columns: table => new
                {
                    IdValorRuleta = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ValorDeRuleta = table.Column<int>(type: "int", nullable: false),
                    FechaInicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FechaFin = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ValorRuleta", x => x.IdValorRuleta);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Productos",
                columns: table => new
                {
                    IdProducto = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "varchar(60)", nullable: false),
                    Estado = table.Column<bool>(type: "bit", nullable: false),
                    Ancho = table.Column<float>(type: "real", nullable: false),
                    Largo = table.Column<float>(type: "real", nullable: false),
                    Fondo = table.Column<float>(type: "real", nullable: false),
                    TipoPuerta = table.Column<string>(type: "varchar(30)", nullable: false),
                    Descripcion = table.Column<string>(type: "varchar(500)", nullable: false),
                    Ruedas = table.Column<bool>(type: "bit", nullable: false),
                    IdUsuario = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Puntos = table.Column<int>(type: "int", nullable: false),
                    IdCategoria = table.Column<int>(type: "int", nullable: false),
                    GarantiaMeses = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Productos", x => x.IdProducto);
                    table.ForeignKey(
                        name: "FK_Productos_Categorias_IdCategoria",
                        column: x => x.IdCategoria,
                        principalTable: "Categorias",
                        principalColumn: "IdCategoria",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DetalleEstadosMontajes",
                columns: table => new
                {
                    IdDetalleEstadosMontajes = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IdEstado = table.Column<int>(type: "int", nullable: false),
                    FechaInicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FechaFin = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdMontaje = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetalleEstadosMontajes", x => x.IdDetalleEstadosMontajes);
                    table.ForeignKey(
                        name: "FK_DetalleEstadosMontajes_Estados_IdEstado",
                        column: x => x.IdEstado,
                        principalTable: "Estados",
                        principalColumn: "IdEstado",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetalleEstadosMontajes_Montajes_IdMontaje",
                        column: x => x.IdMontaje,
                        principalTable: "Montajes",
                        principalColumn: "IdMontaje",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RespuestasMontajes",
                columns: table => new
                {
                    IdRespuestaMontajes = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IdMontaje = table.Column<int>(type: "int", nullable: false),
                    Respuesta = table.Column<string>(type: "varchar(500)", nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RespuestasMontajes", x => x.IdRespuestaMontajes);
                    table.ForeignKey(
                        name: "FK_RespuestasMontajes_Montajes_IdMontaje",
                        column: x => x.IdMontaje,
                        principalTable: "Montajes",
                        principalColumn: "IdMontaje",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DetalleEstadosSolicitudPersonalizada",
                columns: table => new
                {
                    IdDetalleEstadoSolicitudPersonalizada = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IdEstado = table.Column<int>(type: "int", nullable: false),
                    FechaInicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FechaFin = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdSolicitudPersonalizada = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetalleEstadosSolicitudPersonalizada", x => x.IdDetalleEstadoSolicitudPersonalizada);
                    table.ForeignKey(
                        name: "FK_DetalleEstadosSolicitudPersonalizada_Estados_IdEstado",
                        column: x => x.IdEstado,
                        principalTable: "Estados",
                        principalColumn: "IdEstado",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetalleEstadosSolicitudPersonalizada_SolicitudPersonalizada_IdSolicitudPersonalizada",
                        column: x => x.IdSolicitudPersonalizada,
                        principalTable: "SolicitudPersonalizada",
                        principalColumn: "IdSolicitudPersonalizada",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RespuestasSolicitudesPersonalizadas",
                columns: table => new
                {
                    IdRespuestaSolicitudesPersonalizadas = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IdSolicitudPersonalizada = table.Column<int>(type: "int", nullable: false),
                    Respuesta = table.Column<string>(type: "varchar(500)", nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RespuestasSolicitudesPersonalizadas", x => x.IdRespuestaSolicitudesPersonalizadas);
                    table.ForeignKey(
                        name: "FK_RespuestasSolicitudesPersonalizadas_SolicitudPersonalizada_IdSolicitudPersonalizada",
                        column: x => x.IdSolicitudPersonalizada,
                        principalTable: "SolicitudPersonalizada",
                        principalColumn: "IdSolicitudPersonalizada",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Descuentos",
                columns: table => new
                {
                    IdDescuento = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FechaVencimiento = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Estado = table.Column<bool>(type: "bit", nullable: false),
                    IdPorcentajeRuleta = table.Column<int>(type: "int", nullable: false),
                    IdValorRuleta = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Descuentos", x => x.IdDescuento);
                    table.ForeignKey(
                        name: "FK_Descuentos_PorcentajesRuleta_IdPorcentajeRuleta",
                        column: x => x.IdPorcentajeRuleta,
                        principalTable: "PorcentajesRuleta",
                        principalColumn: "IdPorcentajeRuleta",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Descuentos_ValorRuleta_IdValorRuleta",
                        column: x => x.IdValorRuleta,
                        principalTable: "ValorRuleta",
                        principalColumn: "IdValorRuleta",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DetalleCarritoDeCompras",
                columns: table => new
                {
                    IdDetalleCarritoDeCompras = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IdProducto = table.Column<int>(type: "int", nullable: false),
                    IdCarritoDeCompras = table.Column<int>(type: "int", nullable: false),
                    Cantidad = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetalleCarritoDeCompras", x => x.IdDetalleCarritoDeCompras);
                    table.ForeignKey(
                        name: "FK_DetalleCarritoDeCompras_CarritoDeCompras_IdCarritoDeCompras",
                        column: x => x.IdCarritoDeCompras,
                        principalTable: "CarritoDeCompras",
                        principalColumn: "IdCarritoDeCompras",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetalleCarritoDeCompras_Productos_IdProducto",
                        column: x => x.IdProducto,
                        principalTable: "Productos",
                        principalColumn: "IdProducto",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DetalleMateriales",
                columns: table => new
                {
                    IdDetalleMaterial = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdProducto = table.Column<int>(type: "int", nullable: false),
                    IdMaterial = table.Column<int>(type: "int", nullable: false),
                    IdUsuario = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetalleMateriales", x => x.IdDetalleMaterial);
                    table.ForeignKey(
                        name: "FK_DetalleMateriales_Materiales_IdMaterial",
                        column: x => x.IdMaterial,
                        principalTable: "Materiales",
                        principalColumn: "IdMaterial",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetalleMateriales_Productos_IdProducto",
                        column: x => x.IdProducto,
                        principalTable: "Productos",
                        principalColumn: "IdProducto",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DetalleProductosSolicitud",
                columns: table => new
                {
                    IdDetalleProductosSolicitud = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IdSolicitudPersonalizada = table.Column<int>(type: "int", nullable: false),
                    IdProducto = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetalleProductosSolicitud", x => x.IdDetalleProductosSolicitud);
                    table.ForeignKey(
                        name: "FK_DetalleProductosSolicitud_Productos_IdProducto",
                        column: x => x.IdProducto,
                        principalTable: "Productos",
                        principalColumn: "IdProducto",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetalleProductosSolicitud_SolicitudPersonalizada_IdSolicitudPersonalizada",
                        column: x => x.IdSolicitudPersonalizada,
                        principalTable: "SolicitudPersonalizada",
                        principalColumn: "IdSolicitudPersonalizada",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DetallesProductosMontajes",
                columns: table => new
                {
                    IdDetallesProductosMontajes = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUsuario = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IdMontaje = table.Column<int>(type: "int", nullable: false),
                    IdProducto = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetallesProductosMontajes", x => x.IdDetallesProductosMontajes);
                    table.ForeignKey(
                        name: "FK_DetallesProductosMontajes_Montajes_IdMontaje",
                        column: x => x.IdMontaje,
                        principalTable: "Montajes",
                        principalColumn: "IdMontaje",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetallesProductosMontajes_Productos_IdProducto",
                        column: x => x.IdProducto,
                        principalTable: "Productos",
                        principalColumn: "IdProducto",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Entradas",
                columns: table => new
                {
                    IdEntrada = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdProducto = table.Column<int>(type: "int", nullable: false),
                    Cantidad = table.Column<int>(type: "int", nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdUsuario = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entradas", x => x.IdEntrada);
                    table.ForeignKey(
                        name: "FK_Entradas_Productos_IdProducto",
                        column: x => x.IdProducto,
                        principalTable: "Productos",
                        principalColumn: "IdProducto",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Imagenes",
                columns: table => new
                {
                    IdImagen = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RutaImagen = table.Column<string>(type: "varchar(200)", nullable: false),
                    IdProducto = table.Column<int>(type: "int", nullable: false),
                    IdUsuario = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Imagenes", x => x.IdImagen);
                    table.ForeignKey(
                        name: "FK_Imagenes_Productos_IdProducto",
                        column: x => x.IdProducto,
                        principalTable: "Productos",
                        principalColumn: "IdProducto",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PrecioProductos",
                columns: table => new
                {
                    IdPrecioProducto = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Precio = table.Column<float>(type: "real", nullable: false),
                    FechaInicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FechaFin = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdProducto = table.Column<int>(type: "int", nullable: false),
                    IdUsuario = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrecioProductos", x => x.IdPrecioProducto);
                    table.ForeignKey(
                        name: "FK_PrecioProductos_Productos_IdProducto",
                        column: x => x.IdProducto,
                        principalTable: "Productos",
                        principalColumn: "IdProducto",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Salidas",
                columns: table => new
                {
                    IdSalida = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdProducto = table.Column<int>(type: "int", nullable: false),
                    Cantidad = table.Column<int>(type: "int", nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdUsuario = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Salidas", x => x.IdSalida);
                    table.ForeignKey(
                        name: "FK_Salidas_Productos_IdProducto",
                        column: x => x.IdProducto,
                        principalTable: "Productos",
                        principalColumn: "IdProducto",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Ventas",
                columns: table => new
                {
                    IdVenta = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdUsuario = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IdDescuento = table.Column<int>(type: "int", nullable: false),
                    Total = table.Column<float>(type: "real", nullable: false),
                    IdIva = table.Column<int>(type: "int", nullable: false),
                    TotalIva = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ventas", x => x.IdVenta);
                    table.ForeignKey(
                        name: "FK_Ventas_Descuentos_IdDescuento",
                        column: x => x.IdDescuento,
                        principalTable: "Descuentos",
                        principalColumn: "IdDescuento",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Ventas_Iva_IdIva",
                        column: x => x.IdIva,
                        principalTable: "Iva",
                        principalColumn: "IdIva",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DetalleVentaMontajes",
                columns: table => new
                {
                    IdDetalleVentaMontaje = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Cantidad = table.Column<int>(type: "int", nullable: false),
                    SubTotal = table.Column<float>(type: "real", nullable: false),
                    IdVenta = table.Column<int>(type: "int", nullable: false),
                    IdMontaje = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetalleVentaMontajes", x => x.IdDetalleVentaMontaje);
                    table.ForeignKey(
                        name: "FK_DetalleVentaMontajes_Montajes_IdMontaje",
                        column: x => x.IdMontaje,
                        principalTable: "Montajes",
                        principalColumn: "IdMontaje",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetalleVentaMontajes_Ventas_IdVenta",
                        column: x => x.IdVenta,
                        principalTable: "Ventas",
                        principalColumn: "IdVenta",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DetalleVentaProductos",
                columns: table => new
                {
                    IdDetalleVentaProducto = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Cantidad = table.Column<int>(type: "int", nullable: false),
                    SubTotal = table.Column<float>(type: "real", nullable: false),
                    IdVenta = table.Column<int>(type: "int", nullable: false),
                    IdProducto = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetalleVentaProductos", x => x.IdDetalleVentaProducto);
                    table.ForeignKey(
                        name: "FK_DetalleVentaProductos_Productos_IdProducto",
                        column: x => x.IdProducto,
                        principalTable: "Productos",
                        principalColumn: "IdProducto",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetalleVentaProductos_Ventas_IdVenta",
                        column: x => x.IdVenta,
                        principalTable: "Ventas",
                        principalColumn: "IdVenta",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DetalleVentaSolicitudes",
                columns: table => new
                {
                    IdDetalleVentaSolicitud = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Cantidad = table.Column<int>(type: "int", nullable: false),
                    SubTotal = table.Column<float>(type: "real", nullable: false),
                    IdVenta = table.Column<int>(type: "int", nullable: false),
                    IdSolicitudPersonalizada = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetalleVentaSolicitudes", x => x.IdDetalleVentaSolicitud);
                    table.ForeignKey(
                        name: "FK_DetalleVentaSolicitudes_SolicitudPersonalizada_IdSolicitudPersonalizada",
                        column: x => x.IdSolicitudPersonalizada,
                        principalTable: "SolicitudPersonalizada",
                        principalColumn: "IdSolicitudPersonalizada",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetalleVentaSolicitudes_Ventas_IdVenta",
                        column: x => x.IdVenta,
                        principalTable: "Ventas",
                        principalColumn: "IdVenta",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Descuentos_IdPorcentajeRuleta",
                table: "Descuentos",
                column: "IdPorcentajeRuleta");

            migrationBuilder.CreateIndex(
                name: "IX_Descuentos_IdValorRuleta",
                table: "Descuentos",
                column: "IdValorRuleta");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleCarritoDeCompras_IdCarritoDeCompras",
                table: "DetalleCarritoDeCompras",
                column: "IdCarritoDeCompras");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleCarritoDeCompras_IdProducto",
                table: "DetalleCarritoDeCompras",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleEstadosMontajes_IdEstado",
                table: "DetalleEstadosMontajes",
                column: "IdEstado");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleEstadosMontajes_IdMontaje",
                table: "DetalleEstadosMontajes",
                column: "IdMontaje");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleEstadosSolicitudPersonalizada_IdEstado",
                table: "DetalleEstadosSolicitudPersonalizada",
                column: "IdEstado");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleEstadosSolicitudPersonalizada_IdSolicitudPersonalizada",
                table: "DetalleEstadosSolicitudPersonalizada",
                column: "IdSolicitudPersonalizada");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleMateriales_IdMaterial",
                table: "DetalleMateriales",
                column: "IdMaterial");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleMateriales_IdProducto",
                table: "DetalleMateriales",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleProductosSolicitud_IdProducto",
                table: "DetalleProductosSolicitud",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleProductosSolicitud_IdSolicitudPersonalizada",
                table: "DetalleProductosSolicitud",
                column: "IdSolicitudPersonalizada");

            migrationBuilder.CreateIndex(
                name: "IX_DetallesProductosMontajes_IdMontaje",
                table: "DetallesProductosMontajes",
                column: "IdMontaje");

            migrationBuilder.CreateIndex(
                name: "IX_DetallesProductosMontajes_IdProducto",
                table: "DetallesProductosMontajes",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleVentaMontajes_IdMontaje",
                table: "DetalleVentaMontajes",
                column: "IdMontaje");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleVentaMontajes_IdVenta",
                table: "DetalleVentaMontajes",
                column: "IdVenta");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleVentaProductos_IdProducto",
                table: "DetalleVentaProductos",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleVentaProductos_IdVenta",
                table: "DetalleVentaProductos",
                column: "IdVenta");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleVentaSolicitudes_IdSolicitudPersonalizada",
                table: "DetalleVentaSolicitudes",
                column: "IdSolicitudPersonalizada");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleVentaSolicitudes_IdVenta",
                table: "DetalleVentaSolicitudes",
                column: "IdVenta");

            migrationBuilder.CreateIndex(
                name: "IX_Entradas_IdProducto",
                table: "Entradas",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_Imagenes_IdProducto",
                table: "Imagenes",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_PrecioProductos_IdProducto",
                table: "PrecioProductos",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_Productos_IdCategoria",
                table: "Productos",
                column: "IdCategoria");

            migrationBuilder.CreateIndex(
                name: "IX_RespuestasMontajes_IdMontaje",
                table: "RespuestasMontajes",
                column: "IdMontaje");

            migrationBuilder.CreateIndex(
                name: "IX_RespuestasSolicitudesPersonalizadas_IdSolicitudPersonalizada",
                table: "RespuestasSolicitudesPersonalizadas",
                column: "IdSolicitudPersonalizada");

            migrationBuilder.CreateIndex(
                name: "IX_Salidas_IdProducto",
                table: "Salidas",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_Ventas_IdDescuento",
                table: "Ventas",
                column: "IdDescuento");

            migrationBuilder.CreateIndex(
                name: "IX_Ventas_IdIva",
                table: "Ventas",
                column: "IdIva");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "DetalleCarritoDeCompras");

            migrationBuilder.DropTable(
                name: "DetalleEstadosMontajes");

            migrationBuilder.DropTable(
                name: "DetalleEstadosSolicitudPersonalizada");

            migrationBuilder.DropTable(
                name: "DetalleMateriales");

            migrationBuilder.DropTable(
                name: "DetalleProductosSolicitud");

            migrationBuilder.DropTable(
                name: "DetallesProductosMontajes");

            migrationBuilder.DropTable(
                name: "DetalleVentaMontajes");

            migrationBuilder.DropTable(
                name: "DetalleVentaProductos");

            migrationBuilder.DropTable(
                name: "DetalleVentaSolicitudes");

            migrationBuilder.DropTable(
                name: "Entradas");

            migrationBuilder.DropTable(
                name: "Imagenes");

            migrationBuilder.DropTable(
                name: "PrecioProductos");

            migrationBuilder.DropTable(
                name: "RespuestasMontajes");

            migrationBuilder.DropTable(
                name: "RespuestasSolicitudesPersonalizadas");

            migrationBuilder.DropTable(
                name: "Salidas");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "CarritoDeCompras");

            migrationBuilder.DropTable(
                name: "Estados");

            migrationBuilder.DropTable(
                name: "Materiales");

            migrationBuilder.DropTable(
                name: "Ventas");

            migrationBuilder.DropTable(
                name: "Montajes");

            migrationBuilder.DropTable(
                name: "SolicitudPersonalizada");

            migrationBuilder.DropTable(
                name: "Productos");

            migrationBuilder.DropTable(
                name: "Descuentos");

            migrationBuilder.DropTable(
                name: "Iva");

            migrationBuilder.DropTable(
                name: "Categorias");

            migrationBuilder.DropTable(
                name: "PorcentajesRuleta");

            migrationBuilder.DropTable(
                name: "ValorRuleta");
        }
    }
}
