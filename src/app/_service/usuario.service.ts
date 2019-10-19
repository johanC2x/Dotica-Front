import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HOST } from '../_shared/var.constants';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: string = `${HOST}/user`;

  constructor(private http:HttpClient ) { }

  listar(){
    return this.http.get<any>(`${this.url}`);
  }

  obtenerPorNick(nick: any){
    return this.http.get<any>(`${this.url}/nick/${nick}`);
  }

  registrar(req: any){
    return this.http.post<any>(`${this.url}`,req);
  }
  
}
