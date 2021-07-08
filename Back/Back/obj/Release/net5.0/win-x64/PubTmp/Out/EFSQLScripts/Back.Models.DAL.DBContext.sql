IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [AspNetRoles] (
        [Id] nvarchar(450) NOT NULL,
        [Name] nvarchar(256) NULL,
        [NormalizedName] nvarchar(256) NULL,
        [ConcurrencyStamp] nvarchar(max) NULL,
        CONSTRAINT [PK_AspNetRoles] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [AspNetUsers] (
        [Id] nvarchar(450) NOT NULL,
        [Discriminator] nvarchar(max) NOT NULL,
        [Nombres] varchar(40) NULL,
        [Apellidos] varchar(40) NULL,
        [Sexo] varchar(20) NULL,
        [IdRol] int NULL,
        [TipoDocumento] varchar(25) NULL,
        [NumDocumento] varchar(10) NULL,
        [Telefono] varchar(10) NULL,
        [Direccion] varchar(50) NULL,
        [Puntos] int NULL,
        [Estado] bit NULL,
        [UserName] nvarchar(256) NULL,
        [NormalizedUserName] nvarchar(256) NULL,
        [Email] nvarchar(256) NULL,
        [NormalizedEmail] nvarchar(256) NULL,
        [EmailConfirmed] bit NOT NULL,
        [PasswordHash] nvarchar(max) NULL,
        [SecurityStamp] nvarchar(max) NULL,
        [ConcurrencyStamp] nvarchar(max) NULL,
        [PhoneNumber] nvarchar(max) NULL,
        [PhoneNumberConfirmed] bit NOT NULL,
        [TwoFactorEnabled] bit NOT NULL,
        [LockoutEnd] datetimeoffset NULL,
        [LockoutEnabled] bit NOT NULL,
        [AccessFailedCount] int NOT NULL,
        CONSTRAINT [PK_AspNetUsers] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [CarritoDeCompras] (
        [IdCarritoDeCompras] int NOT NULL IDENTITY,
        [IdUsuario] nvarchar(450) NOT NULL,
        [Fecha] datetime2 NOT NULL,
        [Estado] bit NOT NULL,
        [Valor] real NOT NULL,
        CONSTRAINT [PK_CarritoDeCompras] PRIMARY KEY ([IdCarritoDeCompras])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [Categorias] (
        [IdCategoria] int NOT NULL IDENTITY,
        [Nombre] varchar(20) NOT NULL,
        [Fecha] datetime2 NOT NULL,
        CONSTRAINT [PK_Categorias] PRIMARY KEY ([IdCategoria])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [Estados] (
        [IdEstado] int NOT NULL IDENTITY,
        [IdUsuario] nvarchar(450) NOT NULL,
        [Estado] varchar(60) NOT NULL,
        CONSTRAINT [PK_Estados] PRIMARY KEY ([IdEstado])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [Iva] (
        [IdIva] int NOT NULL IDENTITY,
        [Porcentaje] real NOT NULL,
        [FechaInicio] datetime2 NOT NULL,
        [FechaFin] datetime2 NOT NULL,
        [IdUsuario] nvarchar(450) NOT NULL,
        CONSTRAINT [PK_Iva] PRIMARY KEY ([IdIva])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [Materiales] (
        [IdMaterial] int NOT NULL IDENTITY,
        [Nombre] varchar(150) NOT NULL,
        [Descripcion] varchar(500) NOT NULL,
        [Fecha] datetime2 NOT NULL,
        [IdUsuario] nvarchar(450) NOT NULL,
        CONSTRAINT [PK_Materiales] PRIMARY KEY ([IdMaterial])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [Montajes] (
        [IdMontaje] int NOT NULL IDENTITY,
        [IdUsuario] nvarchar(450) NOT NULL,
        [Direccion] varchar(250) NOT NULL,
        [Ancho] real NOT NULL,
        [Fondo] real NOT NULL,
        [Alto] real NOT NULL,
        [Fecha] datetime2 NOT NULL,
        [Descripcion] varchar(500) NOT NULL,
        CONSTRAINT [PK_Montajes] PRIMARY KEY ([IdMontaje])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [PorcentajesRuleta] (
        [IdPorcentajeRuleta] int NOT NULL IDENTITY,
        [Porcentaje] real NOT NULL,
        [Estado] bit NOT NULL,
        [IdUsuario] nvarchar(450) NOT NULL,
        [Fecha] datetime2 NOT NULL,
        CONSTRAINT [PK_PorcentajesRuleta] PRIMARY KEY ([IdPorcentajeRuleta])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [SolicitudPersonalizada] (
        [IdSolicitudPersonalizada] int NOT NULL IDENTITY,
        [IdUsuario] nvarchar(450) NOT NULL,
        [Ancho] real NOT NULL,
        [Fondo] real NOT NULL,
        [Alto] real NOT NULL,
        [Fecha] datetime2 NOT NULL,
        [Descripcion] varchar(500) NOT NULL,
        CONSTRAINT [PK_SolicitudPersonalizada] PRIMARY KEY ([IdSolicitudPersonalizada])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [ValorRuleta] (
        [IdValorRuleta] int NOT NULL IDENTITY,
        [IdUsuario] nvarchar(450) NOT NULL,
        [ValorDeRuleta] int NOT NULL,
        [FechaInicio] datetime2 NOT NULL,
        [FechaFin] datetime2 NOT NULL,
        CONSTRAINT [PK_ValorRuleta] PRIMARY KEY ([IdValorRuleta])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [AspNetRoleClaims] (
        [Id] int NOT NULL IDENTITY,
        [RoleId] nvarchar(450) NOT NULL,
        [ClaimType] nvarchar(max) NULL,
        [ClaimValue] nvarchar(max) NULL,
        CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [AspNetRoles] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [AspNetUserClaims] (
        [Id] int NOT NULL IDENTITY,
        [UserId] nvarchar(450) NOT NULL,
        [ClaimType] nvarchar(max) NULL,
        [ClaimValue] nvarchar(max) NULL,
        CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [AspNetUserLogins] (
        [LoginProvider] nvarchar(128) NOT NULL,
        [ProviderKey] nvarchar(128) NOT NULL,
        [ProviderDisplayName] nvarchar(max) NULL,
        [UserId] nvarchar(450) NOT NULL,
        CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY ([LoginProvider], [ProviderKey]),
        CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [AspNetUserRoles] (
        [UserId] nvarchar(450) NOT NULL,
        [RoleId] nvarchar(450) NOT NULL,
        CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY ([UserId], [RoleId]),
        CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [AspNetRoles] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [AspNetUserTokens] (
        [UserId] nvarchar(450) NOT NULL,
        [LoginProvider] nvarchar(128) NOT NULL,
        [Name] nvarchar(128) NOT NULL,
        [Value] nvarchar(max) NULL,
        CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY ([UserId], [LoginProvider], [Name]),
        CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [Productos] (
        [IdProducto] int NOT NULL IDENTITY,
        [Nombre] varchar(60) NOT NULL,
        [Estado] bit NOT NULL,
        [Ancho] real NOT NULL,
        [Largo] real NOT NULL,
        [Fondo] real NOT NULL,
        [TipoPuerta] varchar(30) NOT NULL,
        [Descripcion] varchar(500) NOT NULL,
        [Ruedas] bit NOT NULL,
        [IdUsuario] nvarchar(450) NOT NULL,
        [Puntos] int NOT NULL,
        [IdCategoria] int NOT NULL,
        [GarantiaMeses] int NOT NULL,
        CONSTRAINT [PK_Productos] PRIMARY KEY ([IdProducto]),
        CONSTRAINT [FK_Productos_Categorias_IdCategoria] FOREIGN KEY ([IdCategoria]) REFERENCES [Categorias] ([IdCategoria]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [DetalleEstadosMontajes] (
        [IdDetalleEstadosMontajes] int NOT NULL IDENTITY,
        [IdUsuario] nvarchar(450) NOT NULL,
        [IdEstado] int NOT NULL,
        [FechaInicio] datetime2 NOT NULL,
        [FechaFin] datetime2 NOT NULL,
        [IdMontaje] int NOT NULL,
        CONSTRAINT [PK_DetalleEstadosMontajes] PRIMARY KEY ([IdDetalleEstadosMontajes]),
        CONSTRAINT [FK_DetalleEstadosMontajes_Estados_IdEstado] FOREIGN KEY ([IdEstado]) REFERENCES [Estados] ([IdEstado]) ON DELETE CASCADE,
        CONSTRAINT [FK_DetalleEstadosMontajes_Montajes_IdMontaje] FOREIGN KEY ([IdMontaje]) REFERENCES [Montajes] ([IdMontaje]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [RespuestasMontajes] (
        [IdRespuestaMontajes] int NOT NULL IDENTITY,
        [IdUsuario] nvarchar(450) NOT NULL,
        [IdMontaje] int NOT NULL,
        [Respuesta] varchar(500) NOT NULL,
        [Fecha] datetime2 NOT NULL,
        CONSTRAINT [PK_RespuestasMontajes] PRIMARY KEY ([IdRespuestaMontajes]),
        CONSTRAINT [FK_RespuestasMontajes_Montajes_IdMontaje] FOREIGN KEY ([IdMontaje]) REFERENCES [Montajes] ([IdMontaje]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [DetalleEstadosSolicitudPersonalizada] (
        [IdDetalleEstadoSolicitudPersonalizada] int NOT NULL IDENTITY,
        [IdUsuario] nvarchar(450) NOT NULL,
        [IdEstado] int NOT NULL,
        [FechaInicio] datetime2 NOT NULL,
        [FechaFin] datetime2 NOT NULL,
        [IdSolicitudPersonalizada] int NOT NULL,
        CONSTRAINT [PK_DetalleEstadosSolicitudPersonalizada] PRIMARY KEY ([IdDetalleEstadoSolicitudPersonalizada]),
        CONSTRAINT [FK_DetalleEstadosSolicitudPersonalizada_Estados_IdEstado] FOREIGN KEY ([IdEstado]) REFERENCES [Estados] ([IdEstado]) ON DELETE CASCADE,
        CONSTRAINT [FK_DetalleEstadosSolicitudPersonalizada_SolicitudPersonalizada_IdSolicitudPersonalizada] FOREIGN KEY ([IdSolicitudPersonalizada]) REFERENCES [SolicitudPersonalizada] ([IdSolicitudPersonalizada]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [RespuestasSolicitudesPersonalizadas] (
        [IdRespuestaSolicitudesPersonalizadas] int NOT NULL IDENTITY,
        [IdUsuario] nvarchar(450) NOT NULL,
        [IdSolicitudPersonalizada] int NOT NULL,
        [Respuesta] varchar(500) NOT NULL,
        [Fecha] datetime2 NOT NULL,
        CONSTRAINT [PK_RespuestasSolicitudesPersonalizadas] PRIMARY KEY ([IdRespuestaSolicitudesPersonalizadas]),
        CONSTRAINT [FK_RespuestasSolicitudesPersonalizadas_SolicitudPersonalizada_IdSolicitudPersonalizada] FOREIGN KEY ([IdSolicitudPersonalizada]) REFERENCES [SolicitudPersonalizada] ([IdSolicitudPersonalizada]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [Descuentos] (
        [IdDescuento] int NOT NULL IDENTITY,
        [IdUsuario] nvarchar(450) NOT NULL,
        [Fecha] datetime2 NOT NULL,
        [FechaVencimiento] datetime2 NOT NULL,
        [Estado] bit NOT NULL,
        [IdPorcentajeRuleta] int NOT NULL,
        [IdValorRuleta] int NOT NULL,
        CONSTRAINT [PK_Descuentos] PRIMARY KEY ([IdDescuento]),
        CONSTRAINT [FK_Descuentos_PorcentajesRuleta_IdPorcentajeRuleta] FOREIGN KEY ([IdPorcentajeRuleta]) REFERENCES [PorcentajesRuleta] ([IdPorcentajeRuleta]) ON DELETE CASCADE,
        CONSTRAINT [FK_Descuentos_ValorRuleta_IdValorRuleta] FOREIGN KEY ([IdValorRuleta]) REFERENCES [ValorRuleta] ([IdValorRuleta]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [DetalleCarritoDeCompras] (
        [IdDetalleCarritoDeCompras] int NOT NULL IDENTITY,
        [IdUsuario] nvarchar(450) NOT NULL,
        [IdProducto] int NOT NULL,
        [IdCarritoDeCompras] int NOT NULL,
        [Cantidad] int NOT NULL,
        CONSTRAINT [PK_DetalleCarritoDeCompras] PRIMARY KEY ([IdDetalleCarritoDeCompras]),
        CONSTRAINT [FK_DetalleCarritoDeCompras_CarritoDeCompras_IdCarritoDeCompras] FOREIGN KEY ([IdCarritoDeCompras]) REFERENCES [CarritoDeCompras] ([IdCarritoDeCompras]) ON DELETE CASCADE,
        CONSTRAINT [FK_DetalleCarritoDeCompras_Productos_IdProducto] FOREIGN KEY ([IdProducto]) REFERENCES [Productos] ([IdProducto]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [DetalleMateriales] (
        [IdDetalleMaterial] int NOT NULL IDENTITY,
        [IdProducto] int NOT NULL,
        [IdMaterial] int NOT NULL,
        [IdUsuario] nvarchar(450) NOT NULL,
        CONSTRAINT [PK_DetalleMateriales] PRIMARY KEY ([IdDetalleMaterial]),
        CONSTRAINT [FK_DetalleMateriales_Materiales_IdMaterial] FOREIGN KEY ([IdMaterial]) REFERENCES [Materiales] ([IdMaterial]) ON DELETE CASCADE,
        CONSTRAINT [FK_DetalleMateriales_Productos_IdProducto] FOREIGN KEY ([IdProducto]) REFERENCES [Productos] ([IdProducto]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [DetalleProductosSolicitud] (
        [IdDetalleProductosSolicitud] int NOT NULL IDENTITY,
        [IdUsuario] nvarchar(450) NOT NULL,
        [IdSolicitudPersonalizada] int NOT NULL,
        [IdProducto] int NOT NULL,
        CONSTRAINT [PK_DetalleProductosSolicitud] PRIMARY KEY ([IdDetalleProductosSolicitud]),
        CONSTRAINT [FK_DetalleProductosSolicitud_Productos_IdProducto] FOREIGN KEY ([IdProducto]) REFERENCES [Productos] ([IdProducto]) ON DELETE CASCADE,
        CONSTRAINT [FK_DetalleProductosSolicitud_SolicitudPersonalizada_IdSolicitudPersonalizada] FOREIGN KEY ([IdSolicitudPersonalizada]) REFERENCES [SolicitudPersonalizada] ([IdSolicitudPersonalizada]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [DetallesProductosMontajes] (
        [IdDetallesProductosMontajes] int NOT NULL IDENTITY,
        [IdUsuario] nvarchar(450) NOT NULL,
        [IdMontaje] int NOT NULL,
        [IdProducto] int NOT NULL,
        CONSTRAINT [PK_DetallesProductosMontajes] PRIMARY KEY ([IdDetallesProductosMontajes]),
        CONSTRAINT [FK_DetallesProductosMontajes_Montajes_IdMontaje] FOREIGN KEY ([IdMontaje]) REFERENCES [Montajes] ([IdMontaje]) ON DELETE CASCADE,
        CONSTRAINT [FK_DetallesProductosMontajes_Productos_IdProducto] FOREIGN KEY ([IdProducto]) REFERENCES [Productos] ([IdProducto]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [Entradas] (
        [IdEntrada] int NOT NULL IDENTITY,
        [IdProducto] int NOT NULL,
        [Cantidad] int NOT NULL,
        [Fecha] datetime2 NOT NULL,
        [IdUsuario] nvarchar(450) NOT NULL,
        CONSTRAINT [PK_Entradas] PRIMARY KEY ([IdEntrada]),
        CONSTRAINT [FK_Entradas_Productos_IdProducto] FOREIGN KEY ([IdProducto]) REFERENCES [Productos] ([IdProducto]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [Imagenes] (
        [IdImagen] int NOT NULL IDENTITY,
        [RutaImagen] varchar(200) NOT NULL,
        [IdProducto] int NOT NULL,
        [IdUsuario] nvarchar(450) NOT NULL,
        CONSTRAINT [PK_Imagenes] PRIMARY KEY ([IdImagen]),
        CONSTRAINT [FK_Imagenes_Productos_IdProducto] FOREIGN KEY ([IdProducto]) REFERENCES [Productos] ([IdProducto]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [PrecioProductos] (
        [IdPrecioProducto] int NOT NULL IDENTITY,
        [Precio] real NOT NULL,
        [FechaInicio] datetime2 NOT NULL,
        [FechaFin] datetime2 NOT NULL,
        [IdProducto] int NOT NULL,
        [IdUsuario] nvarchar(450) NOT NULL,
        CONSTRAINT [PK_PrecioProductos] PRIMARY KEY ([IdPrecioProducto]),
        CONSTRAINT [FK_PrecioProductos_Productos_IdProducto] FOREIGN KEY ([IdProducto]) REFERENCES [Productos] ([IdProducto]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [Salidas] (
        [IdSalida] int NOT NULL IDENTITY,
        [IdProducto] int NOT NULL,
        [Cantidad] int NOT NULL,
        [Fecha] datetime2 NOT NULL,
        [IdUsuario] nvarchar(450) NOT NULL,
        CONSTRAINT [PK_Salidas] PRIMARY KEY ([IdSalida]),
        CONSTRAINT [FK_Salidas_Productos_IdProducto] FOREIGN KEY ([IdProducto]) REFERENCES [Productos] ([IdProducto]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [Ventas] (
        [IdVenta] int NOT NULL IDENTITY,
        [Fecha] datetime2 NOT NULL,
        [IdUsuario] nvarchar(450) NOT NULL,
        [IdDescuento] int NOT NULL,
        [Total] real NOT NULL,
        [IdIva] int NOT NULL,
        [TotalIva] real NOT NULL,
        CONSTRAINT [PK_Ventas] PRIMARY KEY ([IdVenta]),
        CONSTRAINT [FK_Ventas_Descuentos_IdDescuento] FOREIGN KEY ([IdDescuento]) REFERENCES [Descuentos] ([IdDescuento]) ON DELETE CASCADE,
        CONSTRAINT [FK_Ventas_Iva_IdIva] FOREIGN KEY ([IdIva]) REFERENCES [Iva] ([IdIva]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [DetalleVentaMontajes] (
        [IdDetalleVentaMontaje] int NOT NULL IDENTITY,
        [Cantidad] int NOT NULL,
        [SubTotal] real NOT NULL,
        [IdVenta] int NOT NULL,
        [IdMontaje] int NOT NULL,
        CONSTRAINT [PK_DetalleVentaMontajes] PRIMARY KEY ([IdDetalleVentaMontaje]),
        CONSTRAINT [FK_DetalleVentaMontajes_Montajes_IdMontaje] FOREIGN KEY ([IdMontaje]) REFERENCES [Montajes] ([IdMontaje]) ON DELETE CASCADE,
        CONSTRAINT [FK_DetalleVentaMontajes_Ventas_IdVenta] FOREIGN KEY ([IdVenta]) REFERENCES [Ventas] ([IdVenta]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [DetalleVentaProductos] (
        [IdDetalleVentaProducto] int NOT NULL IDENTITY,
        [Cantidad] int NOT NULL,
        [SubTotal] real NOT NULL,
        [IdVenta] int NOT NULL,
        [IdProducto] int NOT NULL,
        CONSTRAINT [PK_DetalleVentaProductos] PRIMARY KEY ([IdDetalleVentaProducto]),
        CONSTRAINT [FK_DetalleVentaProductos_Productos_IdProducto] FOREIGN KEY ([IdProducto]) REFERENCES [Productos] ([IdProducto]) ON DELETE CASCADE,
        CONSTRAINT [FK_DetalleVentaProductos_Ventas_IdVenta] FOREIGN KEY ([IdVenta]) REFERENCES [Ventas] ([IdVenta]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE TABLE [DetalleVentaSolicitudes] (
        [IdDetalleVentaSolicitud] int NOT NULL IDENTITY,
        [Cantidad] int NOT NULL,
        [SubTotal] real NOT NULL,
        [IdVenta] int NOT NULL,
        [IdSolicitudPersonalizada] int NOT NULL,
        CONSTRAINT [PK_DetalleVentaSolicitudes] PRIMARY KEY ([IdDetalleVentaSolicitud]),
        CONSTRAINT [FK_DetalleVentaSolicitudes_SolicitudPersonalizada_IdSolicitudPersonalizada] FOREIGN KEY ([IdSolicitudPersonalizada]) REFERENCES [SolicitudPersonalizada] ([IdSolicitudPersonalizada]) ON DELETE CASCADE,
        CONSTRAINT [FK_DetalleVentaSolicitudes_Ventas_IdVenta] FOREIGN KEY ([IdVenta]) REFERENCES [Ventas] ([IdVenta]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_AspNetRoleClaims_RoleId] ON [AspNetRoleClaims] ([RoleId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [RoleNameIndex] ON [AspNetRoles] ([NormalizedName]) WHERE [NormalizedName] IS NOT NULL');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_AspNetUserClaims_UserId] ON [AspNetUserClaims] ([UserId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_AspNetUserLogins_UserId] ON [AspNetUserLogins] ([UserId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_AspNetUserRoles_RoleId] ON [AspNetUserRoles] ([RoleId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [EmailIndex] ON [AspNetUsers] ([NormalizedEmail]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [UserNameIndex] ON [AspNetUsers] ([NormalizedUserName]) WHERE [NormalizedUserName] IS NOT NULL');
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_Descuentos_IdPorcentajeRuleta] ON [Descuentos] ([IdPorcentajeRuleta]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_Descuentos_IdValorRuleta] ON [Descuentos] ([IdValorRuleta]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_DetalleCarritoDeCompras_IdCarritoDeCompras] ON [DetalleCarritoDeCompras] ([IdCarritoDeCompras]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_DetalleCarritoDeCompras_IdProducto] ON [DetalleCarritoDeCompras] ([IdProducto]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_DetalleEstadosMontajes_IdEstado] ON [DetalleEstadosMontajes] ([IdEstado]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_DetalleEstadosMontajes_IdMontaje] ON [DetalleEstadosMontajes] ([IdMontaje]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_DetalleEstadosSolicitudPersonalizada_IdEstado] ON [DetalleEstadosSolicitudPersonalizada] ([IdEstado]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_DetalleEstadosSolicitudPersonalizada_IdSolicitudPersonalizada] ON [DetalleEstadosSolicitudPersonalizada] ([IdSolicitudPersonalizada]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_DetalleMateriales_IdMaterial] ON [DetalleMateriales] ([IdMaterial]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_DetalleMateriales_IdProducto] ON [DetalleMateriales] ([IdProducto]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_DetalleProductosSolicitud_IdProducto] ON [DetalleProductosSolicitud] ([IdProducto]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_DetalleProductosSolicitud_IdSolicitudPersonalizada] ON [DetalleProductosSolicitud] ([IdSolicitudPersonalizada]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_DetallesProductosMontajes_IdMontaje] ON [DetallesProductosMontajes] ([IdMontaje]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_DetallesProductosMontajes_IdProducto] ON [DetallesProductosMontajes] ([IdProducto]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_DetalleVentaMontajes_IdMontaje] ON [DetalleVentaMontajes] ([IdMontaje]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_DetalleVentaMontajes_IdVenta] ON [DetalleVentaMontajes] ([IdVenta]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_DetalleVentaProductos_IdProducto] ON [DetalleVentaProductos] ([IdProducto]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_DetalleVentaProductos_IdVenta] ON [DetalleVentaProductos] ([IdVenta]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_DetalleVentaSolicitudes_IdSolicitudPersonalizada] ON [DetalleVentaSolicitudes] ([IdSolicitudPersonalizada]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_DetalleVentaSolicitudes_IdVenta] ON [DetalleVentaSolicitudes] ([IdVenta]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_Entradas_IdProducto] ON [Entradas] ([IdProducto]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_Imagenes_IdProducto] ON [Imagenes] ([IdProducto]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_PrecioProductos_IdProducto] ON [PrecioProductos] ([IdProducto]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_Productos_IdCategoria] ON [Productos] ([IdCategoria]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_RespuestasMontajes_IdMontaje] ON [RespuestasMontajes] ([IdMontaje]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_RespuestasSolicitudesPersonalizadas_IdSolicitudPersonalizada] ON [RespuestasSolicitudesPersonalizadas] ([IdSolicitudPersonalizada]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_Salidas_IdProducto] ON [Salidas] ([IdProducto]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_Ventas_IdDescuento] ON [Ventas] ([IdDescuento]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    CREATE INDEX [IX_Ventas_IdIva] ON [Ventas] ([IdIva]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210531175750_DataBaseI')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210531175750_DataBaseI', N'5.0.3');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210604112945_Validaciones Usuario')
BEGIN
    DECLARE @var0 sysname;
    SELECT @var0 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[AspNetUsers]') AND [c].[name] = N'Telefono');
    IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [AspNetUsers] DROP CONSTRAINT [' + @var0 + '];');
    ALTER TABLE [AspNetUsers] ALTER COLUMN [Telefono] varchar(15) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210604112945_Validaciones Usuario')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210604112945_Validaciones Usuario', N'5.0.3');
END;
GO

COMMIT;
GO

