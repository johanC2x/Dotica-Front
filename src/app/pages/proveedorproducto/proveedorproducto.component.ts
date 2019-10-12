import { ProveedorproductoDialogoComponent } from './proveedorproducto-dialogo/proveedorproducto-dialogo.component';
import { MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Proveedorproducto } from 'src/app/_model/proveedorproducto';
import { ProveedorproductoService } from 'src/app/_service/proveedorproducto.service';

@Component({
  selector: 'app-proveedorproducto',
  templateUrl: './proveedorproducto.component.html',
  styleUrls: ['./proveedorproducto.component.css']
})
export class ProveedorproductoComponent implements OnInit {

  displayedColumns =['idProveedorProducto','nombre','acciones'];
  dataSource: MatTableDataSource<Proveedorproducto>;
  @ViewChild(MatPaginator, {static: false}) paginator : MatPaginator;
  @ViewChild(MatSort, {static: false})sort:MatSort; 

  constructor(private  proveedorproductoService : ProveedorproductoService , private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.proveedorproductoService.proveedorProductoCambios.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.proveedorproductoService.mensajeCambio.subscribe(data=> {
      this.snackBar.open(data,'Aviso',{duration:2000});
    });

    this.proveedorproductoService.listar().subscribe(data => {
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });
  }
  openDialog(proveedorproducto?:Proveedorproducto){
    let med = proveedorproducto != null ? proveedorproducto :new Proveedorproducto();
    this.dialog.open(ProveedorproductoDialogoComponent, {
      width:'250px',
      data:med
    });
  }


  filter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  eliminar(proveedorproducto:Proveedorproducto){
    this.proveedorproductoService.eliminar(proveedorproducto.idProveedorProducto).subscribe(data => {
      this.proveedorproductoService.listar().subscribe(proveedorproducto => {
        this.proveedorproductoService.proveedorProductoCambios.next(proveedorproducto);
        this.proveedorproductoService.mensajeCambio.next("Se elimino");
      });

  });
}
}
