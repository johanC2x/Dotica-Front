import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PersonaNatural} from "../_model/persona-natural";
import {HOST} from "../_shared/var.constants";



@Injectable({
  providedIn: 'root'
})
export class PersonaNaturalService {

  url: string = HOST;
  constructor(private http:HttpClient) { }

  listar(){

    return this.http.get<PersonaNatural[]>(`${this.url}/personasNaturales`);
  }


}
