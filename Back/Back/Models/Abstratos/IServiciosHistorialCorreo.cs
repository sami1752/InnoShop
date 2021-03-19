using Back.Models.Entidades;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Back.Models.Abstratos
{
    public interface IServiciosHistorialCorreo
    {
        Task<IEnumerable<historialcorreo>> ObtenerHistorial();
        Task AgregarHistoria(historialcorreo historialcorreo);
    }
}
