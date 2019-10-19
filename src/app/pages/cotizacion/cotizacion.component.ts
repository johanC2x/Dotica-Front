import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormControlName } from '@angular/forms';
import { ProductoService } from '../../_service/producto.service';
import { Producto } from '../../_model/producto';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { CotizacionService } from '../../_service/cotizacion.service';
import { MatSnackBar} from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { TOKEN_NAME,ESTADO_R, ESTADO_C, ESTADO_A, ESTADO_A1, ESTADO_A2, ESTADO_A3, ESTADO_F } from '../../_shared/var.constants';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsuarioService } from '../../_service/usuario.service';
import { Cotizacion } from '../../_model/cotizacion';
import { CotizacionModalComponent } from './cotizacion-modal/cotizacion-modal.component';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {

  displayedColumns = ['nombre','stock','precio','total','acciones'];
  displayedColumnsCoti = ['nro','nombre','encargado','acciones'];

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
  lista_cotizacion = [];
  objProducto = {"idProducto":0,"nombre":"","stock":"0","precio":0,"total" : 0};
  dataSource: MatTableDataSource<Producto>;
  dataSource_coti: MatTableDataSource<Cotizacion>;
  dataSource_resumen: MatTableDataSource<any>;

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

  tipoCotizacion = "Requerimiento";
  estadoCotizacion = "Requerido";
  title = "Requerimiento";
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

  isEditAdmin = false;
  isUpdate = false;
  isCancel = false;
  isAdmin = false;
  disabledAdd = false;
  addCoti = false;
  idAddCoti = "0";
  cotizaciones_area : Cotizacion[] = [];
  nombre_boton = "Requerimiento";

  idCotizacion: any;
  paramsSub: any;
  idCliente: any;

  disabledUpdate = false;
  cotizacionObj : Cotizacion;

  //TOTALES 
  cantidad_ingreso = 0;
  total_ingreso = 0;
  cantidad_egreso = 0;
  total_egreso = 0;

  constructor(
    private route: ActivatedRoute,
    private builder: FormBuilder,
    private productoService:ProductoService,
    private cotizacionService:CotizacionService,
    private usuarioService:UsuarioService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
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

    this.valueType = 'Con Aprobacion';
    this.valueState = 'Pendiente';
    this.obtenerProductos();
    this.obtenerCotizacionPorArea();

    this.usuarioService.obtenerPorNick(decodedToken.user_name).subscribe( data => {
      sessionStorage.setItem("usuario", JSON.stringify(data));
    });

    if(this.route.firstChild !== null && this.route.firstChild !== undefined && this.route.firstChild.snapshot.params['id'] !== undefined){
      this.isUpdate = true;
      this.idCotizacion = this.route.firstChild.snapshot.params['id'];
      this.obtenerPorId(this.route.firstChild.snapshot.params['id']);
      this.nro_coti = this.route.firstChild.snapshot.params['id'];
    }else{
      this.obtenerMax();
      this.isEditAdmin = false;
      this.usuarioService.obtenerPorNick(decodedToken.user_name).subscribe( data => {
        this.cliente = data.nombres;
        let position_rol = data.roles.findIndex(v => v.nombre === 'ADMIN');
        let position_rol_a1 = data.roles.findIndex(v => v.nombre === 'ADMA1');
        let position_rol_a2 = data.roles.findIndex(v => v.nombre === 'ADMA2');
        let position_rol_a3 = data.roles.findIndex(v => v.nombre === 'ADMA3');
        if(position_rol !== -1){
          this.states = ['Aprobado','Anulado','Pendiente'];
          this.isAdmin = true;
        }
        if(position_rol_a1 !== -1 || position_rol_a2 !== -1 || position_rol_a3 !== -1){
          this.isAdmin = true;
        }
        sessionStorage.setItem("usuario", JSON.stringify(data));
      });
    }
  }

  obtenerCotizacionPorArea(){
    this.cotizacionService.listar().subscribe(data => {
      let user = JSON.parse(sessionStorage.getItem("usuario"));
      if(user.roles[0].nombre === 'ADMA1'){
        data = data.filter(coti => coti.usuario.roles[0].nombre === 'ADMA1').sort((a,b) => (a.idCotizacion > b.idCotizacion) ? 1 : ((b.idCotizacion > a.idCotizacion) ? -1 : 0));
      } else if(user.roles[0].nombre === 'ADMA2'){
        data = data.filter(coti => coti.usuario.roles[0].nombre === 'ADMA2').sort((a,b) => (a.idCotizacion > b.idCotizacion) ? 1 : ((b.idCotizacion > a.idCotizacion) ? -1 : 0));
      } else if(user.roles[0].nombre === 'ADMA3'){
        data = data.filter(coti => coti.usuario.roles[0].nombre === 'ADMA3').sort((a,b) => (a.idCotizacion > b.idCotizacion) ? 1 : ((b.idCotizacion > a.idCotizacion) ? -1 : 0));
      }
      data = data.filter(coti => coti.estado !== 'Requerido');
      this.cotizaciones_area = data;
    });
  }

  obtenerCoti(value: number){
    this.cotizacionService.obtenerPorId(value).subscribe(data => {
      if(this.lista_cotizacion.findIndex(v => v.idCotizacion === data.idCotizacion) === -1){
        this.lista_cotizacion.push(data);
      }
      this.dataSource_coti = new MatTableDataSource(this.lista_cotizacion);
      this.idAddCoti = "null";
    });
  }

  removerCoti(id: number){
    this.lista_cotizacion.splice(this.lista_cotizacion.findIndex(v => v.idCotizacion === id), 1);
    this.dataSource_coti = new MatTableDataSource(this.lista_cotizacion);
  }

  obtenerProductos(){
    let user = JSON.parse(sessionStorage.getItem("usuario"));
    if(user.roles[0].nombre === 'ADMA1' || user.roles[0].nombre === 'ADMA2'  || user.roles[0].nombre === 'ADMA3' ){
      this.productoService.listar().subscribe(data =>{
        data = data.filter(v => v.tipoProducto.nombre === 'MATERIAL');
        this.productos = data;
      });
    } else {
      this.productoService.listar().subscribe(data =>{
        data = data.filter(v => v.tipoProducto.nombre === 'SERVICIO');
        this.productos = data;
      });
    }
  }

  obtenerMax(){
    this.cotizacionService.obtenerMax().subscribe(data =>{
      this.cotizacionObj = data;
      this.nro_coti = data.idCotizacion + 1;
    },error => {
      this.nro_coti = 1;
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
      this.cliente = data.usuario.nombres;
      this.idCliente = data.usuario.idUsuario;
      this.idArea = data.area;

      if(user.roles[0].nombre === 'ADMA1' || user.roles[0].nombre === 'ADMA2' || user.roles[0].nombre === 'ADMA3') {
        this.addCoti = true;
      }

      if(data.estado === ESTADO_R && user.roles[0].nombre !== 'USER') {
        console.log(1);
        this.isAdmin = true;
        this.disabledUpdate = false;
        this.disabledAdd = true;
        this.tipoCotizacion = 'Cotizacion';
        this.estadoCotizacion = 'Cotizado';
        if(data.usuario.roles[0].nombre === 'ADMA1' || data.usuario.roles[0].nombre === 'ADMA2'
            || data.usuario.roles[0].nombre === 'ADMA3'){
          this.nombre_boton = 'Autorizar';
        } else {
          this.nombre_boton = 'Cotizar';
        }
      } else if(data.estado === ESTADO_C && user.roles[0].nombre === 'USER') {
        console.log(2);
        this.isAdmin = true;
        this.disabledAdd = true;
        this.tipoCotizacion = 'Cotizacion';
        this.estadoCotizacion = 'Aprobado';
        this.nombre_boton = 'Aprobar';
        this.isCancel = true;
      } else if(data.estado === ESTADO_A && user.roles[0].nombre !== 'USER') {
        console.log(3);
        this.isAdmin = true;
        this.disabledAdd = true;
        this.title = 'Orden de Servicio';
        this.tipoCotizacion = 'Orden de Servicio';
        this.estadoCotizacion = 'AprobadoA1';
        this.nombre_boton = 'Autorizar';
      } else if(data.estado === ESTADO_A1 && user.roles[0].nombre !== 'USER') {
        console.log(4);
        this.isEditAdmin = true;
        this.isAdmin = true;
        this.disabledAdd = true;
        this.title = 'Orden de Servicio';
        this.tipoCotizacion = 'Orden de Servicio';
        this.estadoCotizacion = 'AprobadoA2';
        this.nombre_boton = 'Autorizar';
      } else if(data.estado === ESTADO_A2 && user.roles[0].nombre !== 'USER') {
        console.log(5);
        this.isEditAdmin = true;
        this.isAdmin = true;
        this.disabledAdd = true;
        this.title = 'Orden de Servicio';
        this.tipoCotizacion = 'Orden de Servicio';
        this.estadoCotizacion = 'AprobadoA3';
        this.nombre_boton = 'Autorizar';
      } else if(data.estado === ESTADO_A3 && user.roles[0].nombre !== 'USER') {
        console.log(6);
        this.isEditAdmin = true;
        this.isAdmin = true;
        this.disabledAdd = true;
        this.title = 'Orden de Servicio';
        this.tipoCotizacion = 'Orden Autorizada';
        this.estadoCotizacion = 'Finalizado';
        this.nombre_boton = 'Autorizar';
      } else if(data.estado === ESTADO_F && user.roles[0].nombre !== 'USER') {
        console.log(7);
        this.isEditAdmin = true;
        this.isAdmin = true;
        this.disabledUpdate = true;
        this.disabledAdd = true;
        this.title = 'Orden de Servicio';
        this.tipoCotizacion = 'Finalizado';
        this.estadoCotizacion = 'Finalizado';
        this.nombre_boton = 'Autorizada';
      } else {
        console.log(8);
        this.isEditAdmin = false;
      }

      if(user.roles[0].nombre === 'ADMIN' && (
        data.estado === ESTADO_A1 || data.estado === ESTADO_A2 || data.estado === ESTADO_A3 || data.estado === ESTADO_F
      )){
        this.isAdmin = true;
        this.disabledUpdate = true;
        this.disabledAdd = true;
      }

      if(user.roles[0].nombre === 'USER' && (
        data.estado === ESTADO_A1 || data.estado === ESTADO_A2 || data.estado === ESTADO_A3 || data.estado === ESTADO_F
      )){
        this.isAdmin = true;
        this.disabledUpdate = true;
        this.disabledAdd = true;
      }

      if(data.estado === ESTADO_R && data.usuario.roles[0].nombre === 'ADMA1') {
          this.isAdmin = true;
          this.disabledAdd = true;
          this.tipoCotizacion = 'Finalizado';
          this.estadoCotizacion = 'Finalizado';
          this.nombre_boton = 'Aprobar';
      }

      /*
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
      */

      let array_productos = JSON.parse(data.data);
      let array_coti = JSON.parse(data.data_coti);
      let total_ingreso = 0;
      let cantidad_ingreso = 0 ;
      if(array_productos.length > 0){
        array_productos.forEach((element) => {
          this.objProducto = {"idProducto": 0,"nombre":"","stock":"0","precio":0, "total" : 0};
          this.objProducto.idProducto = element.idProducto;
          this.objProducto.nombre = element.nombre;
          this.objProducto.stock = element.stock;
          this.objProducto.precio = element.precio;
          this.objProducto.total = element.total;

          cantidad_ingreso = cantidad_ingreso + element.stock;
          total_ingreso = total_ingreso + element.total;

          this.productosStock.push(this.objProducto);
          this.dataSource = new MatTableDataSource(this.productosStock);
        });
        this.cantidad_ingreso = cantidad_ingreso;
        this.total_ingreso = total_ingreso;
      }

      let total_egreso = 0;
      let cantidad_egreso = 0 ;
      if(array_coti.length > 0){
        array_coti.forEach(element => {
          let data = JSON.parse(element.data);
          if(data.length > 0){
            data.forEach(p => {
              cantidad_egreso = cantidad_egreso + p.total;
              total_egreso = total_egreso + p.stock;
            });
          }
        });
        
        this.cantidad_egreso = cantidad_egreso;
        this.total_egreso = total_egreso;

        this.lista_cotizacion = array_coti;
        this.dataSource_coti = new MatTableDataSource(this.lista_cotizacion);
      }
      
    });
  }

  agregarProducto(){
    let id = this.idProducto;
    let cantidad = this.form.value['cantidad'];
    if(cantidad === 0){
      this.snackBar.open('Es necesario agregar una cantidad', "Cerrar", { duration: 2000 });
    } else if(id === undefined || id === null){
      this.snackBar.open('Es necesario seleccionar un servicio', "Cerrar", { duration: 2000 });
    } else {
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
  }

  removerProducto(id: number){
    this.productosStock.splice(this.productosStock.findIndex(v => v.idProducto === id), 1);
    this.dataSource = new MatTableDataSource(this.productosStock);
  }

  cancelar(){
    console.log("==================== CANCELAR ========================");
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
      usuario: {},
      productos: JSON.parse(JSON.stringify(this.productosStock)),
      data: JSON.stringify(this.productosStock),
      data_coti: JSON.stringify(this.lista_cotizacion)
    };
    if(this.route.firstChild !== null && this.route.firstChild !== undefined && this.route.firstChild.snapshot.params['id'] !== undefined){
      obj.idCotizacion = this.idCotizacion;
      obj.tipo = this.tipoCotizacion;
      obj.estado = this.estadoCotizacion;
      obj.usuario = {
        idUsuario: this.idCliente
      };
      this.actualizar(obj);
    }else{
      delete obj.idCotizacion;
      obj.tipo = this.tipoCotizacion;
      obj.estado = this.estadoCotizacion;
      obj.usuario = {
        idUsuario: user.idUsuario
      };
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

  agregarOrden(){
    this.dialog.open(CotizacionModalComponent, {
      width:'250px',
      data:{}
    });
  }

}
