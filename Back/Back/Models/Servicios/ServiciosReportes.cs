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

        public async Task<ActionResult<ReporteSolicitudes>> ObtenerReporteSolicitudes(DateTime desde, DateTime hasta)
        {
            await using (_context)
            {
                if (hasta == new DateTime())
                    hasta = DateTime.Now.AddDays(1);
                var ab = (from detalleEstado in (from detalleEstado in _context.DetalleEstadosSolicitudPersonalizada.ToList()
                                                 join estado in _context.Estados.ToList()
                                                 on detalleEstado.IdEstado equals estado.IdEstado
                                                 select new DetalleEstados
                                                 {
                                                     Estado = estado.Estado,
                                                     FechaFin = detalleEstado.FechaFin != new DateTime() ? detalleEstado.FechaFin : DateTime.Now,
                                                     IdEstado = detalleEstado.IdEstado,
                                                     FechaInicio = detalleEstado.FechaInicio,
                                                     IdUsuario = detalleEstado.IdUsuario,
                                                     Aosciacion = detalleEstado.IdSolicitudPersonalizada
                                                 }).ToList()
                          where desde <= detalleEstado.FechaInicio && hasta >=
                        detalleEstado.FechaFin
                          select detalleEstado).ToList();
                List<DetalleEstados> a = new();
                List<int> Asociaciones = new List<int>();
                for (int i = 0; i < ab.Count; i++)
                    if (!Asociaciones.Contains(ab[i].Aosciacion))
                        Asociaciones.Add(ab[i].Aosciacion);
                for (int i = 0; i < Asociaciones.Count; i++)
                    a.Add((from detalleEstados in ab.ToList()
                           where detalleEstados.FechaFin == (from detalle in ab.ToList()
                                                             where detalle.Aosciacion == Asociaciones[i]
                                                             select detalle.FechaFin).Max()
                           select new DetalleEstados
                           {
                               FechaFin = detalleEstados.FechaFin,
                               Aosciacion = detalleEstados.Aosciacion,
                               Estado = detalleEstados.Estado,
                               FechaInicio = detalleEstados.FechaInicio,
                               IdEstado = detalleEstados.IdEstado,
                               IdUsuario = detalleEstados.IdUsuario
                           }).ToList()[0]);

                return new ReporteSolicitudes
                {
                    Entregada= (from estado in a.ToList()
                                where estado.Estado == "Entregada"
                                select estado).Count(),
                    Aceptada = (from estado in a.ToList()
                                where estado.Estado == "Aceptada"
                                select estado).Count(),
                    Cancelada = (from estado in a.ToList()
                                 where estado.Estado == "Cancelada"
                                 select estado).Count(),
                    Cotizada = (from estado in a.ToList()
                                where estado.Estado == "Cotizada"
                                select estado).Count(),
                    Devuelta = (from estado in a.ToList()
                                where estado.Estado == "Devuelta"
                                select estado).Count(),
                    EnProcesoDeCotizacion = (from estado in a.ToList()
                                             where estado.Estado == "En proceso de cotizacion"
                                             select estado).Count(),
                    EnProcesoDeFabricacion = (from estado in a.ToList()
                                              where estado.Estado == "En Proceso De Fabricacion"
                                              select estado).Count(),
                    Enviada = (from estado in a.ToList()
                               where estado.Estado == "Enviada"
                               select estado).Count(),
                    Modificada = (from estado in a.ToList()
                                  where estado.Estado == "Modificada"
                                  select estado).Count(),
                    Pagada = (from estado in a.ToList()
                              where estado.Estado == "Pagada"
                              select estado).Count(),
                    Rechazada = (from estado in a.ToList()
                                 where estado.Estado == "Rechazada"
                                 select estado).Count(),
                    Terminada = (from estado in a.ToList()
                                 where estado.Estado == "Terminada"
                                 select estado).Count(),
                    TotalSolicitudes = (from estado in a.ToList()
                                        select estado).Count(),
                    TotalVendido = (from solicitud in (from solicitud in (from solicitud in _context.SolicitudPersonalizada.AsEnumerable()
                                                                          join estado in a.AsEnumerable()
                                                                         on solicitud.IdSolicitudPersonalizada equals estado.Aosciacion
                                                                          where estado.IdEstado == 6 || estado.IdEstado == 7 || estado.IdEstado == 8 || estado.IdEstado == 12    
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
                };
            }
        }

        public async Task<ActionResult<ReporteMontaje>> ObtenerReporteMontajes(DateTime desde, DateTime hasta)
        {
            await using (_context)
            {
                if (hasta == new DateTime())
                    hasta = DateTime.Now.AddDays(1);
                var ab = (from detalleEstado in (from detalleEstado in _context.DetalleEstadosMontajes.ToList()
                                                 join estado in _context.Estados.ToList()
                                                 on detalleEstado.IdEstado equals estado.IdEstado
                                                 select new DetalleEstados
                                                 {
                                                     Estado = estado.Estado,
                                                     FechaFin = detalleEstado.FechaFin != new DateTime() ? detalleEstado.FechaFin : DateTime.Now,
                                                     IdEstado = detalleEstado.IdEstado,
                                                     FechaInicio = detalleEstado.FechaInicio,
                                                     IdUsuario = detalleEstado.IdUsuario,
                                                     Aosciacion = detalleEstado.IdMontaje
                                                 }).ToList()
                          where desde <= detalleEstado.FechaInicio && hasta >=
                        detalleEstado.FechaFin
                          select detalleEstado).ToList();
                List<DetalleEstados> a = new();
                List<int> Asociaciones = new List<int>();
                for (int i = 0; i < ab.Count; i++)
                    if (!Asociaciones.Contains(ab[i].Aosciacion))
                        Asociaciones.Add(ab[i].Aosciacion);
                for (int i = 0; i < Asociaciones.Count; i++)
                    a.Add((from detalleEstados in ab.ToList()
                           where detalleEstados.FechaFin == (from detalle in ab.ToList()
                                                             where detalle.Aosciacion == Asociaciones[i]
                                                             select detalle.FechaFin).Max()
                           select new DetalleEstados
                           {
                               FechaFin = detalleEstados.FechaFin,
                               Aosciacion = detalleEstados.Aosciacion,
                               Estado = detalleEstados.Estado,
                               FechaInicio = detalleEstados.FechaInicio,
                               IdEstado = detalleEstados.IdEstado,
                               IdUsuario = detalleEstados.IdUsuario
                           }).ToList()[0]);

                return new ReporteMontaje
                {
                    Entregada = (from estado in a.ToList()
                                 where estado.Estado == "Entregada"
                                 select estado).Count(),
                    Aceptada = (from estado in a.ToList()
                                where estado.Estado == "Aceptada"
                                select estado).Count(),
                    Cancelada = (from estado in a.ToList()
                                 where estado.Estado == "Cancelada"
                                 select estado).Count(),
                    Cotizada = (from estado in a.ToList()
                                where estado.Estado == "Cotizada"
                                select estado).Count(),
                    Devuelta = (from estado in a.ToList()
                                where estado.Estado == "Devuelta"
                                select estado).Count(),
                    EnProcesoDeCotizacion = (from estado in a.ToList()
                                             where estado.Estado == "En proceso de cotizacion"
                                             select estado).Count(),
                    EnProcesoDeFabricacion = (from estado in a.ToList()
                                              where estado.Estado == "En Proceso De Fabricacion"
                                              select estado).Count(),
                    Enviada = (from estado in a.ToList()
                               where estado.Estado == "Enviada"
                               select estado).Count(),
                    Modificada = (from estado in a.ToList()
                                  where estado.Estado == "Modificada"
                                  select estado).Count(),
                    Pagada = (from estado in a.ToList()
                              where estado.Estado == "Pagada"
                              select estado).Count(),
                    Rechazada = (from estado in a.ToList()
                                 where estado.Estado == "Rechazada"
                                 select estado).Count(),
                    Terminada = (from estado in a.ToList()
                                 where estado.Estado == "Terminada"
                                 select estado).Count(),
                    TotalSolicitudes = (from estado in a.ToList()
                                        select estado).Count(),
                    TotalVendido = (from solicitud in (from solicitud in (from montaje in _context.Montajes.AsEnumerable()
                                                                          join estado in a.AsEnumerable()
                                                                         on montaje.IdMontaje equals estado.Aosciacion
                                                                          where estado.IdEstado == 6 || estado.IdEstado == 7 || estado.IdEstado == 8 || estado.IdEstado == 12
                                                                          select montaje)
                                                       select new MontajeDetalle
                                                       {
                                                           Fecha = solicitud.Fecha,
                                                           IdMontaje = solicitud.IdMontaje,
                                                           ValorTotal = (from valor in (from detalle in _context.DetallesProductosMontajes.AsEnumerable()
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
                                                                                        select new DeTalleProductoMontajeVT
                                                                                        {
                                                                                            IdProducto = producto.IdProducto,
                                                                                            CantidadStock = producto.CantidadStock,
                                                                                            Precio = producto.Precio,
                                                                                            IdMontaje = detalle.IdMontaje,
                                                                                            Vt = producto.CantidadStock * producto.Precio
                                                                                        }).AsEnumerable()
                                                                         where valor.IdMontaje == solicitud.IdMontaje
                                                                         select valor.Vt).Sum()
                                                       })
                                    select solicitud.ValorTotal).Sum(),
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
