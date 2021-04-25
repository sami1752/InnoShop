using Back.Clases.Solicitudes.CarritoDeCompras;
using Back.Clases.Solicitudes.Perzonalizada;
using Back.Models.Abstratos;
using Back.Models.DAL;
using Back.Models.Entidades.Productos;
using Back.Models.Entidades.Solicitudes;
using Back.Models.Entidades.Solicitudes.Personalizadas;
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

        public async Task<ActionResult<IEnumerable<CarritoDeCompras>>> ListarCarritoDeCompras() =>
            await _context.CarritoDeCompras.ToListAsync();

        public async Task<CarritoDeCompras> BuscarCarritoDeComprasPorIdUsuario(string id)
        {
            await using (_context)
            {
                List<CarritoDeCompras> Carrito = (from carrito in _context.CarritoDeCompras
                                                  where carrito.IdUsuario == id && carrito.Estado == false
                                                  select carrito).ToList();
                return Carrito[0];
            }
        }
        public async Task<CarritoDeCompras> BuscarCarritoDeComprasPorId(int id) => await _context.CarritoDeCompras.FindAsync(id);

        public async Task<CarritoDeCompras> AgregarCarritoDeCompras(CarritoDeCompras carritoDeCompras)
        {
            carritoDeCompras.Fecha = DateTime.Now;
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



        public async Task<ActionResult<IEnumerable<DetalleCarritoDeComprasProducto>>> ListarDetalleCarritoDeCompras(string idUsuario)
        {
            await using (_context)
            {
                List<DetalleCarritoDeComprasProducto> listaDetalleCarrito = (from productos in _context.Productos
                                                                             join detalleCarrito in _context.DetalleCarritoDeCompras
                                                                             on productos.IdProducto equals detalleCarrito.IdProducto
                                                                             join carrito in _context.CarritoDeCompras
                                                                             on detalleCarrito.IdCarritoDeCompras equals carrito.IdCarritoDeCompras
                                                                             where carrito.IdUsuario == idUsuario && carrito.Estado == false

                                                                             select new DetalleCarritoDeComprasProducto()
                                                                             {
                                                                                 IdDetalleCarritoDeCompras = detalleCarrito.IdDetalleCarritoDeCompras,
                                                                                 IdCarritoDeCompras = detalleCarrito.IdCarritoDeCompras,
                                                                                 IdProducto = detalleCarrito.IdProducto,
                                                                                 NombreProducto = productos.Nombre,
                                                                                 IdUsuario = detalleCarrito.IdUsuario,
                                                                                 Cantidad = detalleCarrito.Cantidad
                                                                             }).ToList();
                return listaDetalleCarrito;
            }
        }


        public async Task<DetalleCarritoDeCompras> BuscarDetalleCarritoDeComprasPorId(int id) =>
            await _context.DetalleCarritoDeCompras.FindAsync(id);

        public async Task<DetalleCarritoDeCompras> AgregarDetalleCarritoDeCompras
            (DetalleCarritoDeCompras detalleCarritoDeCompras)
        {

            _context.DetalleCarritoDeCompras.Add(detalleCarritoDeCompras);
            await _context.SaveChangesAsync();
            return detalleCarritoDeCompras;
        }

        public async Task<int> CantidadDetalleCarritoAnterior(int IdDetalleCarritoDeCompras)
        {
            var detalleAnterior = await _context.DetalleCarritoDeCompras.FindAsync(IdDetalleCarritoDeCompras);
            return detalleAnterior.Cantidad;
        }

        public async Task EditarDetalleCarritoDeCompras
            (DetalleCarritoDeCompras detalleCarritoDeCompras)
        {
            _context.DetalleCarritoDeCompras.Update(detalleCarritoDeCompras);
            await _context.SaveChangesAsync();
        }

        //--------
        public async Task<DetalleEstadosMontajes> AgregarDetalleEstadosMontajes
            (DetalleEstadosMontajes DetalleEstadosMontajes)
        {
            _context.DetalleEstadosMontajes.Add(DetalleEstadosMontajes);
            await _context.SaveChangesAsync();
            return DetalleEstadosMontajes;
        }

        public async Task<ActionResult<IEnumerable<DetalleEstadosMontajes>>> ListarDetalleEstadosMontajes() =>
            await _context.DetalleEstadosMontajes.ToListAsync();

        public async Task<ActionResult<IEnumerable<DetalleEstadosMontajes>>> ListaDetalleEstadosMontajes(int id) =>
            await _context.DetalleEstadosMontajes.Where(x => x.IdDetalleEstadosMontajes == id).ToListAsync();


        public async Task<DetalleEstadosProductosPersoanlizados> AgregarDetalleEstadosProductosPersoanlizados
            (DetalleEstadosProductosPersoanlizados DetalleEstadosProductosPersoanlizados)
        {
            _context.DetalleEstadosProductosPersoanlizados.Add(DetalleEstadosProductosPersoanlizados);
            await _context.SaveChangesAsync();
            return DetalleEstadosProductosPersoanlizados;
        }

        public async Task<ActionResult<IEnumerable<DetalleEstadosProductosPersoanlizados>>>
            ListarDetalleEstadosProductosPersoanlizados() =>
            await _context.DetalleEstadosProductosPersoanlizados.ToListAsync();

        public async Task<ActionResult<IEnumerable<DetalleEstadosProductosPersoanlizados>>>
            ListaDetalleEstadosProductosPersoanlizados(int id) =>
            await _context.DetalleEstadosProductosPersoanlizados.Where(x =>
            x.IdDetalleEstadosProductosPersoanlizados == id).ToListAsync();

        public async Task<DetalleEstadosSolicitudPersonalizada> AgregarDetalleEstadosSolicitudPersonalizada
            (DetalleEstadosSolicitudPersonalizada DetalleEstadosSolicitudPersonalizada)
        {
            _context.DetalleEstadosSolicitudPersonalizada.Add(DetalleEstadosSolicitudPersonalizada);
            await _context.SaveChangesAsync();
            return DetalleEstadosSolicitudPersonalizada;
        }

        public async Task<ActionResult<IEnumerable<DetalleEstadosSolicitudPersonalizada>>>
            ListarDetalleEstadosSolicitudPersonalizada() =>
            await _context.DetalleEstadosSolicitudPersonalizada.ToListAsync();

        public async Task<ActionResult<IEnumerable<DetalleEstadosSolicitudPersonalizada>>>
            ListaDetalleEstadosSolicitudPersonalizada(int id) =>
            await _context.DetalleEstadosSolicitudPersonalizada.Where(x =>
            x.IdDetalleEstadoSolicitudPersonalizada == id).ToListAsync();

        public async Task<DetalleProductosSolicitud> AgregarDetalleProductosSolicitud
            (DetalleProductosSolicitud DetalleProductosSolicitud)
        {
            _context.DetalleProductosSolicitud.Add(DetalleProductosSolicitud);
            await _context.SaveChangesAsync();
            return DetalleProductosSolicitud;
        }

        public async Task<ActionResult<IEnumerable<DetalleProductosSolicitud>>> ListarDetalleProductosSolicitud() =>
            await _context.DetalleProductosSolicitud.ToListAsync();

        public async Task<ActionResult<IEnumerable<DetalleProductosSolicitud>>> ListaDetalleProductosSolicitud(int id) =>
            await _context.DetalleProductosSolicitud.Where(x => x.IdDetalleProductosSolicitud == id).ToListAsync();

        public async Task EliminarDetalleProductosSolicitud(int id)
        {
            DetalleProductosSolicitud DetalleProductosSolicitud = await _context.DetalleProductosSolicitud.FindAsync(id);
            _context.DetalleProductosSolicitud.Remove(DetalleProductosSolicitud);
            await _context.SaveChangesAsync();
        }

        public async Task<DetallesMaterialesMontajes> AgregarDetallesMaterialesMontajes
            (DetallesMaterialesMontajes DetallesMaterialesMontajes)
        {
            _context.DetallesMaterialesMontajes.Add(DetallesMaterialesMontajes);
            await _context.SaveChangesAsync();
            return DetallesMaterialesMontajes;
        }

        public async Task<ActionResult<IEnumerable<DetallesMaterialesMontajes>>> ListarDetallesMaterialesMontajes() =>
            await _context.DetallesMaterialesMontajes.ToListAsync();

        public async Task<ActionResult<IEnumerable<DetallesMaterialesMontajes>>> ListaDetallesMaterialesMontajes(int id) =>
            await _context.DetallesMaterialesMontajes.Where(x => x.IdDetallesMaterialesMontajes == id).ToListAsync();

        public async Task EliminarDetallesMaterialesMontajes(int id)
        {
            DetallesMaterialesMontajes DetallesMaterialesMontajes =
                await _context.DetallesMaterialesMontajes.FindAsync(id);
            _context.DetallesMaterialesMontajes.Remove(DetallesMaterialesMontajes);
            await _context.SaveChangesAsync();
        }

        public async Task<DetallesMaterialesSolicitudesPersonalizadas> AgregarDetallesMaterialesSolicitudesPersonalizadas
            (DetallesMaterialesSolicitudesPersonalizadas DetallesMaterialesSolicitudesPersonalizadas)
        {
            _context.DetallesMaterialesSolicitudesPersonalizadas.Add(DetallesMaterialesSolicitudesPersonalizadas);
            await _context.SaveChangesAsync();
            return DetallesMaterialesSolicitudesPersonalizadas;
        }

        public async Task<ActionResult<IEnumerable<DetallesMaterialesSolicitudesPersonalizadas>>>
            ListarDetallesMaterialesSolicitudesPersonalizadas() =>
            await _context.DetallesMaterialesSolicitudesPersonalizadas.ToListAsync();

        public async Task<ActionResult<IEnumerable<DetallesMaterialesSolicitudesPersonalizadas>>>
            ListaDetallesMaterialesSolicitudesPersonalizadas(int id) =>
            await _context.DetallesMaterialesSolicitudesPersonalizadas.Where(x =>
            x.IdDetallesMaterialesSolicitudesPersonalizadas == id).ToListAsync();

        public async Task EliminarDetallesMaterialesSolicitudesPersonalizadas(int id)
        {
            DetallesMaterialesSolicitudesPersonalizadas DetallesMaterialesSolicitudesPersonalizadas =
                await _context.DetallesMaterialesSolicitudesPersonalizadas.FindAsync(id);
            _context.DetallesMaterialesSolicitudesPersonalizadas.Remove(DetallesMaterialesSolicitudesPersonalizadas);
            await _context.SaveChangesAsync();
        }

        public async Task<DetallesProductosMontajes> AgregarDetallesProductosMontajes
            (DetallesProductosMontajes DetallesProductosMontajes)
        {
            _context.DetallesProductosMontajes.Add(DetallesProductosMontajes);
            await _context.SaveChangesAsync();
            return DetallesProductosMontajes;
        }

        public async Task<ActionResult<IEnumerable<DetallesProductosMontajes>>> ListarDetallesProductosMontajes() =>
            await _context.DetallesProductosMontajes.ToListAsync();

        public async Task<ActionResult<IEnumerable<DetallesProductosMontajes>>> ListaDetallesProductosMontajes(int id) =>
            await _context.DetallesProductosMontajes.Where(x => x.IdDetallesProductosMontajes == id).ToListAsync();

        public async Task EliminarDetallesProductosMontajes(int id)
        {
            DetallesProductosMontajes DetallesProductosMontajes = await _context.DetallesProductosMontajes.FindAsync(id);
            _context.DetallesProductosMontajes.Remove(DetallesProductosMontajes);
            await _context.SaveChangesAsync();
        }

        public async Task<ActionResult<IEnumerable<Montajes>>> ListarMontajes() => await _context.Montajes.ToListAsync();
        public async Task<ActionResult<IEnumerable<Montajes>>> ListarMisMontajes(string id) =>
            await _context.Montajes.Where(x => x.IdUsuario == id).ToListAsync();

        public async Task<Montajes> BuscarMontajes(int id) => await _context.Montajes.FindAsync(id);

        public async Task<Montajes> AgregarMontajes(Montajes Montajes)
        {
            _context.Montajes.Add(Montajes);
            await _context.SaveChangesAsync();
            return Montajes;
        }

        public async Task<Montajes> EditarMontajes(Montajes Montajes)
        {
            _context.Montajes.Update(Montajes);
            await _context.SaveChangesAsync();
            return Montajes;
        }

        public async Task<PrecioMontajes> AgregarPrecioMontajes(PrecioMontajes PrecioMontajes)
        {
            _context.PrecioMontajes.Add(PrecioMontajes);
            await _context.SaveChangesAsync();
            return PrecioMontajes;
        }

        public async Task<ActionResult<IEnumerable<PrecioMontajes>>> ListarPrecioMontajes() =>
            await _context.PrecioMontajes.ToListAsync();

        public async Task<ActionResult<IEnumerable<PrecioMontajes>>> ListaPrecioMontajes(int id) =>
            await _context.PrecioMontajes.Where(x => x.IdMontaje == id).ToListAsync();

        public async Task<RespuestasSolicitudesPersonalizadas> AgregarRespuestasSolicitudesPersonalizadas
            (RespuestasSolicitudesPersonalizadas RespuestasSolicitudesPersonalizadas)
        {
            _context.RespuestasSolicitudesPersonalizadas.Add(RespuestasSolicitudesPersonalizadas);
            await _context.SaveChangesAsync();
            return RespuestasSolicitudesPersonalizadas;
        }

        public async Task<ActionResult<IEnumerable<RespuestasSolicitudesPersonalizadas>>>
            ListaRespuestasSolicitudesPersonalizadas(int id) =>
            await _context.RespuestasSolicitudesPersonalizadas.Where(x =>
            x.IdRespuestaSolicitudesPersonalizadas == id).ToListAsync();

        public async Task<ActionResult<IEnumerable<SolicitudPersonalizadaDetalle>>> ListarSolicitudPersonalizada()
        {
            var DetalleestadosSolicitudes = (from detalle in _context.DetalleEstadosSolicitudPersonalizada
                                             where detalle.FechaFin == new DateTime()
                                             select new DetalleEstadosSolicitudPersonalizada
                                             {
                                                 FechaFin = detalle.FechaFin,
                                                 FechaInicio = detalle.FechaInicio,
                                                 IdDetalleEstadoSolicitudPersonalizada = detalle.IdDetalleEstadoSolicitudPersonalizada,
                                                 IdEstado = detalle.IdEstado,
                                                 IdSolicitudPersonalizada = detalle.IdSolicitudPersonalizada,
                                                 IdUsuario = detalle.IdUsuario
                                             });
            var solicitudes = _context.SolicitudPersonalizada;
            var estados = _context.Estados;
            return await (from solicitud in solicitudes
                          join detalle in DetalleestadosSolicitudes
                          on solicitud.IdSolicitudPersonalizada equals detalle.IdSolicitudPersonalizada
                          join estado in estados
                          on detalle.IdEstado equals estado.IdEstado
                          select new SolicitudPersonalizadaDetalle
                          {
                              Alto = solicitud.Alto,
                              Ancho = solicitud.Ancho,
                              Descripcion = solicitud.Descripcion,
                              Estado = estado.Estado,
                              Fecha = solicitud.Fecha,
                              Fondo = solicitud.Fondo,
                              IdSolicitudPersonalizada = solicitud.IdSolicitudPersonalizada,
                              IdUsuario = solicitud.IdUsuario,
                              ValorTotal = solicitud.ValorTotal
                          }).ToListAsync(); ;
        }

        public async Task<ActionResult<IEnumerable<SolicitudPersonalizadaDetalle>>> ListarMisSolicitudPersonalizada(string id)
        {
            var DetalleestadosSolicitudes = (from detalle in _context.DetalleEstadosSolicitudPersonalizada
                                             where detalle.FechaFin == new DateTime()
                                             select new DetalleEstadosSolicitudPersonalizada
                                             {
                                                 FechaFin = detalle.FechaFin,
                                                 FechaInicio = detalle.FechaInicio,
                                                 IdDetalleEstadoSolicitudPersonalizada = detalle.IdDetalleEstadoSolicitudPersonalizada,
                                                 IdEstado = detalle.IdEstado,
                                                 IdSolicitudPersonalizada = detalle.IdSolicitudPersonalizada,
                                                 IdUsuario = detalle.IdUsuario
                                             });
            var solicitudes = _context.SolicitudPersonalizada;
            var estados = _context.Estados;
            return await (from solicitud in solicitudes
                          join detalle in DetalleestadosSolicitudes
                          on solicitud.IdSolicitudPersonalizada equals detalle.IdSolicitudPersonalizada
                          join estado in estados
                          on detalle.IdEstado equals estado.IdEstado
                          where solicitud.IdUsuario == id
                          select new SolicitudPersonalizadaDetalle
                          {
                              Alto = solicitud.Alto,
                              Ancho = solicitud.Ancho,
                              Descripcion = solicitud.Descripcion,
                              Estado = estado.Estado,
                              Fecha = solicitud.Fecha,
                              Fondo = solicitud.Fondo,
                              IdSolicitudPersonalizada = solicitud.IdSolicitudPersonalizada,
                              IdUsuario = solicitud.IdUsuario,
                              ValorTotal = solicitud.ValorTotal
                          }).ToListAsync();
        }

        public SolicitudPersonalizadaDetalle BuscarSolicitudPersonalizada(int id)
        {
            var DetalleestadosSolicitudes = (from detalle in _context.DetalleEstadosSolicitudPersonalizada
                                             where detalle.FechaFin == new DateTime()
                                             select new DetalleEstadosSolicitudPersonalizada
                                             {
                                                 FechaFin = detalle.FechaFin,
                                                 FechaInicio = detalle.FechaInicio,
                                                 IdDetalleEstadoSolicitudPersonalizada = detalle.IdDetalleEstadoSolicitudPersonalizada,
                                                 IdEstado = detalle.IdEstado,
                                                 IdSolicitudPersonalizada = detalle.IdSolicitudPersonalizada,
                                                 IdUsuario = detalle.IdUsuario
                                             });
            var solicitudes = _context.SolicitudPersonalizada;
            var estados = _context.Estados;
            var usuarios = _context.Usuarioidentity;

            return (from solicitud in solicitudes
                    join detalle in DetalleestadosSolicitudes
                    on solicitud.IdSolicitudPersonalizada equals detalle.IdSolicitudPersonalizada
                    join estado in estados
                    on detalle.IdEstado equals estado.IdEstado
                    join usuario in usuarios
                    on detalle.IdUsuario equals usuario.Id
                    where solicitud.IdSolicitudPersonalizada == id
                    select new SolicitudPersonalizadaDetalle
                    {
                        Alto = solicitud.Alto,
                        Ancho = solicitud.Ancho,
                        Descripcion = solicitud.Descripcion,
                        Estado = estado.Estado,
                        Fecha = solicitud.Fecha,
                        Fondo = solicitud.Fondo,
                        IdSolicitudPersonalizada = solicitud.IdSolicitudPersonalizada,
                        IdUsuario = solicitud.IdUsuario,
                        ValorTotal = solicitud.ValorTotal,
                        Usuario = usuario.Nombres + " " + usuario.Apellidos
                    }).ToList()[0];
        }


        public async Task<SolicitudPersonalizada> AgregarSolicitudPersonalizada(SolicitudPersonalizada SolicitudPersonalizada)
        {
            _context.SolicitudPersonalizada.Add(SolicitudPersonalizada);
            await _context.SaveChangesAsync();
            await AgregarDetalleEstadosSolicitudPersonalizada(new DetalleEstadosSolicitudPersonalizada
            {
                IdUsuario = SolicitudPersonalizada.IdUsuario,
                IdSolicitudPersonalizada = SolicitudPersonalizada.IdSolicitudPersonalizada,
                FechaFin = new DateTime(),
                FechaInicio = DateTime.Now,
                IdEstado = 1
            });
            return SolicitudPersonalizada;
        }

        public async Task<SolicitudPersonalizada> EditarSolicitudPersonalizada(SolicitudPersonalizada SolicitudPersonalizada)
        {
            _context.SolicitudPersonalizada.Update(SolicitudPersonalizada);
            await _context.SaveChangesAsync();
            await ModificarEstado(DateTime.Now, SolicitudPersonalizada.IdSolicitudPersonalizada);
            await AgregarDetalleEstadosSolicitudPersonalizada(new DetalleEstadosSolicitudPersonalizada
            {
                IdUsuario = SolicitudPersonalizada.IdUsuario,
                IdSolicitudPersonalizada = SolicitudPersonalizada.IdSolicitudPersonalizada,
                FechaFin = new DateTime(),
                FechaInicio = DateTime.Now,
                IdEstado = 9
            });
            return SolicitudPersonalizada;
        }

        public async Task ModificarEstado(DateTime nueva, int id)
        {
            var estados = (from Estado in _context.DetalleEstadosSolicitudPersonalizada
                           orderby Estado.IdDetalleEstadoSolicitudPersonalizada descending
                           where Estado.IdSolicitudPersonalizada == id
                           select new DetalleEstadosSolicitudPersonalizada
                           {
                               IdDetalleEstadoSolicitudPersonalizada = Estado.IdDetalleEstadoSolicitudPersonalizada,
                               FechaFin = Estado.FechaFin,
                               FechaInicio = Estado.FechaInicio,
                               IdUsuario = Estado.IdUsuario,
                               IdSolicitudPersonalizada = Estado.IdSolicitudPersonalizada,
                               IdEstado = Estado.IdEstado
                           }).ToList();
            estados[0].FechaFin = nueva;
            _context.DetalleEstadosSolicitudPersonalizada.Update(estados[0]);
            await _context.SaveChangesAsync();
        }


        public async Task<List<CarritoDeCompras>> ExisteCarritoUsuarioPorId(string id)
        {
            await using (_context)
            {
                List<CarritoDeCompras> carritoAsociado = (from carrito in _context.CarritoDeCompras
                                                          where carrito.IdUsuario == id && carrito.Estado == false
                                                          select carrito).ToList();
                return carritoAsociado;
            }

        }
        public async Task EliminarDetalleCarrito(int idDetalle)
        {
            var detalle = await _context.DetalleCarritoDeCompras.FindAsync(idDetalle);
            _context.DetalleCarritoDeCompras.Remove(detalle);
            await _context.SaveChangesAsync();
        }

        public async Task<PrecioProducto> PrecioDelProducto(int idProducto)
        {
            var listaPrecios = await _context.PrecioProductos.Where(x => x.IdProducto == idProducto).ToListAsync();
            return listaPrecios[listaPrecios.Count() - 1];
        }
    }
}
