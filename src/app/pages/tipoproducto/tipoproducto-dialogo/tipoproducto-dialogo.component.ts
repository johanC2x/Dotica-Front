import { TipoproductoService } from './../../../_service/tipoproducto.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Tipoproducto } from './../../../_model/tipoproducto';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-tipoproducto-dialogo',
  templateUrl: './tipoproducto-dialogo.component.html',
  styleUrls: ['./tipoproducto-dialogo.component.css']
})
export class TipoproductoDialogoComponent implements OnInit {

  tipoproducto :Tipoproducto;
  constructor(private dialogRef: MatDialogRef<TipoproductoDialogoComponent >, @Inject(MAT_DIALOG_DATA) private data: Tipoproducto, private tipoproductoService: TipoproductoService) { }

  ngOnInit() {
    this.tipoproducto = new Tipoproducto();
    this.tipoproducto.idTipoProducto=this.data.idTipoProducto;
    this.tipoproducto.nombre=this.data.nombre;
  }

  cancelar(){
    this.dialogRef.close();
  }

  operar (){
    if (this.tipoproducto != null && this.tipoproducto.idTipoProducto > 0) {
      this.tipoproductoService.modificar(this.tipoproducto).subscribe(data => {
        this.tipoproductoService.listar().subscribe(tipoproductos => {
          this.tipoproductoService.tipoProductoCambios.next(tipoproductos);
          this.tipoproductoService.mensajeCambio.next("Se modifico");
        });
      });
    } else {
      this.tipoproductoService.registrar(this.tipoproducto).subscribe(data => {
        this.tipoproductoService.listar().subscribe(tipoproductos => {
          this.tipoproductoService.tipoProductoCambios.next(tipoproductos);
          this.tipoproductoService.mensajeCambio.next("Se registro");
        });
      });
    }
    this.dialogRef.close();
  }
}
