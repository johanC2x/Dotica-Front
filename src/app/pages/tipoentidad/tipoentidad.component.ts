import { TipoentidadService } from './../../_service/tipoentidad.service';
import { MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Tipoentidad } from 'src/app/_model/tipoentidad';
import { DialogoComponent } from './dialogo/dialogo.component';

@Component({
  selector: 'app-tipoentidad',
  templateUrl: './tipoentidad.component.html',
  styleUrls: ['./tipoentidad.component.css']
})
export class TipoentidadComponent implements OnInit {

  displayedColumns =['idTipoEntidad','nombre','acciones'];
  dataSource: MatTableDataSource<Tipoentidad>;
  @ViewChild(MatPaginator, {static: false}) paginator : MatPaginator;
  @ViewChild(MatSort, {static: false})sort:MatSort; 
 
  constructor( private tipoentidadService: TipoentidadService , private snackBar: MatSnackBar , private dialog: MatDialog) { }

  ngOnInit() {
     this.tipoentidadService.tipoEntidadesCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.tipoentidadService.mensajeCambio.subscribe(data=> {
      this.snackBar.open(data,'Aviso',{duration:2000});
    });
    
    this.tipoentidadService.listar().subscribe(data => {
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });

  }

  openDialog(tipoentidad?:Tipoentidad){
    let med = tipoentidad != null ? tipoentidad :new Tipoentidad();
    this.dialog.open(DialogoComponent, {
      width:'250px',
      data:med
    });
  }

  filter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  eliminar(tipoentidad:Tipoentidad){
      this.tipoentidadService.eliminar(tipoentidad.idTipoEntidad).subscribe(data => {
        this.tipoentidadService.listar().subscribe(tipoEntidad => {
          this.tipoentidadService.tipoEntidadesCambio.next(tipoEntidad);
          this.tipoentidadService.mensajeCambio.next("Se elimino");
        });
      

    });
  }

}
