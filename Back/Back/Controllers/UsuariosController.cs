using Back.Models;
using Back.Models.DAL;
using Back.Models.Entidades;
using Back.Models.Entidades.Usuario;
using Back.Models.Usuario;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly UserManager<UsuarioIdentity> _userManager;
        private readonly ConfiguracionGlobal _configuracionGlobal;
        private readonly DBContext _context;

        public UsuariosController( UserManager<UsuarioIdentity> userManager, IOptions<ConfiguracionGlobal> configuracionGlobal, DBContext context)
        {
            _userManager = userManager;
            _configuracionGlobal = configuracionGlobal.Value;
            _context = context;
        }

        [HttpPut]
        [Route("Actualizacion")]
        public async Task<Object> PutConfiguracion(ActulaizacionContrasena usuario)
        {
            UsuarioIdentity usuarioB = await _userManager.FindByNameAsync(usuario.Correo).ConfigureAwait(false);
            usuarioB.PasswordHash = _userManager.PasswordHasher.HashPassword(usuarioB, usuario.Contrasena);
            return await _userManager.UpdateAsync(usuarioB).ConfigureAwait(false);
        }

        [HttpPut]
        [Route("ActualizacionDatos")]
        public async Task<Object> PutUsuarios(UsuarioModel usuarior)
        {
            UsuarioIdentity usuario = await _userManager.FindByIdAsync(usuarior.Id).ConfigureAwait(false);
            usuario.Apellidos = usuarior.Apellidos;
            usuario.Direccion = usuarior.Direccion;
            usuario.Email = usuarior.Correo;
            usuario.Estado = usuarior.Estado;
            usuario.IdRol = usuarior.IdRol;
            usuario.Nombres = usuarior.Nombres;
            usuario.NumDocumento = usuarior.NumDocumento;
            usuario.Puntos = usuarior.Puntos;
            usuario.Sexo = usuarior.Sexo;
            usuario.Telefono = usuarior.Telefono;
            usuario.TipoDocumento = usuarior.TipoDocumento;
            usuario.UserName = usuarior.Correo;
            return await _userManager.UpdateAsync(usuario).ConfigureAwait(false);
        }

        [HttpPost]
        [Route("Registro")]
        public async Task<Object> RegistroUsuario(UsuarioModel usuarioModel)
        {
            UsuarioIdentity usuario = new()
            {
                UserName = usuarioModel.Correo,
                Nombres = usuarioModel.Nombres,
                Apellidos = usuarioModel.Apellidos,
                Email = usuarioModel.Correo,
                Sexo = usuarioModel.Sexo,
                IdRol = 2,
                TipoDocumento = usuarioModel.TipoDocumento,
                NumDocumento = usuarioModel.NumDocumento,
                Telefono = usuarioModel.Telefono,
                PasswordHash = usuarioModel.Contrasena,
                Direccion = usuarioModel.Direccion,
                Estado = true
            };

            try
            {
                return Ok(await _userManager.CreateAsync(usuario, usuarioModel.Contrasena).ConfigureAwait(false));
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("Logueo")]
        //POST: /api/Usuario/Login
        public async Task<IActionResult> Logueo(LoguinModel loginModel)
        {
            UsuarioIdentity usuario = await _userManager.FindByNameAsync(loginModel.Correo).ConfigureAwait(false);
            if (usuario != null && await _userManager.CheckPasswordAsync(usuario, loginModel.Contrasena).ConfigureAwait(false))
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UsuarioID", usuario.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuracionGlobal.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                JwtSecurityTokenHandler tokenHandler = new();
                SecurityToken securityToken = tokenHandler.CreateToken(tokenDescriptor);
                string token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            else
            {
                return BadRequest(new { mensaje = "Nombre de usuario o contraseña incorrecta" });
            }
        }

        [HttpGet]
        [Route("Perfil")]
        [Authorize]
        public async Task<Object> PerfilUsuario()
        {
            string usuarioId = User.Claims.First(c => c.Type == "UsuarioID").Value;
            var usuario = await _userManager.FindByIdAsync(usuarioId).ConfigureAwait(false);

            if (usuario != null)
            {
                return new
                {
                    usuario.IdRol,
                    usuario.Nombres,
                    usuario.Apellidos,
                    usuario.Email,
                    usuario.Direccion,
                    usuario.Telefono
                };
            }
            else
            {
                return BadRequest(new { mensaje = "No se encuentra el usuario" });
            }
        }

        [HttpGet]
        [Route("Usuarios")]
        public async Task<ActionResult<IEnumerable<historialcorreo>>> Usuarios()
        {
            return new ObjectResult(await _context.usuarioidentity.ToListAsync());
        }
    }
}
