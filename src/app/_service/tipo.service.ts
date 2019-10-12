import { HOST } from './../_shared/var.constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tipo } from '../_model/tipo';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

url: string = HOST;

constructor(private http:HttpClient) { }

listar(){
  return this.http.get<Tipo[]>(`${this.url}/tipos`);
}

listarPorId(tipo:Tipo){
  return this.http.get<Tipo>(`${this.url}/tipos/${tipo.idTipo}`);
}
  
registrar(tipo: Tipo){
  return this.http.post(`${this.url}/tipos`,tipo)
}

modificar(tipo: Tipo){
  return this.http.put(`${this.url}/tipos`,tipo)
}

eliminar(tipo: Tipo){
  return this.http.delete(`${this.url}/tipos/${tipo.idTipo}`);
}
}


