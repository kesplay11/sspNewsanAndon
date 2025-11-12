export interface IPlaca {
  id: number,
  organization_code: string,
  nro_Op:string,
  codigo_Producto: string,
  cantidad: number,
  referencia_1: null | string | number,
  fecha_Insercion: string,
  modelo: string,
  controlLotePlacas: null | string | number,
  sumaCantidadPorNroOp: number
}
