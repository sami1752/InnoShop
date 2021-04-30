using Back.Clases.Descuentos;
using Back.Models.Abstratos;
using Back.Models.DAL;
using Back.Models.Entidades.Descuentos;
using Back.Models.Usuario;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Servicios
{
    public class ServiciosDescuentos : IServiciosDescuentos
    {
        private readonly DBContext _context;
        public ServiciosDescuentos(DBContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<ValorRuleta>> ListarValoresRuleta() =>
                await _context.ValorRuleta.ToListAsync();

        public async Task<ActionResult<IEnumerable<PorcentajesRuleta>>> ListarPorcentajesRuleta() =>
                await _context.PorcentajesRuleta.ToListAsync();
        public async Task<ActionResult<IEnumerable<DetalleDescuentos>>> ListarDescuentos(string IdUsuario)
        {
            await using (_context)
            {
                List<DetalleDescuentos> ListaDescuentos = (from descuentos in _context.Descuentos
                                                           join valorRuleta in _context.ValorRuleta
                                                           on descuentos.IdValorRuleta equals valorRuleta.IdValorRuleta
                                                           join porcentR in _context.PorcentajesRuleta
                                                           on descuentos.IdPorcentajeRuleta equals porcentR.IdPorcentajeRuleta
                                                           where descuentos.IdUsuario == IdUsuario
                                                           select new DetalleDescuentos
                                                           {
                                                               IdDescuento = descuentos.IdDescuento,
                                                               PorcentajeDescuento = porcentR.Porcentaje,
                                                               ValorDeRuleta = valorRuleta.ValorDeRuleta,
                                                               IdPorcentajeRuleta = descuentos.IdPorcentajeRuleta,
                                                               IdValorRuleta = descuentos.IdValorRuleta,
                                                               IdUsuario = descuentos.IdUsuario,
                                                               Fecha = descuentos.Fecha,
                                                               FechaVencimiento = descuentos.FechaVencimiento,
                                                               Estado = descuentos.Estado
                                                           }).ToList();
                return ListaDescuentos;
            }
        }


        public async Task<ValorRuleta> ObtenerValorRuletaActual()=>
        await _context.ValorRuleta.OrderByDescending(x => x.IdValorRuleta).FirstAsync();


        public async Task RegistrarCuponDescuento(Descuentos descuento)
        {
            
            descuento.FechaVencimiento= descuento.FechaVencimiento.AddMonths(1);
            _context.Descuentos.Add(descuento);
            await _context.SaveChangesAsync();
        }
        public async Task EditarPuntosUsuario(string idUsuario)
        {
             UsuarioIdentity usuario=  await _context.Usuarioidentity.FindAsync(idUsuario);
             usuario.Puntos -= this.ObtenerValorRuletaActual().Result.ValorDeRuleta; 
            _context.Usuarioidentity.Update(usuario);
            await _context.SaveChangesAsync();
        }

        public async Task AgregarPuntuacionNueva(ValorRuleta valorRuleta)
        {
            _context.ValorRuleta.Add(valorRuleta);
            await _context.SaveChangesAsync();
        }
        public async Task EditarValorRuleta(DateTime nueva)
        {
            ValorRuleta valor= await _context.ValorRuleta.OrderByDescending(x => x.IdValorRuleta).FirstAsync();
            valor.FechaFin = nueva;
            _context.ValorRuleta.Update(valor);
            await _context.SaveChangesAsync();
        }
        public async Task AgregarPorcentajeRuleta(PorcentajesRuleta porcentaje)
        {
            _context.PorcentajesRuleta.Add(porcentaje);
            await _context.SaveChangesAsync();
        }

        public async Task EditarPorcentajeRuleta(PorcentajesRuleta porcentaje)
        {
            _context.PorcentajesRuleta.Update(porcentaje);
            await _context.SaveChangesAsync();
        }



    }
}
