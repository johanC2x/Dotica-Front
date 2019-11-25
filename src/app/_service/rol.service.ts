import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { HOST } from '../_shared/var.constants';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  url: string = HOST;

  constructor(
    private http:HttpClient
  ) { }

  
  
}
