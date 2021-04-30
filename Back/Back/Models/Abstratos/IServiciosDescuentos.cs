using Back.Clases.Descuentos;
using Back.Models.Entidades.Descuentos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Abstratos
{
    public interface IServiciosDescuentos
    {
        Task<ActionResult<IEnumerable<DetalleDescuentos>>> ListarDescuentos(string IdUsuario);
        Task<IEnumerable<ValorRuleta>> ListarValoresRuleta();
        Task<ActionResult<IEnumerable<PorcentajesRuleta>>> ListarPorcentajesRuleta();
        Task<ValorRuleta> ObtenerValorRuletaActual();
        Task RegistrarCuponDescuento(Descuentos descuento);
        Task EditarPuntosUsuario(string idUsuario);
        Task AgregarPuntuacionNueva(ValorRuleta valorRuleta);
        Task EditarValorRuleta(DateTime nueva);
        Task AgregarPorcentajeRuleta(PorcentajesRuleta porcentaje);
        Task EditarPorcentajeRuleta(PorcentajesRuleta porcentaje);


    }

}
