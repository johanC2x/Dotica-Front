import { MarcaService } from './../../_service/marca.service';
import { Marca } from './../../_model/marca';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MarcaDialogoComponent } from './marca-dialogo/marca-dialogo.component';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {


  displayedColumns =['idMarca','nombre','acciones'];
  dataSource: MatTableDataSource<Marca>;
  @ViewChild(MatPaginator, {static: false}) paginator : MatPaginator;
  @ViewChild(MatSort, {static: false})sort:MatSort; 

  constructor(private  marcaService : MarcaService , private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.marcaService.marcaCambios.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.marcaService.mensajeCambio.subscribe(data=> {
      this.snackBar.open(data,'Aviso',{duration:2000});
    });

    this.marcaService.listar().subscribe(data => {
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });
  }
  openDialog(marca?:Marca){
    let med = marca != null ? marca :new Marca();
    this.dialog.open(MarcaDialogoComponent, {
      width:'250px',
      data:med
    });
  }

  
  filter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  eliminar(marca:Marca){
    this.marcaService.eliminar(marca.idMarca).subscribe(data => {
      this.marcaService.listar().subscribe(marca => {
        this.marcaService.marcaCambios.next(marca);
        this.marcaService.mensajeCambio.next("Se elimino");
      });

  });
}

}
