using Back.Models.Abstratos;
using Back.Models.DAL;
using Back.Models.Entidades.Solicitudes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Servicios
{
    public class ServiciosSolicitudes : IServiciosSolicitudes
    {
        private readonly DBContext _context;

        public ServiciosSolicitudes(DBContext context) => _context = context;

        public async Task<ActionResult<IEnumerable<CarritoDeCompras>>> ListarCarritoDeCompras() => await _context.CarritoDeCompras.ToListAsync();

        public async Task<CarritoDeCompras> BuscarCarritoDeComprasPorId(int id) => await _context.CarritoDeCompras.FindAsync(id);

        public async Task<CarritoDeCompras> AgregarCarritoDeCompras(CarritoDeCompras carritoDeCompras)
        {
            _context.CarritoDeCompras.Add(carritoDeCompras);
            await _context.SaveChangesAsync();
            return carritoDeCompras;
        }

        public async Task<CarritoDeCompras> EditarCarritoDeCompras(CarritoDeCompras carritoDeCompras)
        {
            _context.CarritoDeCompras.Update(carritoDeCompras);
            await _context.SaveChangesAsync();
            return carritoDeCompras;
        }

        public async Task<ActionResult<IEnumerable<DetalleCarritoDeCompras>>> ListarDetalleCarritoDeCompras() => await _context.DetalleCarritoDeCompras.ToListAsync();

        public async Task<DetalleCarritoDeCompras> BuscarDetalleCarritoDeComprasPorId(int id) => await _context.DetalleCarritoDeCompras.FindAsync(id);

        public async Task<DetalleCarritoDeCompras> AgregarDetalleCarritoDeCompras(DetalleCarritoDeCompras detalleCarritoDeCompras)
        {
            _context.DetalleCarritoDeCompras.Add(detalleCarritoDeCompras);
            await _context.SaveChangesAsync();
            return detalleCarritoDeCompras;
        }

        public async Task<DetalleCarritoDeCompras> EditarDetalleCarritoDeCompras(DetalleCarritoDeCompras detalleCarritoDeCompras)
        {
            _context.DetalleCarritoDeCompras.Update(detalleCarritoDeCompras);
            await _context.SaveChangesAsync();
            return detalleCarritoDeCompras;
        }
    }
}
