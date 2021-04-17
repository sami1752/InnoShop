using Back.Clases;
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
using System.Net;
using System.Net.Mail;
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

        public UsuariosController(UserManager<UsuarioIdentity> userManager, IOptions<ConfiguracionGlobal> configuracionGlobal, DBContext context)
        {
            _userManager = userManager;
            _configuracionGlobal = configuracionGlobal.Value;
            _context = context;
        }

        [HttpPut]
        [Route("Actualizacion")]
        public async Task<Object> PutConfiguracion(ActualizacionContrasena usuario)
        {
            try
            {
                UsuarioIdentity usuarioB = await _userManager.FindByNameAsync(usuario.Email).ConfigureAwait(false);
                usuarioB.PasswordHash = _userManager.PasswordHasher.HashPassword(usuarioB, usuario.Contrasena);
                return await _userManager.UpdateAsync(usuarioB).ConfigureAwait(false);
            }
            catch (Exception e)
            {
                return e;
            }
        }

        [HttpPut]
        [Route("ActualizacionDatos")]
        public async Task<Object> PutUsuarios(UsuarioModel usuarior)
        {
            try
            {
                UsuarioIdentity usuario = await _userManager.FindByIdAsync(usuarior.Id).ConfigureAwait(false);
                usuario.Apellidos = usuarior.Apellidos;
                usuario.Direccion = usuarior.Direccion;
                usuario.Email = usuarior.Email;
                usuario.Estado = usuarior.Estado;
                usuario.IdRol = usuarior.IdRol;
                usuario.Nombres = usuarior.Nombres;
                usuario.NumDocumento = usuarior.NumDocumento;
                usuario.Puntos = usuarior.Puntos;
                usuario.Sexo = usuarior.Sexo;
                usuario.Telefono = usuarior.Telefono;
                usuario.TipoDocumento = usuarior.TipoDocumento;
                usuario.UserName = usuarior.Email;
                return await _userManager.UpdateAsync(usuario).ConfigureAwait(false);
            }
            catch (Exception e)
            {
                return e;
            }

        }

        [HttpPost]
        [Route("Registro")]
        public async Task<Object> RegistroUsuario(UsuarioModel usuarioModel)
        {
            try
            {
                UsuarioIdentity usuario = new()
                {
                    UserName = usuarioModel.Email,
                    Nombres = usuarioModel.Nombres,
                    Apellidos = usuarioModel.Apellidos,
                    Email = usuarioModel.Email,
                    Sexo = usuarioModel.Sexo,
                    IdRol = usuarioModel.IdRol,
                    TipoDocumento = usuarioModel.TipoDocumento,
                    NumDocumento = usuarioModel.NumDocumento,
                    Telefono = usuarioModel.Telefono,
                    PasswordHash = usuarioModel.Contrasena,
                    Direccion = usuarioModel.Direccion,
                    Estado = true
                };
                IdentityResult resp = await _userManager.CreateAsync(usuario, usuarioModel.Contrasena).ConfigureAwait(false);
                if (resp.Succeeded)
                {
                    string token = await _userManager.GenerateEmailConfirmationTokenAsync(usuario);
                    string confirmationLink = "http://localhost:4200/usuarios/confirmarEmail?id=" + usuario.Id + "&token=" + Base64UrlEncoder.Encode(token);
                    using MailMessage mail = new();
                    mail.From = new MailAddress("innoshopcali@gmail.com", "Innova");
                    mail.To.Add(usuario.Email);
                    mail.Subject = "Activacion de cuenta";
                    mail.Body = $"<h1 color='green'>ACTIVACIÓN DE CUENTA</h1>" +
                        $"<a href='{confirmationLink}'>Clic aquí para activar su cuenta</a>";
                    mail.IsBodyHtml = true;
                    using SmtpClient smtp = new("smtp.gmail.com", 587);
                    smtp.Credentials = new NetworkCredential("innoshopcali@gmail.com", "Innova1234");
                    smtp.EnableSsl = true;
                    smtp.Send(mail);
                }
                return Ok(resp);
            }
            catch (Exception e)
            {
                return e;
            }
        }

        [HttpPut]
        [Route("ConfirmarEmail")]
        public async Task<Object> ConfirmarEmail(ConfirmarCorreo confirmarCorreo)
        {
            try
            {
                UsuarioIdentity usuario = await _userManager.FindByIdAsync(confirmarCorreo.Id);
                IdentityResult result = await _userManager.ConfirmEmailAsync(usuario, Base64UrlEncoder.Decode(confirmarCorreo.Token));
                return Ok(result);
            }
            catch (Exception e)
            {
                return e;
            }
        }

        [HttpPost]
        [Route("RecuperarContra")]
        public async Task<Object> RecuperacionContrasena(UsuarioModel usuarioCorreo)
        {
            try
            {
                UsuarioIdentity usuario = await _userManager.FindByEmailAsync(usuarioCorreo.Email);

                if (usuario == null)
                    return BadRequest(new { mensaje = "El correo no se encuentra registrado" });
                else
                {
                    string token = await _userManager.GeneratePasswordResetTokenAsync(usuario);
                    string restablecimientoLink = "http://localhost:4200/usuarios/RestablecerContrasena?id=" + usuario.Id + "&token="
                        + Base64UrlEncoder.Encode(token);
                    using (MailMessage mail = new())
                    {
                        mail.From = new MailAddress("innoshopcali@gmail.com", "Innova");
                        mail.To.Add(usuario.Email);
                        mail.Subject = "Recuperación contraseña de cuenta";
                        mail.Body = $"<h1 color='green'>RECUPERACIÓN CONTRASEÑA DE CUENTA</h1>" +
                            $"<a href='{restablecimientoLink}'>Clic aquí para crear nueva contraseña</a>";
                        mail.IsBodyHtml = true;
                        using SmtpClient smtp = new("smtp.gmail.com", 587);
                        smtp.Credentials = new NetworkCredential("innoshopcali@gmail.com", "Innova1234");
                        smtp.EnableSsl = true;
                        smtp.Send(mail);
                    }
                    return Ok(new { mensaje = "Se ha enviado el link de recuperación a su correo" });
                }
            }
            catch (Exception e)
            {
                return e;
            }
        }

        [HttpPut]
        [Route("RestablecerContrasena")]
        public async Task<Object> RestablecerContra(ConfirmarCorreo restableceContra)
        {
            try
            {
                UsuarioIdentity usuario = await _userManager.FindByIdAsync(restableceContra.Id);
                IdentityResult result = await _userManager.ResetPasswordAsync(usuario, Base64UrlEncoder.Decode(restableceContra.Token), restableceContra.Contrasena);
                if (result.Succeeded)
                    return Ok(new { mensaje = "Restablecimiento de contrasena éxitoso" });
                else
                    return BadRequest(new { mensaje = "Error de restablecimiento de contraseña" });
            }
            catch (Exception e)
            {
                return e;
            }
        }

        [HttpPut]
        [Route("ModificarContrasena")]
        public async Task<Object> EditarContrasena(ActualizacionContrasena actuContrasena)
        {
            try
            {
                UsuarioIdentity usuario = await _userManager.FindByEmailAsync(actuContrasena.Email);
                IdentityResult result = await _userManager.ChangePasswordAsync(usuario, actuContrasena.ContrasenaAntigua, actuContrasena.Contrasena);
                if (result.Succeeded)
                    return Ok(new { mensaje = "Modificación de contraseña éxitosa" });
                return BadRequest(result);
            }
            catch (Exception e)
            {
                return e;
            }
        }

        [HttpPost]
        [Route("Logueo")]
        public async Task<Object> Logueo(LoguinModel loginModel)
        {
            try
            {
                UsuarioIdentity usuario = await _userManager.FindByNameAsync(loginModel.Email).ConfigureAwait(true);
                if (usuario != null && await _userManager.CheckPasswordAsync(usuario, loginModel.Contrasena).ConfigureAwait(true))
                {
                    if (!(await _userManager.IsEmailConfirmedAsync(usuario)))
                        return BadRequest(new { mensaje = "Cuenta sin confirmar" });
                    SecurityTokenDescriptor tokenDescriptor = new()
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
                    return BadRequest(new { mensaje = "Nombre de usuario o contraseña incorrecta" });
            }
            catch (Exception e)
            {
                return e;
            }
        }

        [HttpGet]
        [Route("Perfil")]
        [Authorize]
        public async Task<Object> PerfilUsuario()
        {
            try
            {
                string usuarioId = User.Claims.First(c => c.Type == "UsuarioID").Value;
                UsuarioIdentity usuario = await _userManager.FindByIdAsync(usuarioId).ConfigureAwait(true);
                if (usuario != null)
                    return new
                    {
                        usuario.Id,
                        usuario.IdRol,
                        usuario.Nombres,
                        usuario.Apellidos,
                        usuario.Email,
                        usuario.Direccion,
                        usuario.Telefono,
                        usuario.Estado
                    };
                else
                    return BadRequest(new { mensaje = "No se encuentra el usuario" });
            }
            catch (Exception e)
            {
                return e;
            }
        }


        [HttpGet]
        [Route("ListaUsuarios")]
        public async Task<ActionResult<IEnumerable<UsuarioIdentity>>> Usuarios() => new ObjectResult(await _context.Usuarioidentity.ToListAsync());
        
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<UsuarioIdentity>>> UsuariosPorId(string id) =>new ObjectResult(await _userManager.FindByIdAsync(id).ConfigureAwait(true));


    }
}
