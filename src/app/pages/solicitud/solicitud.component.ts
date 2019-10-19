import { Component, OnInit } from '@angular/core';
import { CotizacionService } from '../../_service/cotizacion.service';
import { Cotizacion } from '../../_model/cotizacion';
import { MatTableDataSource } from '@angular/material';
import { TOKEN_NAME } from '../../_shared/var.constants';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsuarioService } from '../../_service/usuario.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  displayedColumns_admin = ['nro','motivo','descripcion','solicitante','tipo','estado','fechaCreacion','acciones'];
  displayedColumns = ['nro','motivo','descripcion','tipo','estado','fechaCreacion','acciones'];

  cotizaciones : Cotizacion[] = [];
  dataSource: MatTableDataSource<Cotizacion>;
  dataSource_adm: MatTableDataSource<Cotizacion>;
  isAdmin = false;

  constructor(
    private cotizacionService:CotizacionService,
    private usuarioService:UsuarioService
  ) { }

  ngOnInit() {
    this.listar();
  }

  listar(){
    const helper = new JwtHelperService();
    let tk = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
    const decodedToken = helper.decodeToken(tk.access_token);
    this.usuarioService.obtenerPorNick(decodedToken.user_name).subscribe( data => {
      if(data.roles[0].nombre === 'ADMIN'){
        this.isAdmin = true;
        this.cotizacionService.listar().subscribe(data => {
          this.cotizaciones = data.sort((a,b) => (a.idCotizacion > b.idCotizacion) ? 1 : ((b.idCotizacion > a.idCotizacion) ? -1 : 0));
          this.dataSource = new MatTableDataSource(this.cotizaciones);
        });
      } else if(data.roles[0].nombre === 'USER'){
        this.cotizacionService.listar().subscribe(lista => {
          this.cotizaciones = lista.filter(coti => coti.usuario.username === data.username).sort((a,b) => (a.idCotizacion > b.idCotizacion) ? 1 : ((b.idCotizacion > a.idCotizacion) ? -1 : 0));
          this.dataSource = new MatTableDataSource(this.cotizaciones);
        });
      } else if(data.roles[0].nombre === 'ADMA1'){
        this.cotizacionService.listar().subscribe(lista => {
          this.cotizaciones = lista.filter(coti => coti.estado === "AprobadoA1").sort((a,b) => (a.idCotizacion > b.idCotizacion) ? 1 : ((b.idCotizacion > a.idCotizacion) ? -1 : 0));
          this.dataSource = new MatTableDataSource(this.cotizaciones);
        });
      } else if(data.roles[0].nombre === 'ADMA2'){
        this.cotizacionService.listar().subscribe(lista => {
          this.cotizaciones = lista.filter(coti => coti.estado === "AprobadoA2").sort((a,b) => (a.idCotizacion > b.idCotizacion) ? 1 : ((b.idCotizacion > a.idCotizacion) ? -1 : 0));
          this.dataSource = new MatTableDataSource(this.cotizaciones);
        });
      } else if(data.roles[0].nombre === 'ADMA3'){
        this.cotizacionService.listar().subscribe(lista => {
          this.cotizaciones = lista.filter(coti => coti.estado === "AprobadoA3").sort((a,b) => (a.idCotizacion > b.idCotizacion) ? 1 : ((b.idCotizacion > a.idCotizacion) ? -1 : 0));
          this.dataSource = new MatTableDataSource(this.cotizaciones);
        });
      } else {
        this.cotizacionService.listarPorEstado().subscribe(data => {
          this.cotizaciones = data;
          this.dataSource = new MatTableDataSource(this.cotizaciones);
        });
      }
    });
  }

}
