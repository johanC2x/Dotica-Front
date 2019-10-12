import { InsumoService } from 'src/app/_service/insumo.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Producto } from 'src/app/_model/producto';
import { ProductoListaInsumo } from 'src/app/_model/productoListaInsumo';

@Component({
  selector: 'app-dialogo-productodetalle',
  templateUrl: './dialogo-productodetalle.component.html',
  styleUrls: ['./dialogo-productodetalle.component.css']
})
export class DialogoProductodetalleComponent implements OnInit {

  producto: Producto;
  insumos: ProductoListaInsumo[];

  constructor(public dialogRef: MatDialogRef<DialogoProductodetalleComponent>,@Inject(MAT_DIALOG_DATA) public data: Producto,
    private insumoService: InsumoService) { }

  ngOnInit() {
    this.producto = this.data;
    this.listarInsumos();
  }

  listarInsumos() {
    this.insumoService.listarInsumoPorConsulta(this.producto.idProducto).subscribe((data) => {
      console.log(data);
      this.insumos = data;
    });
  }

  cancelar() {
    this.dialogRef.close();
  }

}
