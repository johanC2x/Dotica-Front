import { MarcaService } from './../../../_service/marca.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Marca } from './../../../_model/marca';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-marca-dialogo',
  templateUrl: './marca-dialogo.component.html',
  styleUrls: ['./marca-dialogo.component.css']
})
export class MarcaDialogoComponent implements OnInit {

marca :Marca;
  constructor(private dialogRef: MatDialogRef<MarcaDialogoComponent>, @Inject(MAT_DIALOG_DATA) private data: Marca, private marcaService: MarcaService) { }

  ngOnInit() {
    this.marca = new Marca();
    this.marca.idMarca=this.data.idMarca;
    this.marca.nombre=this.data.nombre;
  }

  cancelar(){
    this.dialogRef.close();
  }

  operar (){
    if (this.marca != null && this.marca.idMarca > 0) {
      this.marcaService.modificar(this.marca).subscribe(data => {
        this.marcaService.listar().subscribe(marcas => {
          this.marcaService.marcaCambios.next(marcas);
          this.marcaService.mensajeCambio.next("Se modifico");
        });
      });
    } else {
      this.marcaService.registrar(this.marca).subscribe(data => {
        this.marcaService.listar().subscribe(marcas => {
          this.marcaService.marcaCambios.next(marcas);
          this.marcaService.mensajeCambio.next("Se registro");
        });
      });
    }
    this.dialogRef.close();
  }
}
