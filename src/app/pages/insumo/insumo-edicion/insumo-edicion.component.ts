import { MatSnackBar } from '@angular/material';
import { Marca } from './../../../_model/marca';
import { ProveedorinsumoService } from 'src/app/_service/proveedorinsumo.service';
import { MarcaService } from './../../../_service/marca.service';
import { InsumoService } from './../../../_service/insumo.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Insumo } from 'src/app/_model/insumo';
import { Proveedorinsumo } from 'src/app/_model/proveedorinsumo';


@Component({
  selector: 'app-insumo-edicion',
  templateUrl: './insumo-edicion.component.html',
  styleUrls: ['./insumo-edicion.component.css']
})
export class InsumoEdicionComponent implements OnInit {

  insumo: Insumo;
  marcas: Marca[] = [];
  proveedorinsumos: Proveedorinsumo [] = [];
  idMarcaSeleccionada: number;
  idProveedorInsumoSeleccionada: number;
  form: FormGroup;
  edicion: boolean;
  id: number;

  descripcion = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;


  constructor(private builder: FormBuilder, private insumoService: InsumoService, private proveedorinsumoService: ProveedorinsumoService, private marcaService: MarcaService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.filteredOptions = this.descripcion.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    console.log("everth valor de description"+this.filteredOptions);


    console.log("everth 1");
    this.form = this.builder.group({
      'id': new FormControl(0),
      'nombre': new FormControl(''),
      'marca': new FormControl(),
      'proveedorInsumo': new FormControl(),
      'descripcion': new FormControl('')
    });
    console.log("everth 2");
    this.listarMarcas();
    this.listarProveedorInsumos();
    console.log("everth 3");
    this.route.params.subscribe((params: Params) => {
      console.log("everth 4");
      this.id = params['id'];
      this.edicion = this.id != null;
      this.initForm();
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  initForm() {

    if (this.edicion) {
      console.log("everth 5");
      //cargar la data del servicio hacia el form
      this.insumoService.listarPorId(this.id).subscribe(data => {
        console.log("everth 6");
        this.form = this.builder.group({
          'id': new FormControl(data.idInsumo),
          'nombre': new FormControl(data.nombre),
          'marca': new FormControl(data.marca.nombre),
          'proveedorInsumo': new FormControl(data.proveedorInsumo.nombreProveedor),
          'descripcion': new FormControl(data.descripcion)
        });
      console.log("everth 7");
      this.idMarcaSeleccionada = data.marca.idMarca;
      this.idProveedorInsumoSeleccionada=data.proveedorInsumo.idProveedorInsumo;
      });

    }
  }
  operar() {
    console.log("everth 8");
    //aqui cuando mandes a registrar tienes que crear un objeto marca
    let marcaSeleccion = new Marca();
    marcaSeleccion.idMarca = this. idMarcaSeleccionada;
    let proveedorSeleccion = new Proveedorinsumo();
    proveedorSeleccion.idProveedorInsumo = this. idProveedorInsumoSeleccionada;
    //y ese objeto local usarlo para tus futuras llamadas a tus services
    let insum = new Insumo();
    insum.idInsumo = this.form.value['id'];
    insum.nombre = this.form.value['nombre'];
    insum.marca = marcaSeleccion;    
    insum.proveedorInsumo = proveedorSeleccion
    insum.descripcion = this.form.value['descripcion'];
    if (this.edicion) {
      console.log("everth 9");
      this.insumoService.modificar(insum).subscribe(() => {
        this.insumoService.listar().subscribe(data => {
          this.insumoService.insumoCambio.next(data);
          this.insumoService.mensajeCambio.next('SE MODIFICO');
        });
      });
    } else {
      console.log("everth 10");
      this.insumoService.registrar(insum).subscribe(() => {
        this.insumoService.listar().subscribe(data => {
          this.insumoService.insumoCambio.next(data);
          this.insumoService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }
    console.log("everth 11");
    this.router.navigate(['insumo']);  
  }
  listarMarcas() {
    console.log("everth 12");
    this.marcaService.listar().subscribe(data => {
      this.marcas = data;
    })
  }
  listarProveedorInsumos() {
    console.log("everth 13");
    this.proveedorinsumoService.listar().subscribe(data => {
      this.proveedorinsumos = data;
    })
  }

}
