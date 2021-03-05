using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Back.Models.DAL;
using Back.Models.Entidades;
using Back.Models.Servicios;
using Back.Models.Usuario;
using Microsoft.AspNetCore.Identity;

namespace Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestablecimientoContrasenasController : ControllerBase
    {
        private readonly DBContext _context;

        public RestablecimientoContrasenasController(DBContext context)
        {
            _context = context;
        }

        // GET: api/RestablecimientoContrasenas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RestablecimientoContrasena>>> GetrestablecimientoContrasenas()
        {
            return await _context.restablecimientoContrasenas.ToListAsync();
        }

        
        // POST: api/RestablecimientoContrasenas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        
        public async Task<string> PostRestablecimientoContrasena(RestablecimientoContrasena restablecimientoContrasena)
        {
            Guid miGuid = Guid.NewGuid();
            string token = Convert.ToBase64String(miGuid.ToByteArray());
            token = token.Replace("=", "").Replace("+", "");
            ServiciosHistorialCorreo serviciosHistorialCorreo = new ServiciosHistorialCorreo(_context);
            historialcorreo historialcorreo = new historialcorreo
            {
                Asunto = "Codigo de recuperacion de Cuenta InnoShop",
                Correo = restablecimientoContrasena.Correo,
                Mensaje = token,
                NombreEvi = "Innova"
            };

            restablecimientoContrasena.Codigo = token;
            restablecimientoContrasena.Fecha =  DateTime.Now.ToString();

            await serviciosHistorialCorreo.AgregarHistoria(historialcorreo);
            _context.restablecimientoContrasenas.Add(restablecimientoContrasena);
            await _context.SaveChangesAsync();

            return "Exitoso";
        }


        [HttpPost]
        [Route("Verificacion")]
        public async Task<bool>  RestablecimientoContrasena(VerificacionRestablecimientoContrasena verificacionRestablecimientoContrasena)
        {
            await using (_context)
            {

                var RestablecimientoContrasena = (from restablecimiento in _context.restablecimientoContrasenas
                                                  where restablecimiento.Correo == verificacionRestablecimientoContrasena.Correo
                                                  orderby restablecimiento.IdRestablecimiento descending
                                                  select new RestablecimientoContrasena { 
                                                      Codigo = restablecimiento.Codigo                                             
                                                  }).ToList();
     

                if (RestablecimientoContrasena[0].Codigo == verificacionRestablecimientoContrasena.Codigo) {
                    return true;
                }


                return false;
            }
               
        }






    }
}
