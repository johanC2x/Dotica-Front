import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Proveedorproducto } from 'src/app/_model/proveedorproducto';
import { ProveedorinsumoDialogoComponent } from '../../proveedorinsumo/proveedorinsumo-dialogo/proveedorinsumo-dialogo.component';
import { ProveedorproductoService } from 'src/app/_service/proveedorproducto.service';

@Component({
  selector: 'app-proveedorproducto-dialogo',
  templateUrl: './proveedorproducto-dialogo.component.html',
  styleUrls: ['./proveedorproducto-dialogo.component.css']
})
export class ProveedorproductoDialogoComponent implements OnInit {

  proveedorproducto :Proveedorproducto;
  constructor(private dialogRef: MatDialogRef<ProveedorinsumoDialogoComponent>, @Inject(MAT_DIALOG_DATA) private data: Proveedorproducto, private proveedorproductoService: ProveedorproductoService) { }
  ngOnInit() {
    this.proveedorproducto = new Proveedorproducto();
    this.proveedorproducto.idProveedorProducto=this.data.idProveedorProducto;
    this.proveedorproducto.nombre=this.data.nombre;
  }

  cancelar(){
    this.dialogRef.close();
  }

  operar (){
    if (this.proveedorproducto != null && this.proveedorproducto.idProveedorProducto > 0) {
      this.proveedorproductoService.modificar(this.proveedorproducto).subscribe(data => {
        this.proveedorproductoService.listar().subscribe(proveedorproductos => {
          this.proveedorproductoService.proveedorProductoCambios.next(proveedorproductos);
          this.proveedorproductoService.mensajeCambio.next("Se modifico");
        });
      });
    } else {
      this.proveedorproductoService.registrar(this.proveedorproducto).subscribe(data => {
        this.proveedorproductoService.listar().subscribe(proveedorproductos => {
          this.proveedorproductoService.proveedorProductoCambios.next(proveedorproductos);
          this.proveedorproductoService.mensajeCambio.next("Se registro");
        });
      });
    }
    this.dialogRef.close();
  }
}
