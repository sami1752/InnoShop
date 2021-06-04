import {IAdvanceChart} from './charts.interface';

export interface ReporteVentas {
  CantProdPerso: number;
  MontoPerso: number;
  NumDescuentosPerson: number;
  MontoDescuentosPerson: number;
  CantProducto: number;
  MontoProd: number;
  NumDescuentosProd: number;
  MontoDescuentosProdu: number;
  TotalGlobal: number;
  TotalDescuentos: number;
  TotalIngresos: number;
}
export const DATA_ADVANCE_CHAR: IAdvanceChart[] = [];
export const DATA_PIE_GRID_CHAR: IAdvanceChart[] = [];
export const DATA_PIE_CHAR: IAdvanceChart[] = [];
