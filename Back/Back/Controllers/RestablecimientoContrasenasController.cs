using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Back.Models.DAL;
using Back.Models.Entidades;
using Back.Models.Servicios;

namespace Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestablecimientoContrasenasController : ControllerBase
    {
        private readonly DBContext _context;
        public RestablecimientoContrasenasController(DBContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RestablecimientoContrasena>>> GetrestablecimientoContrasenas() => await _context.RestablecimientoContrasenas.ToListAsync();

        [HttpPost]
        public async Task<string> PostRestablecimientoContrasena(RestablecimientoContrasena restablecimientoContrasena)
        {
            try
            {
                Guid miGuid = Guid.NewGuid();
                string token = Convert.ToBase64String(miGuid.ToByteArray());
                token = token.Replace("=", "").Replace("+", "");
                ServiciosHistorialCorreo serviciosHistorialCorreo = new(_context);
                historialcorreo historialcorreo = new()
                {
                    Asunto = "Codigo de recuperacion de Cuenta InnoShop",
                    Correo = restablecimientoContrasena.Correo,
                    Mensaje = token,
                    NombreEvi = "Innova"
                };
                restablecimientoContrasena.Codigo = token;
                restablecimientoContrasena.Fecha = DateTime.Now.ToString();
                await serviciosHistorialCorreo.AgregarHistoria(historialcorreo);
                _context.RestablecimientoContrasenas.Add(restablecimientoContrasena);
                await _context.SaveChangesAsync();
                return "Exitoso";
            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }

        [HttpPost]
        [Route("Verificacion")]
        public async Task<bool> RestablecimientoContrasena(VerificacionRestablecimientoContrasena verificacionRestablecimientoContrasena)
        {
            try
            {
                await using (_context)
                {
                    List<RestablecimientoContrasena> RestablecimientoContrasena = (from restablecimiento in _context.RestablecimientoContrasenas
                                                                                   where restablecimiento.Correo == verificacionRestablecimientoContrasena.Correo
                                                                                   orderby restablecimiento.IdRestablecimiento descending
                                                                                   select new RestablecimientoContrasena
                                                                                   {
                                                                                       Codigo = restablecimiento.Codigo
                                                                                   }).ToList();
                    if (RestablecimientoContrasena[0].Codigo == verificacionRestablecimientoContrasena.Codigo)
                        return true;
                    return false;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
