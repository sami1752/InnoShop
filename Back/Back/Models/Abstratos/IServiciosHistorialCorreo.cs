using Back.Models.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Models.Abstratos
{
    interface IServiciosHistorialCorreo
    {
       Task<IEnumerable<historialcorreo>> ObtenerHistorial();
    }
}
