import { Proveedorinsumo } from './proveedorinsumo';
import { Marca } from './marca';
export class Insumo{
    idInsumo: number;
    nombre: string;
    marca:Marca;
    proveedorInsumo:Proveedorinsumo;
    descripcion:string;
}