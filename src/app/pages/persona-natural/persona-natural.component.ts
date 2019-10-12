import {Component, OnInit, ViewChild} from '@angular/core';
import {PersonaNaturalService} from "../../_service/persona-natural.service";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {PersonaNatural} from "../../_model/persona-natural";

@Component({
  selector: 'app-persona-natural',
  templateUrl: './persona-natural.component.html',
  styleUrls: ['./persona-natural.component.css']
})
export class PersonaNaturalComponent implements OnInit {

  displayedColumns =['idPersonaNatural','nombres','apellidos','acciones'];
  dataSource: MatTableDataSource<PersonaNatural>;
  @ViewChild(MatSort, {static: false})sort:MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator : MatPaginator;
  constructor(private personaNaturalService:PersonaNaturalService) { }

  ngOnInit() {
    this.listar();
  }
  listar(){
    this.personaNaturalService.listar().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator= this.paginator;
    });
  }

  filter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }


}
