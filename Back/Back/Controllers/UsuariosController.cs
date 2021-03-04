using Back.Models;
using Back.Models.Entidades.Usuario;
using Back.Models.Usuario;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
        private readonly SignInManager<UsuarioIdentity> _singInManager;
        private readonly ConfiguracionGlobal _configuracionGlobal;

        public UsuariosController(SignInManager<UsuarioIdentity> singInManager, UserManager<UsuarioIdentity> userManager, IOptions<ConfiguracionGlobal> configuracionGlobal)
        {
            _userManager = userManager;
            _singInManager = singInManager;
            _configuracionGlobal = configuracionGlobal.Value; 
        }


        [HttpPost]
        [Route("Registro")]

        public async Task<Object> registroUsuario(UsuarioModel usuarioModel)
        {
            UsuarioIdentity usuario = new UsuarioIdentity()
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
                Direccion = usuarioModel.Direccion
            }; 

            try
            {
                var result = await _userManager.CreateAsync(usuario, usuarioModel.Contrasena).ConfigureAwait(false);
                return Ok(result);
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
            var usuario = await _userManager.FindByNameAsync(loginModel.Correo).ConfigureAwait(false);
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
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);

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
        //GET : /api/UserProfile
        public async Task<Object> PerfilUsuario()
        {
            string usuarioId = User.Claims.First(c => c.Type == "UsuarioID").Value;
            var usuario = await _userManager.FindByIdAsync(usuarioId).ConfigureAwait(false);

            if (usuario != null)
            {
                return new
                {
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
    }
}
