import { TipoproductoDialogoComponent } from './tipoproducto-dialogo/tipoproducto-dialogo.component';
import { TipoproductoService } from './../../_service/tipoproducto.service';
import { MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Tipoproducto } from './../../_model/tipoproducto';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tipoproducto',
  templateUrl: './tipoproducto.component.html',
  styleUrls: ['./tipoproducto.component.css']
})
export class TipoproductoComponent implements OnInit {

  displayedColumns =['idTipoProducto','nombre','acciones'];
  dataSource: MatTableDataSource<Tipoproducto>;
  @ViewChild(MatPaginator, {static: false}) paginator : MatPaginator;
  @ViewChild(MatSort, {static: false})sort:MatSort; 

  constructor(private  tipoproductoService : TipoproductoService , private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.tipoproductoService.tipoProductoCambios.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.tipoproductoService.mensajeCambio.subscribe(data=> {
      this.snackBar.open(data,'Aviso',{duration:2000});
    });

    this.tipoproductoService.listar().subscribe(data => {
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });
  }
  openDialog(tipoproducto?:Tipoproducto){
    let med = tipoproducto != null ? tipoproducto :new Tipoproducto();
    this.dialog.open(TipoproductoDialogoComponent, {
      width:'250px',
      data:med
    });
  }

  
  filter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  eliminar(tipoproducto:Tipoproducto){
    this.tipoproductoService.eliminar(tipoproducto.idTipoProducto).subscribe(data => {
      this.tipoproductoService.listar().subscribe(tipoprodcuto => {
        this.tipoproductoService.tipoProductoCambios.next(tipoprodcuto);
        this.tipoproductoService.mensajeCambio.next("Se elimino");
      });

  });
}
}
