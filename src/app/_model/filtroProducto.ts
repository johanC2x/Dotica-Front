export class FiltroProducto {
    nombreTipoProducto: string;
    nombreProveedorProducto: string;
   

    constructor(nombreTipoProducto: string,nombreProveedorProducto: string) {
    
        this.nombreTipoProducto=nombreTipoProducto;
        this.nombreProveedorProducto = nombreProveedorProducto;
    }
}