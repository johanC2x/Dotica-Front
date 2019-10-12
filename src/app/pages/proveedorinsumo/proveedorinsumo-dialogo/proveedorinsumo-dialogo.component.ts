import { ProveedorinsumoService } from './../../../_service/proveedorinsumo.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Proveedorinsumo } from './../../../_model/proveedorinsumo';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-proveedorinsumo-dialogo',
  templateUrl: './proveedorinsumo-dialogo.component.html',
  styleUrls: ['./proveedorinsumo-dialogo.component.css']
})
export class ProveedorinsumoDialogoComponent implements OnInit {


  proveedorinsumo :Proveedorinsumo;

  constructor(private dialogRef: MatDialogRef<ProveedorinsumoDialogoComponent>, @Inject(MAT_DIALOG_DATA) private data: Proveedorinsumo, private proveedorinsumoService: ProveedorinsumoService) { }

  ngOnInit() {
    this.proveedorinsumo = new Proveedorinsumo();
    this.proveedorinsumo.idProveedorInsumo=this.data.idProveedorInsumo;
    this.proveedorinsumo.nombreProveedor=this.data.nombreProveedor;
    this.proveedorinsumo.numeroContacto=this.data.numeroContacto;
    this.proveedorinsumo.correo=this.data.correo;
    this.proveedorinsumo.direccion=this.data.direccion;
  }

  cancelar(){
    this.dialogRef.close();
  }

  operar (){
    if (this.proveedorinsumo != null && this.proveedorinsumo.idProveedorInsumo> 0) {
      this.proveedorinsumoService.modificar(this.proveedorinsumo).subscribe(data => {
        this.proveedorinsumoService.listar().subscribe(proveedorInsumo => {
          this.proveedorinsumoService.proveedorInsumosCambio.next(proveedorInsumo);
          this.proveedorinsumoService.mensajeCambio.next("Se modifico");
        });
      });
    } else {
      this.proveedorinsumoService.registrar(this.proveedorinsumo).subscribe(data => {
        this.proveedorinsumoService.listar().subscribe(proveedorInsumo => {
          this.proveedorinsumoService.proveedorInsumosCambio.next(proveedorInsumo);
          this.proveedorinsumoService.mensajeCambio.next("Se registro");
        });
      });
    }
    this.dialogRef.close();
  }
}
