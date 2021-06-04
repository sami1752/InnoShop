import {IBarChart} from "./charts.interface";
import {HttpClient} from "@angular/common/http";
import {ConfiguracionService} from "../../services/configuracion.service";

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
//
export const DATA_BAR_CHAR:IBarChart[]=[

]
