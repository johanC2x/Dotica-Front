import { HOST } from './../_shared/var.constants';
import { HttpClient } from '@angular/common/http';
import { Tipoentidad } from 'src/app/_model/tipoentidad';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoentidadService {

tipoEntidadesCambio = new Subject<Tipoentidad[]>();
mensajeCambio = new Subject<string>();

url: string = `${HOST}/tipoEntidades`;

constructor(private http:HttpClient) { }

listar() {
  return this.http.get<Tipoentidad[]>(this.url);
}

listarTipoEntidadPorId(id: number) {
  return this.http.get<Tipoentidad>(`${this.url}/${id}`);
}

registrar(tipoentidad: Tipoentidad) {
  return this.http.post(this.url, tipoentidad);
}

modificar(tipoentidad: Tipoentidad) {
  return this.http.put(this.url, tipoentidad);
}

eliminar(id: number) {
  return this.http.delete(`${this.url}/${id}`);
}

}
