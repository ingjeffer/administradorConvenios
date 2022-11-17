
import { Component, OnInit } from '@angular/core';
import { AdministradorService } from './services';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.sass']
})
export class AdministradorComponent implements OnInit {

  

  constructor(private _administradorService: AdministradorService) { }

  ngOnInit(): void {
  }

}
