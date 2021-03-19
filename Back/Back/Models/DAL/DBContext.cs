using Back.Models.Entidades;
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
    }
}
