using Back.Models.Entidades.Usuario;
using Back.Models.Usuario;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Controllers
{

    [Route("api/Usuarios")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly UserManager<UsuarioIdentity> _userManager;
        private readonly SignInManager<UsuarioIdentity> _singInManager;

        public UsuariosController(SignInManager<UsuarioIdentity> singInManager, UserManager<UsuarioIdentity> userManager)
        {
            _userManager = userManager;
            _singInManager = singInManager;
        }

        [HttpGet]

        public string inicio()
        {
            return "Hola mundo";
        }

        [HttpPost]
        [Route("Registro")]

        public async Task<Object> registrotUsuario(UsuarioModel usuarioModel)
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
                PasswordHash = usuarioModel.Contrasena
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
    }
}
