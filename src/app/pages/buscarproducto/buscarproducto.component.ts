import { DialogoProductodetalleComponent } from './dialogo-productodetalle/dialogo-productodetalle.component';
import { FiltroProducto } from './../../_model/filtroProducto';
import { Tipoproducto } from './../../_model/tipoproducto';
import { Proveedorproducto } from 'src/app/_model/proveedorproducto';
import { ProductoService } from './../../_service/producto.service';
import { MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { Producto } from './../../_model/producto';
import { MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-buscarproducto',
  templateUrl: './buscarproducto.component.html',
  styleUrls: ['./buscarproducto.component.css']
})
export class BuscarproductoComponent implements OnInit {

  
  displayedColumns = ['nombre','descripcion','acciones'];
  dataSource: MatTableDataSource<Producto>;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false})sort:MatSort; 
  
  form: FormGroup;

  productos: Producto[] = [];

  constructor(
    private productoService: ProductoService,
    private snackBar: MatSnackBar, 
    private dialog: MatDialog,
  ) {

  }

  ngOnInit() {
    this.form = new FormGroup({
      'nombreProveedorProducto': new FormControl(''),
      'nombreTipoProducto': new FormControl('')
    });
    this.obtenerProductos();
  }

  obtenerProductos(){
    this.productoService.listar().subscribe(data =>{
      this.productos = data;
      this.dataSource = new MatTableDataSource(this.productos);
    })
  }

  buscar(){
    let filtro = new FiltroProducto( this.form.value['nombreTipoProducto'],this.form.value['nombreProveedorProducto']);
  
    filtro.nombreTipoProducto = filtro.nombreTipoProducto.toLowerCase();
    filtro.nombreProveedorProducto = filtro.nombreProveedorProducto.toLowerCase();
    
    if(filtro.nombreProveedorProducto){
      delete filtro.nombreTipoProducto;
      filtro.nombreProveedorProducto.trim();
      this.productoService.buscar(filtro).subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      });
    }else{
      filtro.nombreProveedorProducto=filtro.nombreTipoProducto;
      delete filtro.nombreTipoProducto;
      filtro.nombreProveedorProducto.trim();
      this.productoService.buscar(filtro).subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      });
    }
  }

  verDetalle(producto: Producto) {    
    this.dialog.open(DialogoProductodetalleComponent, {      
      data: producto
    });
  }

}
