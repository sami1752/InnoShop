using Back.Clases.Productos;
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
            (DetalleEstadosMontajes DetalleEstadosMontajes, bool nueva)
        {
            DetalleEstadosMontajes.FechaInicio = DateTime.Now;
            if (!nueva)
                await ModificarEstadoM(DetalleEstadosMontajes.FechaInicio, DetalleEstadosMontajes.IdMontaje);
            _context.DetalleEstadosMontajes.Add(DetalleEstadosMontajes);
            await _context.SaveChangesAsync();
            return DetalleEstadosMontajes;
        }



        public async Task<ActionResult<IEnumerable<DetalleEstadosMontajes>>> ListarDetalleEstadosMontajes() =>
            await _context.DetalleEstadosMontajes.ToListAsync();

        public async Task<ActionResult<IEnumerable<DetalleEstadosMontajes>>> ListaDetalleEstadosMontajes(int id) =>
            await _context.DetalleEstadosMontajes.Where(x => x.IdDetalleEstadosMontajes == id).ToListAsync();




        public async Task<DetalleEstadosSolicitudPersonalizada> AgregarDetalleEstadosSolicitudPersonalizada
            (DetalleEstadosSolicitudPersonalizada DetalleEstadosSolicitudPersonalizada, bool nueva)
        {
            DetalleEstadosSolicitudPersonalizada.FechaInicio = DateTime.Now;
            if (!nueva)
                await ModificarEstado(DetalleEstadosSolicitudPersonalizada.FechaInicio, DetalleEstadosSolicitudPersonalizada.IdSolicitudPersonalizada);
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

        public async Task<ActionResult<IEnumerable<DetalleProductosSolicitudDetalle>>> ListaDetalleProductosSolicitud(int id) {
            await using (_context)
            {
                return (from DetalleP in _context.DetalleProductosSolicitud.ToList()
                        join Producto in _context.Productos.ToList()
                        on DetalleP.IdProducto equals Producto.IdProducto
                        join Usuario in _context.Usuarioidentity
                        on DetalleP.IdUsuario equals Usuario.Id
                        where DetalleP.IdSolicitudPersonalizada == id
                        select new DetalleProductosSolicitudDetalle
                        {
                            IdDetalleProductosSolicitud = DetalleP.IdDetalleProductosSolicitud,
                            IdProducto = DetalleP.IdProducto,
                            Producto = Producto.Nombre,
                            IdSolicitudPersonalizada = DetalleP.IdSolicitudPersonalizada,
                            IdUsuario = DetalleP.IdUsuario,
                            Usuario = Usuario.Nombres + " " + Usuario.Apellidos
                        }).ToList();
            }

        }
           

        public async Task EliminarDetalleProductosSolicitud(int id)
        {
            DetalleProductosSolicitud DetalleProductosSolicitud = await _context.DetalleProductosSolicitud.FindAsync(id);
            _context.DetalleProductosSolicitud.Remove(DetalleProductosSolicitud);
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
            await _context.DetallesProductosMontajes.Where(x => x.IdMontaje == id).ToListAsync();


        public async Task EliminarDetallesProductosMontajes(int id)
        {
            DetallesProductosMontajes DetallesProductosMontajes = await _context.DetallesProductosMontajes.FindAsync(id);
            _context.DetallesProductosMontajes.Remove(DetallesProductosMontajes);
            await _context.SaveChangesAsync();
        }

        public async Task<ActionResult<IEnumerable<MontajeDetalle>>> ListarMontajes() {

            await using (_context)
            {
                return (from montaje in _context.Montajes.AsEnumerable()
                        join detalle in (from detalle in _context.DetalleEstadosMontajes
                                         where detalle.FechaFin == new DateTime()
                                         select new DetalleEstadosMontajes
                                         {
                                             
                                             FechaFin = detalle.FechaFin,
                                             FechaInicio = detalle.FechaInicio,
                                             IdDetalleEstadosMontajes = detalle.IdDetalleEstadosMontajes,
                                             IdEstado = detalle.IdEstado,
                                             IdMontaje = detalle.IdMontaje,
                                             IdUsuario = detalle.IdUsuario
                                         }).AsEnumerable()                 
                        on montaje.IdMontaje equals detalle.IdMontaje
                        join usuario in _context.Usuarioidentity
                        on montaje.IdUsuario equals usuario.Id
                        join estado in _context.Estados.AsEnumerable()
                        on detalle.IdEstado equals estado.IdEstado
                        orderby montaje.IdMontaje descending
                        select new MontajeDetalle
                        {
                            Alto = montaje.Alto,
                            Ancho = montaje.Ancho,
                            Descripcion = montaje.Descripcion,
                            Estado = estado.Estado,
                            Fecha = montaje.Fecha,
                            Fondo = montaje.Fondo,
                            Usuario=usuario.Nombres+" "+usuario.Apellidos,
                            IdMontaje = montaje.IdMontaje,
                            IdUsuario = montaje.IdUsuario,
                            Direccion = montaje.Direccion,
                            ValorTotal = (from valor in (from detalle in _context.DetallesProductosMontajes
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
                                                         select new DeTalleProductoMontajeVT
                                                         {
                                                             IdProducto = producto.IdProducto,
                                                             CantidadStock = producto.CantidadStock,
                                                             Precio = producto.Precio,
                                                             IdMontaje = detalle.IdMontaje,
                                                             Vt = producto.CantidadStock * producto.Precio
                                                         }).AsEnumerable()
                                          where valor.IdMontaje == montaje.IdMontaje
                                          select valor.Vt).Sum()
                        }).ToList();
            }
        }

        public async Task<ActionResult<IEnumerable<MontajeDetalle>>> ListarMisMontajes(string id)
        {

            await using (_context)
            {
                return (from montaje in (from montaje in _context.Montajes.AsEnumerable()
                                  join detalle in (from detalle in _context.DetalleEstadosMontajes
                                                   where detalle.FechaFin == new DateTime()
                                                   select new DetalleEstadosMontajes
                                                   {

                                                       FechaFin = detalle.FechaFin,
                                                       FechaInicio = detalle.FechaInicio,
                                                       IdDetalleEstadosMontajes = detalle.IdDetalleEstadosMontajes,
                                                       IdEstado = detalle.IdEstado,
                                                       IdMontaje = detalle.IdMontaje,
                                                       IdUsuario = detalle.IdUsuario
                                                   }).AsEnumerable()
                                      on montaje.IdMontaje equals detalle.IdMontaje
                                  join estado in _context.Estados.AsEnumerable()
                                  on detalle.IdEstado equals estado.IdEstado
                                  select new MontajeDetalle
                                  {
                                      Alto = montaje.Alto,
                                      Ancho = montaje.Ancho,
                                      Descripcion = montaje.Descripcion,
                                      Estado = estado.Estado,
                                      Fecha = montaje.Fecha,
                                      Fondo = montaje.Fondo,
                                      IdMontaje = montaje.IdMontaje,
                                      IdUsuario = montaje.IdUsuario,
                                      Direccion = montaje.Direccion,
                                      ValorTotal = (from valor in (from detalle in _context.DetallesProductosMontajes
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
                                                                   select new DeTalleProductoMontajeVT
                                                                   {
                                                                       IdProducto = producto.IdProducto,
                                                                       CantidadStock = producto.CantidadStock,
                                                                       Precio = producto.Precio,
                                                                       IdMontaje = detalle.IdMontaje,
                                                                       Vt = producto.CantidadStock * producto.Precio
                                                                   }).AsEnumerable()
                                                    where valor.IdMontaje == montaje.IdMontaje
                                                    select valor.Vt).Sum()
                                  }).ToList()
                 where montaje.IdUsuario == id
                 select montaje).ToList();

                 
            }
        }

        public async Task<MontajeDetalle> BuscarMontajes(int id) {
            await using (_context)
            {
                return (from montaje in (from montaje in _context.Montajes.AsEnumerable()
                                         join detalle in (from detalle in _context.DetalleEstadosMontajes
                                                          where detalle.FechaFin == new DateTime()
                                                          select new DetalleEstadosMontajes
                                                          {

                                                              FechaFin = detalle.FechaFin,
                                                              FechaInicio = detalle.FechaInicio,
                                                              IdDetalleEstadosMontajes = detalle.IdDetalleEstadosMontajes,
                                                              IdEstado = detalle.IdEstado,
                                                              IdMontaje = detalle.IdMontaje,
                                                              IdUsuario = detalle.IdUsuario
                                                          }).AsEnumerable()
                                             on montaje.IdMontaje equals detalle.IdMontaje
                                         join estado in _context.Estados.AsEnumerable()
                                         on detalle.IdEstado equals estado.IdEstado
                                         join usuario in _context.Usuarioidentity
                                         on montaje.IdUsuario equals usuario.Id
                                         select new MontajeDetalle
                                         {
                                             Alto = montaje.Alto,
                                             Ancho = montaje.Ancho,
                                             Descripcion = montaje.Descripcion,
                                             Estado = estado.Estado,
                                             Fecha = montaje.Fecha,
                                             Fondo = montaje.Fondo,
                                             IdMontaje = montaje.IdMontaje,
                                             IdUsuario = montaje.IdUsuario,
                                             Direccion = montaje.Direccion,
                                             Usuario= usuario.Nombres + " " + usuario.Apellidos,
                                             ValorTotal = (from valor in (from detalle in _context.DetallesProductosMontajes
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
                                                                          select new DeTalleProductoMontajeVT
                                                                          {
                                                                              IdProducto = producto.IdProducto,
                                                                              CantidadStock = producto.CantidadStock,
                                                                              Precio = producto.Precio,
                                                                              IdMontaje = detalle.IdMontaje,
                                                                              Vt = producto.CantidadStock * producto.Precio
                                                                          }).AsEnumerable()
                                                           where valor.IdMontaje == montaje.IdMontaje
                                                           select valor.Vt).Sum()
                                         }).ToList()
                        where montaje.IdMontaje == id
                        select montaje).ToList()[0];


            }
        }

        public async Task<Montajes> AgregarMontajes(Montajes Montajes)
        {
            Montajes.Fecha = DateTime.Now;
            _context.Montajes.Add(Montajes);
            await _context.SaveChangesAsync();
            await AgregarDetalleEstadosMontajes(new DetalleEstadosMontajes
            {
                IdUsuario = Montajes.IdUsuario,
                IdMontaje = Montajes.IdMontaje,
                FechaFin = new DateTime(),
                FechaInicio = DateTime.Now,
                IdEstado = 1
            }, true);
            return Montajes;
        }

        public async Task<Montajes> EditarMontajes(Montajes Montajes)
        {
            _context.Montajes.Update(Montajes);
            await _context.SaveChangesAsync();
            await AgregarDetalleEstadosMontajes(new DetalleEstadosMontajes
            {
                IdUsuario = Montajes.IdUsuario,
                IdMontaje = Montajes.IdMontaje,
                FechaFin = new DateTime(),
                FechaInicio = DateTime.Now,
                IdEstado = 9
            }, false);
            return Montajes;
        }

        public async Task<RespuestasSolicitudesPersonalizadas> AgregarRespuestasSolicitudesPersonalizadas
            (RespuestasSolicitudesPersonalizadas RespuestasSolicitudesPersonalizadas)
        {
            RespuestasSolicitudesPersonalizadas.Fecha = DateTime.Now;
            _context.RespuestasSolicitudesPersonalizadas.Add(RespuestasSolicitudesPersonalizadas);
            await _context.SaveChangesAsync();
            return RespuestasSolicitudesPersonalizadas;
        }

        public async Task<ActionResult<IEnumerable<DetalleRespuestasSolicitudP>>>
            ListaRespuestasSolicitudesPersonalizadas(int id)
        {

            return await (from respuestas in _context.RespuestasSolicitudesPersonalizadas
                          join usuario in _context.Usuarioidentity
                          on respuestas.IdUsuario equals usuario.Id
                          where respuestas.IdSolicitudPersonalizada == id
                          select new DetalleRespuestasSolicitudP
                          {
                              IdSolicitudPersonalizada = respuestas.IdSolicitudPersonalizada,
                              Fecha = respuestas.Fecha,
                              IdRespuestaSolicitudesPersonalizadas = respuestas.IdRespuestaSolicitudesPersonalizadas,
                              IdUsuario = respuestas.IdUsuario,
                              Respuesta = respuestas.Respuesta,
                              Usuario = usuario.Nombres + " " + usuario.Apellidos
                          }).ToListAsync();
        }

        public async Task<RespuestasMontajes> AgregarRespuestasMontajes
            (RespuestasMontajes RespuestasMontajes)
        {
            RespuestasMontajes.Fecha = DateTime.Now;
            _context.RespuestasMontajes.Add(RespuestasMontajes);
            await _context.SaveChangesAsync();
            return RespuestasMontajes;
        }

        public async Task<ActionResult<IEnumerable<DetalleRespuestasM>>>
            ListaRespuestasMontajes(int id)
        {

            return await (from respuestas in _context.RespuestasMontajes
                          join usuario in _context.Usuarioidentity
                          on respuestas.IdUsuario equals usuario.Id
                          where respuestas.IdMontaje == id
                          select new DetalleRespuestasM
                          {
                              IdMontaje = respuestas.IdMontaje,
                              Fecha = respuestas.Fecha,
                              IdRespuestaMontajes = respuestas.IdRespuestaMontajes,
                              IdUsuario = respuestas.IdUsuario,
                              Respuesta = respuestas.Respuesta,
                              Usuario = usuario.Nombres + " " + usuario.Apellidos
                          }).ToListAsync();
        }


        public async Task<ActionResult<IEnumerable<SolicitudPersonalizadaDetalle>>> ListarSolicitudPersonalizada()
        {
            await using (_context)
            {
                return (from solicitud in _context.SolicitudPersonalizada.AsEnumerable()
                        join detalle in (from detalle in _context.DetalleEstadosSolicitudPersonalizada
                                         where detalle.FechaFin == new DateTime()
                                         select new DetalleEstadosSolicitudPersonalizada
                                         {
                                             FechaFin = detalle.FechaFin,
                                             FechaInicio = detalle.FechaInicio,
                                             IdDetalleEstadoSolicitudPersonalizada = detalle.IdDetalleEstadoSolicitudPersonalizada,
                                             IdEstado = detalle.IdEstado,
                                             IdSolicitudPersonalizada = detalle.IdSolicitudPersonalizada,
                                             IdUsuario = detalle.IdUsuario
                                         }).AsEnumerable()
                            on solicitud.IdSolicitudPersonalizada equals detalle.IdSolicitudPersonalizada
                        join estado in _context.Estados.AsEnumerable()
                        on detalle.IdEstado equals estado.IdEstado
                        join usuario in _context.Usuarioidentity
                        on solicitud.IdUsuario equals usuario.Id
                        orderby solicitud.IdSolicitudPersonalizada descending
                        select new SolicitudPersonalizadaDetalle
                        {
                            Alto = solicitud.Alto,
                            Ancho = solicitud.Ancho,
                            Descripcion = solicitud.Descripcion,
                            Estado = estado.Estado,
                            Fecha = solicitud.Fecha,
                            Fondo = solicitud.Fondo,
                            Usuario = usuario.Nombres + " " + usuario.Apellidos,
                            IdSolicitudPersonalizada = solicitud.IdSolicitudPersonalizada,
                            IdUsuario = solicitud.IdUsuario,
                            ValorTotal = (from valor in (from detalle in _context.DetalleProductosSolicitud
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
                                          where valor.IdSolicitud == solicitud.IdSolicitudPersonalizada
                                          select valor.Vt).Sum()
                        }).ToList();
            }
        }

        public async Task<ActionResult<IEnumerable<SolicitudPersonalizadaDetalle>>> ListarMisSolicitudPersonalizada(string id)
        {
            await using (_context)
            {
                return (from solicitud in (from solicitud in _context.SolicitudPersonalizada.AsEnumerable()
                                           join detalle in (from detalle in _context.DetalleEstadosSolicitudPersonalizada
                                                            where detalle.FechaFin == new DateTime()
                                                            select new DetalleEstadosSolicitudPersonalizada
                                                            {
                                                                FechaFin = detalle.FechaFin,
                                                                FechaInicio = detalle.FechaInicio,
                                                                IdDetalleEstadoSolicitudPersonalizada = detalle.IdDetalleEstadoSolicitudPersonalizada,
                                                                IdEstado = detalle.IdEstado,
                                                                IdSolicitudPersonalizada = detalle.IdSolicitudPersonalizada,
                                                                IdUsuario = detalle.IdUsuario
                                                            }).AsEnumerable()
                                               on solicitud.IdSolicitudPersonalizada equals detalle.IdSolicitudPersonalizada
                                           join estado in _context.Estados.AsEnumerable()
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
                                               ValorTotal = (from valor in (from detalle in _context.DetalleProductosSolicitud
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
                                                             where valor.IdSolicitud == solicitud.IdSolicitudPersonalizada
                                                             select valor.Vt).Sum()
                                           }).ToList()
                        where solicitud.IdUsuario == id
                        select solicitud).ToList();

            }
        }

        public SolicitudPersonalizadaDetalle BuscarSolicitudPersonalizada(int id)
        {
            return (from solicitud in (from solicitud in _context.SolicitudPersonalizada.AsEnumerable()
                                       join detalle in (from detalle in _context.DetalleEstadosSolicitudPersonalizada
                                                        where detalle.FechaFin == new DateTime()
                                                        select new DetalleEstadosSolicitudPersonalizada
                                                        {
                                                            FechaFin = detalle.FechaFin,
                                                            FechaInicio = detalle.FechaInicio,
                                                            IdDetalleEstadoSolicitudPersonalizada = detalle.IdDetalleEstadoSolicitudPersonalizada,
                                                            IdEstado = detalle.IdEstado,
                                                            IdSolicitudPersonalizada = detalle.IdSolicitudPersonalizada,
                                                            IdUsuario = detalle.IdUsuario
                                                        }).AsEnumerable()
                                           on solicitud.IdSolicitudPersonalizada equals detalle.IdSolicitudPersonalizada
                                       join estado in _context.Estados.AsEnumerable()
                                       on detalle.IdEstado equals estado.IdEstado
                                       join usuario in _context.Usuarioidentity
                                       on solicitud.IdUsuario equals usuario.Id
                                       select new SolicitudPersonalizadaDetalle
                                       {
                                           Alto = solicitud.Alto,
                                           Ancho = solicitud.Ancho,
                                           Descripcion = solicitud.Descripcion,
                                           Usuario = usuario.Nombres + " " + usuario.Apellidos,
                                           Estado = estado.Estado,
                                           Fecha = solicitud.Fecha,
                                           Fondo = solicitud.Fondo,
                                           IdSolicitudPersonalizada = solicitud.IdSolicitudPersonalizada,
                                           IdUsuario = solicitud.IdUsuario,
                                           ValorTotal = (from valor in (from detalle in _context.DetalleProductosSolicitud
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
                                                         where valor.IdSolicitud == solicitud.IdSolicitudPersonalizada
                                                         select valor.Vt).Sum()
                                       }).ToList()
                    where solicitud.IdSolicitudPersonalizada == id
                    select solicitud).ToList()[0];
        }


        public async Task<SolicitudPersonalizada> AgregarSolicitudPersonalizada(SolicitudPersonalizada SolicitudPersonalizada)
        {
            SolicitudPersonalizada.Fecha = DateTime.Now;
            _context.SolicitudPersonalizada.Add(SolicitudPersonalizada);
            await _context.SaveChangesAsync();
            await AgregarDetalleEstadosSolicitudPersonalizada(new DetalleEstadosSolicitudPersonalizada
            {
                IdUsuario = SolicitudPersonalizada.IdUsuario,
                IdSolicitudPersonalizada = SolicitudPersonalizada.IdSolicitudPersonalizada,
                FechaFin = new DateTime(),
                FechaInicio = DateTime.Now,
                IdEstado = 1
            }, true);
            return SolicitudPersonalizada;
        }

        public async Task<SolicitudPersonalizada> EditarSolicitudPersonalizada(SolicitudPersonalizada SolicitudPersonalizada)
        {
            _context.SolicitudPersonalizada.Update(SolicitudPersonalizada);
            await _context.SaveChangesAsync();
            await AgregarDetalleEstadosSolicitudPersonalizada(new DetalleEstadosSolicitudPersonalizada
            {
                IdUsuario = SolicitudPersonalizada.IdUsuario,
                IdSolicitudPersonalizada = SolicitudPersonalizada.IdSolicitudPersonalizada,
                FechaFin = new DateTime(),
                FechaInicio = SolicitudPersonalizada.Fecha,
                IdEstado = 9
            }, false);
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

        public async Task ModificarEstadoM(DateTime nueva, int id)
        {
            var estados = (from Estado in _context.DetalleEstadosMontajes
                           orderby Estado.IdDetalleEstadosMontajes descending
                           where Estado.IdMontaje == id
                           select new DetalleEstadosMontajes
                           {
                               IdDetalleEstadosMontajes= Estado.IdDetalleEstadosMontajes,
                               FechaFin = Estado.FechaFin,
                               FechaInicio = Estado.FechaInicio,
                               IdUsuario = Estado.IdUsuario,
                               IdMontaje = Estado.IdMontaje,
                               IdEstado = Estado.IdEstado
                           }).ToList();
            estados[0].FechaFin = nueva;
            _context.DetalleEstadosMontajes.Update(estados[0]);
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

        public async Task<Estados> AgregarEstado(Estados Estados)
        {
            _context.Estados.Add(Estados);
            await _context.SaveChangesAsync();
            return Estados;
        }
    }
}
