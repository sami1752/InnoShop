using Back.Models.Entidades;
using Back.Models.Usuario;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.DAL
{
    public class DBContext : IdentityDbContext
    {

        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {
        }
        public DbSet<historialcorreo> historialcorreo { get; set; }
        public DbSet<RestablecimientoContrasena> restablecimientoContrasenas { get; set; }
        public DbSet<UsuarioIdentity> usuarioidentity { get; set; }
    }
}
