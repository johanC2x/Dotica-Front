import { ProveedorinsumoDialogoComponent } from './proveedorinsumo-dialogo/proveedorinsumo-dialogo.component';
import { MatPaginator, MatTableDataSource, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { Proveedorinsumo } from './../../_model/proveedorinsumo';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProveedorinsumoService } from 'src/app/_service/proveedorinsumo.service';

@Component({
  selector: 'app-proveedorinsumo',
  templateUrl: './proveedorinsumo.component.html',
  styleUrls: ['./proveedorinsumo.component.css']
})
export class ProveedorinsumoComponent implements OnInit {

  displayedColumns =['idProveedorInsumo','nombreProveedor','numeroContacto','correo','direccion','acciones'];
  dataSource: MatTableDataSource<Proveedorinsumo>;
  @ViewChild(MatPaginator, {static: false}) paginator : MatPaginator;
  @ViewChild(MatSort, {static: false})sort:MatSort; 

  constructor(private proveedorinsumoService : ProveedorinsumoService , private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() { 
    this.proveedorinsumoService.proveedorInsumosCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.proveedorinsumoService.mensajeCambio.subscribe(data=> {
      this.snackBar.open(data,'Aviso',{duration:2000});
    });

    this.proveedorinsumoService.listar().subscribe(data => {
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });
  }

  openDialog(proveedorinsumo?:Proveedorinsumo){
    let med = proveedorinsumo != null ? proveedorinsumo :new Proveedorinsumo();
    this.dialog.open(ProveedorinsumoDialogoComponent, {
      width:'250px',
      data:med
    });
  }



  filter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  
 
  eliminar(proveedorinsumo:Proveedorinsumo){
      this.proveedorinsumoService.eliminar(proveedorinsumo.idProveedorInsumo).subscribe(data => {
        this.proveedorinsumoService.listar().subscribe(proveedorInsumo => {
          this.proveedorinsumoService.proveedorInsumosCambio.next(proveedorInsumo);
          this.proveedorinsumoService.mensajeCambio.next("Se elimino");
        });

    });
  }
}
