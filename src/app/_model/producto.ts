import { Tipoproducto } from './tipoproducto';
import { Proveedorproducto } from './proveedorproducto';

export class Producto{
    idProducto:number;
    tipoProducto:Tipoproducto;
    proveedorProducto:Proveedorproducto;
    nombre:string;
    descripcion:string;
    stock:string;
    costo:number;
}

