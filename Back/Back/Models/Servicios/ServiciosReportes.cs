using Back.Clases.Productos;
using Back.Clases.Reportes;
using Back.Clases.Solicitudes.Perzonalizada;
using Back.Models.Abstratos;
using Back.Models.DAL;
using Back.Models.Entidades.Reportes;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Servicios
{
    public class ServiciosReportes : IServiciosReportes
    {
        private readonly DBContext _context;

        public ServiciosReportes(DBContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<ReporteSolicitudes>> ObtenerReporteSolicitudes()
        {



            await using (_context)
            {
                var a = from detalleEstado in _context.DetalleEstadosSolicitudPersonalizada
                        join estado in _context.Estados
                        on detalleEstado.IdEstado equals estado.IdEstado
                        where detalleEstado.FechaFin == new DateTime()
                        select new DetalleEstados
                        {
                            Estado = estado.Estado,
                            FechaFin = detalleEstado.FechaFin,
                            IdEstado = detalleEstado.IdEstado,
                            FechaInicio = detalleEstado.FechaInicio,
                            IdUsuario = detalleEstado.IdUsuario,
                            Aosciacion = detalleEstado.IdSolicitudPersonalizada
                        };


                return new ReporteSolicitudes
                {
                    Aceptada = (from estado in a
                                where estado.Estado == "Aceptada"
                                select estado).Count(),
                    Cancelada = (from estado in a
                                 where estado.Estado == "Cancelada"
                                 select estado).Count(),
                    Cotizada = (from estado in a
                                where estado.Estado == "Cotizada"
                                select estado).Count(),
                    Devuelta = (from estado in a
                                where estado.Estado == "Devuelta"
                                select estado).Count(),
                    EnProcesoDeCotizacion = (from estado in a
                                             where estado.Estado == "En Proceso De Cotizacion"
                                             select estado).Count(),
                    EnProcesoDeFabricacion = (from estado in a
                                              where estado.Estado == "En Proceso De Fabricacion"
                                              select estado).Count(),
                    Enviada = (from estado in a
                               where estado.Estado == "Enviada"
                               select estado).Count(),
                    Modificada = (from estado in a
                                  where estado.Estado == "Modificada"
                                  select estado).Count(),
                    Pagada = (from estado in a
                              where estado.Estado == "Pagada"
                              select estado).Count(),
                    Rechazada = (from estado in a
                                 where estado.Estado == "Rechazada"
                                 select estado).Count(),
                    Terminada = (from estado in a
                                 where estado.Estado == "Terminada"
                                 select estado).Count(),
                    TotalSolicitudes = (from estado in a
                                        select estado).Count(),
                    TotalVendido = (from solicitud in (from solicitud in (from solicitud in _context.SolicitudPersonalizada.AsEnumerable()
                                                                          join estado in a.AsEnumerable()
                                                                         on solicitud.IdSolicitudPersonalizada equals estado.Aosciacion
                                                                          where estado.IdEstado == 6
                                                                          select solicitud)
                                                       select new SolicitudPersonalizadaDetalle
                                                       {
                                                           Fecha = solicitud.Fecha,
                                                           IdSolicitudPersonalizada = solicitud.IdSolicitudPersonalizada,
                                                           ValorTotal = (from valor in (from detalle in _context.DetalleProductosSolicitud.AsEnumerable()
                                                                                        join producto in (from producto in _context.Productos.AsEnumerable()
                                                                                                          join precioProducto in _context.PrecioProductos.AsEnumerable()
                                                                                                          on producto.IdProducto equals precioProducto.IdProducto
                                                                                                          where precioProducto.FechaFin == new DateTime()
                                                                                                          select new DetalleProducto
                                                                                                          {
                                                                                                              IdProducto = producto.IdProducto,
                                                                                                              Precio = precioProducto.Precio,
                                                                                                              CantidadStock = (from entrada in _context.Entradas.AsEnumerable()
                                                                                                                               where entrada.IdProducto == producto.IdProducto
                                                                                                                               select entrada.Cantidad).Sum()
                                                                                                          })
                                                                                        on detalle.IdProducto equals producto.IdProducto
                                                                                        select new DeTalleProductoSolicitudVT
                                                                                        {
                                                                                            IdProducto = producto.IdProducto,
                                                                                            CantidadStock = producto.CantidadStock,
                                                                                            Precio = producto.Precio,
                                                                                            IdSolicitud = detalle.IdSolicitudPersonalizada,
                                                                                            Vt = producto.CantidadStock * producto.Precio
                                                                                        }).AsEnumerable()
                                                                         where valor.IdSolicitud == solicitud.IdSolicitudPersonalizada
                                                                         select valor.Vt).Sum()
                                                       })
                                    select solicitud.ValorTotal).Sum(),
                    TotalCotizado = (from valor in (from detalle in _context.DetalleProductosSolicitud
                                                    join producto in (from producto in _context.Productos
                                                                      join precioProducto in _context.PrecioProductos
                                                                      on producto.IdProducto equals precioProducto.IdProducto
                                                                      where precioProducto.FechaFin == new DateTime()
                                                                      select new DetalleProducto
                                                                      {
                                                                          IdProducto = producto.IdProducto,
                                                                          Precio = precioProducto.Precio,
                                                                          CantidadStock = (from entrada in _context.Entradas
                                                                                           where entrada.IdProducto == producto.IdProducto
                                                                                           select entrada.Cantidad).Sum()
                                                                      })
                                                    on detalle.IdProducto equals producto.IdProducto
                                                    select new DeTalleProductoSolicitudVT
                                                    {
                                                        IdProducto = producto.IdProducto,
                                                        CantidadStock = producto.CantidadStock,
                                                        Precio = producto.Precio,
                                                        IdSolicitud = detalle.IdSolicitudPersonalizada,
                                                        Vt = producto.CantidadStock * producto.Precio
                                                    }).AsEnumerable()
                                     select valor.Vt).Sum()

                };
            }
        }

        public async Task<ActionResult<IEnumerable<ReporteVentas>>> ObtenerReporteVentas()
        {
            await using (_context)
            {
                return null;
            }
        }
    }
}
