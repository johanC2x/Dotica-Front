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

  displayedColumns_admin = ['nro','motivo','descripcion','solicitante','tipo','estado','fechaCreacion','acciones','descargar'];
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

    let req = {};

    if(orden !== ''){
      val1 = true;
    }

    if(idEstado !== '' && parseInt(idEstado) !== 0){
      val2 = true;
    }

    if(val1 && val2){
      req = {
        idCotizacion : orden,
        estado : idEstado
      };
    } else {
      if(val1){
        req = {
          idCotizacion : orden
        };
        cotis = this.cotizaciones.filter(coti => coti.idCotizacion === orden);
      }else if(val2){
        req = {
          estado : idEstado
        };
        cotis = this.cotizaciones.filter(coti => coti.estado.toString() === idEstado);
      }
    }

    cotis = this.cotizaciones.filter((item) => {
      for (var key in req) {
        if (item[key] === undefined || item[key] != req[key])
          return false;
      }
      return true;
    });

    this.dataSource = new MatTableDataSource(cotis);
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }

}
