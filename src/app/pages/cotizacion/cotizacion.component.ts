import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormControlName } from '@angular/forms';
import { ProductoService } from '../../_service/producto.service';
import { Producto } from '../../_model/producto';
import { MatTableDataSource } from '@angular/material';
import { CotizacionService } from '../../_service/cotizacion.service';
import { MatSnackBar} from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { TOKEN_NAME } from '../../_shared/var.constants';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsuarioService } from '../../_service/usuario.service';
import { Cotizacion } from '../../_model/cotizacion';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {

  displayedColumns = ['nombre','stock','precio','total','acciones'];

  mensaje: string;
  form: FormGroup;
  valueType: string;
  types: string[] = ['Con Aprobacion','Sin Aprobacion'];
  valueState: string;
  states: string[] = ['Pendiente','Borrador'];

  idUsuario: 0;
  idProducto: 0;
  productos: Producto[] = [];
  producto: Producto;
  productosStock = [];
  objProducto = {"idProducto":0,"nombre":"","stock":"0","precio":0,"total" : 0};
  dataSource: MatTableDataSource<Producto>;

  cotizacion: {
    "descripcion": string,
    "tipo": string,
    "estado": string,
    "usuario": any,
    "productos": Producto[]
  };
  usuario: {
    "idUsuario": number
  };
  cantidad:0;

  tipoCotizacion = "R";
  estadoCotizacion = "Pendiente";
  title = "Reuerimiento";
  nro_coti = 0;
  cliente = "";
  idArea = "";
  areas = [
    {id:"A1",nombre:"Area1"},
    {id:"A2",nombre:"Area2"},
    {id:"A3",nombre:"Area3"},
    {id:"A4",nombre:"Area4"},
    {id:"A5",nombre:"Area5"},
  ];

  isUpdate = false;

  idCotizacion: any;
  paramsSub: any;

  disabledUpdate = false;
  cotizacionObj : Cotizacion;

  constructor(
    private route: ActivatedRoute,
    private builder: FormBuilder,
    private productoService:ProductoService,
    private cotizacionService:CotizacionService,
    private usuarioService:UsuarioService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.form = this.builder.group({
      'id': new FormControl(0),
      'ncotizacion': new FormControl('1s231s232'),
      'descripcion': new FormControl(''),
      'tipo': new FormControl(''),
      'estado': new FormControl(''),
      'cantidad': new FormControl(0),
      'nombre': new FormControl('')
    });
    
    const helper = new JwtHelperService();
    let tk = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
    const decodedToken = helper.decodeToken(tk.access_token);

    this.usuarioService.obtenerPorNick(decodedToken.user_name).subscribe( data => {
      this.cliente = data.nombres;
      let position_rol = data.roles.findIndex(v => v.nombre === 'ADMIN');
      if(position_rol !== -1){
        this.states = ['Aprobado','Anulado','Pendiente'];
      }
      sessionStorage.setItem("usuario", JSON.stringify(data));
    });
    
    this.valueType = 'Con Aprobacion';
    this.valueState = 'Pendiente';
    this.obtenerProductos();

    if(this.route.firstChild !== null && this.route.firstChild !== undefined && this.route.firstChild.snapshot.params['id'] !== undefined){
      this.isUpdate = true;
      this.idCotizacion = this.route.firstChild.snapshot.params['id'];
      this.obtenerPorId(this.route.firstChild.snapshot.params['id']);
      this.nro_coti = this.route.firstChild.snapshot.params['id'];
    }else{
      this.obtenerMax();
    }
  }

  obtenerProductos(){
    this.productoService.listar().subscribe(data =>{
      this.productos = data;
    });
  }

  obtenerMax(){
    this.cotizacionService.obtenerMax().subscribe(data =>{
      this.cotizacionObj = data;
      this.nro_coti = data.idCotizacion;
    });
  }

  obtenerPorId(id: any){
    this.cotizacionService.obtenerPorId(id).subscribe(data => {
      let user = JSON.parse(sessionStorage.getItem("usuario"));
      this.form = this.builder.group({
        'id': new FormControl(0),
        'descripcion': new FormControl(data.descripcion),
        'tipo': new FormControl(data.tipo),
        'estado': new FormControl(data.estado),
        'cantidad': new FormControl(0),
        'nombre': new FormControl(data.motivo)
      });

      this.idArea = data.area;
      if(data.estado === 'Aprobado'){
        this.disabledUpdate = true;
        this.title = "Cotización";
      } else if(user.roles[0].nombre.indexOf(data.area) === -1 && user.roles[0].nombre !== 'ADMIN'){
        this.disabledUpdate = true;
        this.title = "Orden de Servicio";
      } else if(data.estado === 'Observado' && user.roles[0].nombre === 'ADMIN') {
        this.disabledUpdate = false;
        this.title = "Orden de Servicio";
        this.tipoCotizacion = "Cotizacion";
        this.estadoCotizacion = "Aprobado";
      } else {
        this.tipoCotizacion = "OS";
        this.estadoCotizacion = "Observado";
        if(data.estado === "Pendiente"){
          this.disabledUpdate = false;
        }else{
          this.disabledUpdate = true;
        }
      }

      let array_productos = JSON.parse(data.data);
      if(array_productos.length > 0){
        array_productos.forEach((element) => {
          this.objProducto = {"idProducto": 0,"nombre":"","stock":"0","precio":0, "total" : 0};
          this.objProducto.idProducto = element.idProducto;
          this.objProducto.nombre = element.nombre;
          this.objProducto.stock = element.stock;
          this.objProducto.precio = element.precio;
          this.objProducto.total = element.total;
          this.productosStock.push(this.objProducto);
          this.dataSource = new MatTableDataSource(this.productosStock);
        });
      }
    });
  }

  agregarProducto(){
    let id = this.idProducto;
    let cantidad = this.form.value['cantidad'];
    this.productoService.obtenerPorId(id.toString()).subscribe(data =>{
      let costo = (data.costo === undefined || data.costo === null) ? 0: data.costo;
      this.objProducto = {"idProducto": 0,"nombre":"","stock":"0","precio":0, "total" : 0};
      this.objProducto.idProducto = data.idProducto;
      this.objProducto.nombre = data.nombre;
      this.objProducto.stock = cantidad;
      this.objProducto.precio = costo;
      this.objProducto.total = costo * cantidad;
      this.productosStock.push(this.objProducto);
      this.dataSource = new MatTableDataSource(this.productosStock);
    });
  }

  removerProducto(id: number){
    this.productosStock.splice(this.productosStock.findIndex(v => v.idProducto === id), 1);
    this.dataSource = new MatTableDataSource(this.productosStock);
  }

  registrar(){
    let user = JSON.parse(sessionStorage.getItem("usuario"));
    const obj = {
      idCotizacion: 0,
      ncotizacion: this.form.value['ncotizacion'],
      motivo: this.form.value['nombre'],
      descripcion: this.form.value['descripcion'],
      tipo: this.valueType,
      estado: this.valueState,
      area: this.idArea,
      usuario: {
        idUsuario: user.idUsuario
      },
      productos: JSON.parse(JSON.stringify(this.productosStock)),
      data: JSON.stringify(this.productosStock)
    };
    if(this.route.firstChild !== null && this.route.firstChild !== undefined && this.route.firstChild.snapshot.params['id'] !== undefined){
      obj.idCotizacion = this.idCotizacion;
      obj.tipo = this.tipoCotizacion;
      obj.estado = this.estadoCotizacion;
      this.actualizar(obj);
    }else{
      delete obj.idCotizacion;
      obj.tipo = this.tipoCotizacion;
      obj.estado = this.estadoCotizacion;
      this.insertar(obj);
    }
  }

  insertar(obj: any){
    this.cotizacionService.registrar(obj).subscribe(data => {
      this.snackBar.open('Se registró correctamente', "Aviso", { duration: 2000 });
      this.limpiar();
    },error => {
      this.snackBar.open('Se ha producido un error', "Error", { duration: 2000 });
    });
  }

  actualizar(obj: any){
    this.cotizacionService.actualizar(obj).subscribe(data => {
      this.snackBar.open('Se actualizó correctamente', "Aviso", { duration: 2000 });
      this.disabledUpdate = true;
      //this.limpiar();
    },error => {
      this.snackBar.open('Se ha producido un error', "Error", { duration: 2000 });
    });
  }

  limpiar(){
    this.form = this.builder.group({
      'id': new FormControl(0),
      'descripcion': new FormControl(''),
      'tipo': new FormControl(''),
      'estado': new FormControl(''),
      'cantidad': new FormControl(0),
      'nombre': new FormControl('')
    });
    this.idArea = "0";
    this.objProducto = {"idProducto":0,"nombre":"","stock":"0","precio":0,"total" : 0};
    this.dataSource = new MatTableDataSource(this.productosStock);
  }

}
