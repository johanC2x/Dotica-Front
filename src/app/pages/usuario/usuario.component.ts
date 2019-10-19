import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../_service/usuario.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  displayedColumns = ['usuario','nombre_completo','tipo','acciones'];
  usuarios = [];
  dataSource: MatTableDataSource<any>;

  constructor(
    private usuarioService:UsuarioService,
  ) { }

  ngOnInit() {
    this.listar();
  }

  listar(){
    this.usuarioService.listar().subscribe(data => {
      this.usuarios = data;
      this.dataSource = new MatTableDataSource(this.usuarios);
    });
  }

}
