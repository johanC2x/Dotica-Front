import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CotizacionService } from '../../_service/cotizacion.service';

@Component({
  selector: 'app-cotizacion-edit',
  templateUrl: './cotizacion-edit.component.html',
  styleUrls: ['./cotizacion-edit.component.css']
})
export class CotizacionEditComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private cotizacionService:CotizacionService
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.params.id);
    this.obtenerPorId(this.route.snapshot.params.id);
  }

  obtenerPorId(id: any){
    this.cotizacionService.obtenerPorId(id).subscribe(data => {
      console.log(data);
      //this.cotizaciones = data;
      //this.dataSource = new MatTableDataSource(this.cotizaciones);
    });
  }

}
