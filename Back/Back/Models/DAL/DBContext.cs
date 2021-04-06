using Back.Models.Entidades;
using Back.Models.Entidades.Productos;
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
        public DbSet<historialcorreo> Historialcorreo { get; set; }
        public DbSet<RestablecimientoContrasena> RestablecimientoContrasenas { get; set; }
        public DbSet<UsuarioIdentity> Usuarioidentity { get; set; }

        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Producto> Productos { get; set; }
        public DbSet<Material> Materiales { get; set; }
        public DbSet<DetalleMaterial> DetalleMateriales { get; set; }
        public DbSet<Imagen> Imagenes { get; set; }
        public DbSet<PrecioProducto> PrecioProductos { get; set; }
        public DbSet<Iva> Iva { get; set; }

    }
}
