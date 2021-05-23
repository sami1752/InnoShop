using Back.Models.Entidades;
using Back.Models.Entidades.Descuentos;
using Back.Models.Entidades.Productos;
using Back.Models.Entidades.Solicitudes;
using Back.Models.Entidades.Solicitudes.Personalizadas;
using Back.Models.Entidades.Ventas;
using Back.Models.Usuario;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Back.Models.DAL
{
    public class DBContext : IdentityDbContext
    {
        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {
        }
        public DbSet<UsuarioIdentity> Usuarioidentity { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Producto> Productos { get; set; }
        public DbSet<Salida> Salidas { get; set; }
        public DbSet<Material> Materiales { get; set; }
        public DbSet<DetalleMaterial> DetalleMateriales { get; set; }
        public DbSet<Imagen> Imagenes { get; set; }
        public DbSet<PrecioProducto> PrecioProductos { get; set; }
        public DbSet<Iva> Iva { get; set; }
        public DbSet<DetalleCarritoDeCompras> DetalleCarritoDeCompras { get; set; }
        public DbSet<CarritoDeCompras> CarritoDeCompras { get; set; }
        public DbSet<Entrada> Entradas { get; set; }
        public DbSet<DetalleEstadosMontajes> DetalleEstadosMontajes { get; set; }
        public DbSet<DetalleEstadosProductosPersoanlizados> DetalleEstadosProductosPersoanlizados { get; set; }
        public DbSet<DetalleEstadosSolicitudPersonalizada> DetalleEstadosSolicitudPersonalizada { get; set; }
        public DbSet<DetalleProductosSolicitud> DetalleProductosSolicitud { get; set; }
        public DbSet<DetallesMaterialesMontajes> DetallesMaterialesMontajes { get; set; }
        public DbSet<DetallesMaterialesSolicitudesPersonalizadas> DetallesMaterialesSolicitudesPersonalizadas { get; set; }
        public DbSet<DetallesProductosMontajes> DetallesProductosMontajes { get; set; }
        public DbSet<Estados> Estados { get; set; }
        public DbSet<Montajes> Montajes { get; set; }
        public DbSet<PrecioMontajes> PrecioMontajes { get; set; }
        public DbSet<RespuestasSolicitudesPersonalizadas> RespuestasSolicitudesPersonalizadas { get; set; }
        public DbSet<SolicitudPersonalizada> SolicitudPersonalizada { get; set; }
        public DbSet<PorcentajesRuleta> PorcentajesRuleta { get; set; }
        public DbSet<ValorRuleta> ValorRuleta { get; set; }
        public DbSet<Descuentos> Descuentos { get; set; }
        public DbSet<DetalleVentaMontajes> DetalleVentaMontajes { get; set; }
        public DbSet<DetalleVentaProductos> DetalleVentaProductos { get; set; }
        public DbSet<DetalleVentaSolicitudes> DetalleVentaSolicitudes { get; set; }
        public DbSet<Ventas> Ventas { get; set; }


    }
}
