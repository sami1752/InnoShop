import {IBarChart} from "./charts.interface";

export interface ReporteSPM {
  Cotizada: number;
  Devuelta: number;
  Aceptada: number;
  Rechazada: number;
  Cancelada: number;
  Pagada: number;
  EnProcesoDeFabricacion: number;
  Terminada: number;
  Modificada: number;
  EnProcesoDeCotizacion: number;
  TotalSolicitudes: number;
  TotalVendido: number;
  Entregada: number;
}
export const DATA_BAR_CHAR:IBarChart[]=[
  {
    name: "Germany",
    value: 15,
    extra: {
      code: "de"
    }
  },
  {
    name: "United States",
    value: 8,
    extra: {
      code: "us"
    }
  },
  {
    name: "France",
    value: 3,
    extra: {
      code: "fr"
    }
  },
  {
    name: "United Kingdom",
    value: 10,
    extra: {
      code: "uk"
    }
  }


]
