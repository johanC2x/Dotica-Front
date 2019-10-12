import { InsumoService } from './../../_service/insumo.service';
import { MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Insumo } from 'src/app/_model/insumo';

@Component({
  selector: 'app-insumo',
  templateUrl: './insumo.component.html',
  styleUrls: ['./insumo.component.css']
})
export class InsumoComponent implements OnInit {

  displayedColumns =['idInsumo','nombre','marca','proveedor','acciones'];
  dataSource: MatTableDataSource<Insumo>;
  @ViewChild(MatPaginator, {static: false}) paginator : MatPaginator;
  @ViewChild(MatSort, {static: false})sort:MatSort; 

  constructor(private  insumoService : InsumoService , private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    console.log("joel 1");
    this.insumoService.insumoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    console.log("joel 2");
    this.insumoService.mensajeCambio.subscribe(data=> {
      this.snackBar.open(data,'Aviso',{duration:2000});
    });
    console.log("joel 3");
    this.insumoService.listar().subscribe(data => {
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });
  }
  /*
  openDialog(insumo?:Marca){
    let med = insumo != null ? insumo :new Marca();
    //this.dialog.open(MarcaDialogoComponent, {
      width:'250px',
      data:med
    });
  }
  */
  filter(filterValue: string) {
    console.log("joel 4");
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  eliminar(insumo:Insumo){
    console.log("joel 5");
    this.insumoService.eliminar(insumo.idInsumo).subscribe(data => {
      this.insumoService.listar().subscribe(insumos => {
        this.insumoService.insumoCambio.next(insumos);
        this.insumoService.mensajeCambio.next("Se elimino");
      });

  });
}
}
