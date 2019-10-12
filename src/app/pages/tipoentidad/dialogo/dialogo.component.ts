
import { Tipoentidad } from 'src/app/_model/tipoentidad';
import { Component, OnInit, Inject } from '@angular/core';
import { TipoentidadService } from 'src/app/_service/tipoentidad.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css']
})
export class DialogoComponent implements OnInit {


  tipoentidad :Tipoentidad;

  constructor(private dialogRef: MatDialogRef<DialogoComponent>, @Inject(MAT_DIALOG_DATA) private data: Tipoentidad, private tipoentidadService: TipoentidadService) { }

  ngOnInit() {

    this.tipoentidad = new Tipoentidad();
    this.tipoentidad.idTipoEntidad=this.data.idTipoEntidad;
    this.tipoentidad.nombre=this.data.nombre;
  }

  cancelar(){
    this.dialogRef.close();
  }

  operar (){
      if (this.tipoentidad != null && this.tipoentidad.idTipoEntidad > 0) {
        this.tipoentidadService.modificar(this.tipoentidad).subscribe(data => {
          this.tipoentidadService.listar().subscribe(TipoEntidades => {
            this.tipoentidadService.tipoEntidadesCambio.next(TipoEntidades);
            this.tipoentidadService.mensajeCambio.next("Se modifico");
          });
        });
      } else {
        this.tipoentidadService.registrar(this.tipoentidad).subscribe(data => {
          this.tipoentidadService.listar().subscribe(TipoEntidades => {
            this.tipoentidadService.tipoEntidadesCambio.next(TipoEntidades);
            this.tipoentidadService.mensajeCambio.next("Se registro");
          });
        });
      }
      this.dialogRef.close();
    }
  
}
