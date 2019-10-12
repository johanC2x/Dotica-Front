import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-usuarioregistro',
  templateUrl: './usuarioregistro.component.html',
  styleUrls: ['./usuarioregistro.component.css']
})
export class UsuarioregistroComponent implements OnInit {

  form: FormGroup;

  constructor(
    private builder: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.builder.group({
      'id': new FormControl(0),
      'username': new FormControl(''),
      'nombres': new FormControl(''),
      'password': new FormControl(''),
      'password2': new FormControl('')
    });
  }

  registrar(){
    
  }

  limpiar(){
    
  }

}
