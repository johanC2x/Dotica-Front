import { Component, OnInit } from '@angular/core';
import { CotizacionService } from '../../_service/cotizacion.service';
import { Cotizacion } from '../../_model/cotizacion';
import { MatTableDataSource } from '@angular/material';
import { TOKEN_NAME,PATH_REQ,PATH_ORD,PATH_COT } from '../../_shared/var.constants';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsuarioService } from '../../_service/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  displayedColumns_admin = ['nro','motivo','descripcion','solicitante','tipo','estado','fechaCreacion','acciones'];
  displayedColumns = ['nro','motivo','descripcion','tipo','estado','fechaCreacion','acciones'];

  form: FormGroup;
  cotizaciones : Cotizacion[] = [];
  cotizaciones_copia : Cotizacion[] = [];
  dataSource: MatTableDataSource<Cotizacion>;
  dataSource_adm: MatTableDataSource<Cotizacion>;
  isAdmin = false;
  idEstado = '';
  estados: string[] = ['Pendiente','Cotizado','AprobadoA1','AprobadoA2','AprobadoA3','Finalizado'];

  constructor(
    private route: ActivatedRoute,
    private builder: FormBuilder,
    private cotizacionService:CotizacionService,
    private usuarioService:UsuarioService,
    public datepipe: DatePipe
  ) { }

  ngOnInit() {
    this.form = this.builder.group({
      'nro_orden': new FormControl(''),
      'fecha': new FormControl(''),
    });
    this.getListforPath();
  }

  getListforPath(){
    if(location.pathname === PATH_COT){
      this.listar('');
    }else{
      this.listar(location.pathname);
    }
  }

  listar(path = null){
    const helper = new JwtHelperService();
    let tk = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
    const decodedToken = helper.decodeToken(tk.access_token);
    this.usuarioService.obtenerPorNick(decodedToken.user_name).subscribe( data => {
      if(data.roles[0].nombre === 'ADMIN'){
        this.isAdmin = true;
        this.cotizacionService.listar().subscribe(data => {
          this.cotizaciones = data.sort((a,b) => (a.idCotizacion > b.idCotizacion) ? 1 : ((b.idCotizacion > a.idCotizacion) ? -1 : 0));
          if(path === PATH_REQ){
            this.cotizaciones = this.cotizaciones.filter(coti => coti.usuario.roles[0].nombre === 'USER');
          }else if(path === PATH_ORD){
            this.cotizaciones = this.cotizaciones.filter(coti => coti.usuario.roles[0].nombre !== 'USER');
          }
          this.cotizaciones_copia = this.cotizaciones;
          this.dataSource = new MatTableDataSource(this.cotizaciones);
        });
      } else if(data.roles[0].nombre === 'USER'){
        this.cotizacionService.listar().subscribe(lista => {
          this.cotizaciones = lista.filter(coti => coti.usuario.username === data.username).sort((a,b) => (a.idCotizacion > b.idCotizacion) ? 1 : ((b.idCotizacion > a.idCotizacion) ? -1 : 0));
          this.cotizaciones_copia = this.cotizaciones;
          this.dataSource = new MatTableDataSource(this.cotizaciones);
        });
      } else if(data.roles[0].nombre === 'ADMA1'){
        this.cotizacionService.listar().subscribe(lista => {
          this.cotizaciones = lista.filter(coti => coti.estado === "AprobadoA1").sort((a,b) => (a.idCotizacion > b.idCotizacion) ? 1 : ((b.idCotizacion > a.idCotizacion) ? -1 : 0));
          if(path === PATH_REQ){
            this.cotizaciones = this.cotizaciones.filter(coti => coti.usuario.roles[0].nombre === 'USER');
          }else if(path === PATH_ORD){
            this.cotizaciones = this.cotizaciones.filter(coti => coti.usuario.roles[0].nombre !== 'USER');
          }
          this.cotizaciones_copia = this.cotizaciones;
          this.dataSource = new MatTableDataSource(this.cotizaciones);
        });
      } else if(data.roles[0].nombre === 'ADMA2'){
        this.cotizacionService.listar().subscribe(lista => {
          this.cotizaciones = lista.filter(coti => coti.estado === "AprobadoA2").sort((a,b) => (a.idCotizacion > b.idCotizacion) ? 1 : ((b.idCotizacion > a.idCotizacion) ? -1 : 0));
          if(path === PATH_REQ){
            this.cotizaciones = this.cotizaciones.filter(coti => coti.usuario.roles[0].nombre === 'USER');
          }else if(path === PATH_ORD){
            this.cotizaciones = this.cotizaciones.filter(coti => coti.usuario.roles[0].nombre !== 'USER');
          }
          this.cotizaciones_copia = this.cotizaciones;
          this.dataSource = new MatTableDataSource(this.cotizaciones);
        });
      } else if(data.roles[0].nombre === 'ADMA3'){
        this.cotizacionService.listar().subscribe(lista => {
          this.cotizaciones = lista.filter(coti => coti.estado === "AprobadoA3").sort((a,b) => (a.idCotizacion > b.idCotizacion) ? 1 : ((b.idCotizacion > a.idCotizacion) ? -1 : 0));
          if(path === PATH_REQ){
            this.cotizaciones = this.cotizaciones.filter(coti => coti.usuario.roles[0].nombre === 'USER');
          }else if(path === PATH_ORD){
            this.cotizaciones = this.cotizaciones.filter(coti => coti.usuario.roles[0].nombre !== 'USER');
          }
          this.cotizaciones_copia = this.cotizaciones;
          this.dataSource = new MatTableDataSource(this.cotizaciones);
        });
      } else {
        this.cotizacionService.listarPorEstado().subscribe(data => {
          this.cotizaciones = data;
          this.cotizaciones_copia = this.cotizaciones;
          this.dataSource = new MatTableDataSource(this.cotizaciones);
        });
      }
    });
  }

  buscarOrden(){
    let orden = this.form.value['nro_orden'];
    let fecha = this.datepipe.transform(this.form.value['fecha'], 'dd/MM/yyyy');
    let idEstado = this.idEstado;
    let cotis = this.cotizaciones;
    let val1 = false;
    let val2 = false;

    this.cotizaciones = this.cotizaciones_copia;
    if(orden !== ''){
      cotis = this.cotizaciones.filter(coti => coti.idCotizacion.toString() === orden);
      if(cotis.length > 0){
        this.cotizaciones = cotis;
      }else{
        cotis = this.cotizaciones;
        val2 = true;
      }
    }else{
      val1 = true;
    }

    if(idEstado !== '' && parseInt(idEstado) !== 0){
      cotis = this.cotizaciones.filter(coti => coti.estado.toString() === idEstado);
      if(cotis.length > 0){
        this.cotizaciones = cotis;
      }else{
        cotis = this.cotizaciones;
        val2 = true;
      }
    }else{
      val2 = true;
    }

    if(fecha !== ''){
      cotis = this.cotizaciones.filter(coti => this.datepipe.transform(coti.fechaCreacion, 'dd/MM/yyyy') === fecha);
    }else{

    }

    if(val1 && val2){
      this.getListforPath();
    }
    
    this.dataSource = new MatTableDataSource(cotis);
  }

}
