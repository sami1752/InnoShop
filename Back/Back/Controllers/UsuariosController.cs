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

                var resp = await _userManager.CreateAsync(usuario, usuarioModel.Contrasena).ConfigureAwait(false);

                if (resp.Succeeded)
                {
                    
                    var token = await _userManager.GenerateEmailConfirmationTokenAsync(usuario);

                    var confirmationLink = "http://localhost:4200/usuarios/confirmarEmail?id=" + usuario.Id + "&token=" + Base64UrlEncoder.Encode( token );
                    
                    //confirmationLink = confirmationLink.Replace("https://localhost:44385/api", "http://localhost:4200");

                    using (MailMessage mail = new MailMessage())
                    {
                        mail.From = new MailAddress("jdtoro949@misena.edu.co", "Innova");
                        mail.To.Add(usuario.Email);
                        mail.Subject = "Activacion de cuenta";
                        mail.Body = $"<h1 color='green'>ACTIVACIÓN DE CUENTA</h1>" +
                            $"<a href='{confirmationLink}'>Clic aquí para activar su cuenta</a>";
                        mail.IsBodyHtml = true;
                        using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
                        {
                            smtp.Credentials = new NetworkCredential("jdtoro949@misena.edu.co", "1238938648");
                            smtp.EnableSsl = true;
                            smtp.Send(mail);
                        }
                    }
                }

                return Ok(resp);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPut]
        [Route("ConfirmarEmail")]
        public async Task<IActionResult> ConfirmarEmail(ConfirmarCorreo confirmarCorreo)
        {
            var usuario = await _userManager.FindByIdAsync(confirmarCorreo.Id);
           
            var result = await _userManager.ConfirmEmailAsync(usuario, Base64UrlEncoder.Decode(confirmarCorreo.Token));
                return Ok(result);
        }


        [HttpPost]
        [Route("RecuperarContra")]
        public async Task<IActionResult> RecuperacionContrasena(UsuarioModel usuarioCorreo)
        {

            UsuarioIdentity usuario = await _userManager.FindByEmailAsync(usuarioCorreo.Correo);

            if (usuario ==null)
            {
                return BadRequest(new { mensaje = "El correo no se encuentra registrado" });
            }
            else
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(usuario);
                
                string restablecimientoLink = "http://localhost:4200/usuarios/RestablecerContrasena?id=" + usuario.Id + "&token="
                    + Base64UrlEncoder.Encode(token);

                using (MailMessage mail = new MailMessage())
                {
                    mail.From = new MailAddress("jdtoro949@misena.edu.co", "Innova");
                    mail.To.Add(usuario.Email);
                    mail.Subject = "Recuperación contraseña de cuenta";
                    mail.Body = $"<h1 color='green'>RECUPERACIÓN CONTRASEÑA DE CUENTA</h1>" +
                        $"<a href='{restablecimientoLink}'>Clic aquí para crear nueva contraseña</a>";
                    mail.IsBodyHtml = true;
                    using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
                    {
                        smtp.Credentials = new NetworkCredential("jdtoro949@misena.edu.co", "1238938648");
                        smtp.EnableSsl = true;
                        smtp.Send(mail);
                    }
                }

                return Ok(new { mensaje = "Se ha enviado el link de recuperación a su correo" });
            }

            

            
        }

        [HttpPut]
        [Route("RestablecerContrasena")]
        public async Task<ActionResult> RestablecerContra(ConfirmarCorreo restableceContra)
        {
            UsuarioIdentity usuario =  await _userManager.FindByIdAsync(restableceContra.Id);
            var result = await _userManager.ResetPasswordAsync(usuario, Base64UrlEncoder.Decode(restableceContra.Token), restableceContra.NuevaContrasena);

            if (result.Succeeded)
            {
                return Ok( new { mensaje = "Restablecimiento de contrasena éxitoso" });
            }
            else
            {
                return BadRequest(new { mensaje = "Error de restablecimiento de contraseña" });
            }

            
        }

        [HttpPut]
        [Route("ModificarContrasena")]
        public async Task<IActionResult> editarContrasena(ActualizacionContrasena actuContrasena)
        {
            var usuario = await _userManager.FindByEmailAsync(actuContrasena.Correo);

            var result = await _userManager.ChangePasswordAsync(usuario,actuContrasena.Contrasena, actuContrasena.NuevaContrasena);

            if (result.Succeeded)
            {
                return Ok(new { mensaje ="Modificación de contraseña éxitosa" });
            }

            return BadRequest(result); 
            
        }


        [HttpPost]
        [Route("Logueo")]
        //POST: /api/Usuario/Login
        public async Task<IActionResult> Logueo(LoguinModel loginModel)
        {
            UsuarioIdentity usuario = await _userManager.FindByNameAsync(loginModel.Correo).ConfigureAwait(false);

            
            if (usuario != null && await _userManager.CheckPasswordAsync(usuario, loginModel.Contrasena).ConfigureAwait(false))
            {
                if (!(await _userManager.IsEmailConfirmedAsync(usuario)))
                {

                    return BadRequest(new { mensaje = "Cuenta sin confirmar" });

                }
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
