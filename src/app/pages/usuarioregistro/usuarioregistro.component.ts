import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UsuarioService } from '../../_service/usuario.service';
import { MatSnackBar } from '@angular/material';
//import { PassThrough } from 'stream';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../../_service/menu.service';
import { Menu } from '../../_model/menu';
import { Rol } from '../../_model/rol';

@Component({
  selector: 'app-usuarioregistro',
  templateUrl: './usuarioregistro.component.html',
  styleUrls: ['./usuarioregistro.component.css']
})
export class UsuarioregistroComponent implements OnInit {

  form: FormGroup;
  idUsuario = 0;
  idTipoUsuario = 0;
  tipo_usuario = [
    {'idRol':'1','nombre':'ADMIN'},
    {'idRol':'2','nombre':'USER'},
    {'idRol':'4','nombre':'ADMA1'},
    {'idRol':'5','nombre':'ADMA2'},
    {'idRol':'6','nombre':'ADMA3'}
  ];
  idTipoDocumento = 0;
  idMenu = 0;
  tipo_documento = [{'id':'1','nombre':'DNI'},{'id':'2','nombre':'RUC'}];
  usuario : any;
  menus : Menu[];

  menu_temporal : Menu[]; 
  roles : Rol[];

  constructor(
    private route: ActivatedRoute,
    private builder: FormBuilder,
    private service : UsuarioService,
    private menuService : MenuService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.form = this.builder.group({
      'id': new FormControl(0),
      'username': new FormControl(''),
      'nombres': new FormControl(''),
      'password': new FormControl(''),
      'password2': new FormControl(''),
      'edad': new FormControl(0),
      'nrodoc': new FormControl('')
    });
    if(this.route.firstChild !== null && this.route.firstChild !== undefined && this.route.firstChild.snapshot.params['id'] !== undefined){
      let id = this.route.firstChild.snapshot.params['id'];
      this.obtenerPorId(id);
    } else {
      this.listar();
    }
    this.listarMenu();
  }

  listar(){
    this.service.listar().subscribe(data => {
      this.usuario = data[data.length - 1];
      this.idUsuario = this.usuario.idUsuario + 1;
    });
  }

  listarMenu(){
    this.menuService.listar().subscribe(data => {
      this.menus = data;
    });
  }

  obtenerPorId(user){
    this.service.obtenerPorNick(user).subscribe(data => {
      this.form = this.builder.group({
        'id': new FormControl(0),
        'username': new FormControl(data.username),
        'nombres': new FormControl(data.nombres),
        'edad': new FormControl(data.edad),
        'nrodoc': new FormControl(data.nroDocumento)
      });
      this.idUsuario = data.idUsuario;
      this.idTipoUsuario = data.tipoUsuario;
      this.idTipoDocumento = data.tipoDocumento;
    });
  }

  registrar(){
    let is_equal = this.validarContra(this.form.value['password'],this.form.value['password2']);
    if(!is_equal){
      this.snackBar.open('Las contraseña deben ser iguales', "Cerrar", { duration: 2000 });
    } else {
      let tipo = this.tipo_usuario.findIndex(x => x.idRol === this.idTipoUsuario.toString());
      let req = {
        idUsuario: this.idUsuario,
        username:this.form.value['username'],
        password:this.form.value['password'],
        nombres:this.form.value['nombres'],
        enabled:1,
        roles:[this.tipo_usuario[tipo]],
        edad:this.form.value['edad'],
        tipoUsuario:this.idTipoUsuario,
        tipoDocumento:this.idTipoDocumento,
        nroDocumento:this.form.value['nrodoc']
      };
      if(req.roles.length > 0){
        this.menuService.obtenerPorIdMasivo(this.idMenu).subscribe(response_menu => {
          if(response_menu.length > 0){
            response_menu.forEach( (element) => {
              console.log(element.roles[0].idRol);
            });
          }
        },error_menu => {
          this.snackBar.open('Ocurrio un error', "Cerrar", { duration: 2000 });
        });
      }
      return false;
      this.service.registrar(req).subscribe(
        data => {
          this.listar();
          this.snackBar.open('Se registró correctamente', "Cerrar", { duration: 2000 });
      },error => {
          this.snackBar.open('Ocurrio un error', "Cerrar", { duration: 2000 });
      });
    }
  }

  validarContra(passw, passw2){
    let is_equal = true;
    if(passw !== passw2){
      is_equal = false;
    }
    return is_equal;
  }

  limpiar(){
    
  }

}
