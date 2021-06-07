import {IBarChart} from './charts.interface';

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
export const DATA_BAR_CHAR: IBarChart[] = [];
export const DATA_BAR_HORIZONTAL_CHAR: IBarChart[] = [];


