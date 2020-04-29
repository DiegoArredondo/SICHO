import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  clasesProgramadas= 10;
  clasesPorProgramar= 10;
  horasInvestigacionSemanales= 10;
  horasExtra= 10;

  horasFaltantes= 10;

  tipoContratacion: string[] = [
    'Profesor Investigador Titular', 'Profesor Investigador Auxiliar', 'Profesor Interino',
    'Asistente Academico Administrativo'
  ];


  tipoDistribucion: string[] = [
    'Tipo A1', 'Tipo B2', 'Tipo C', 
    'Tipo D1', 'Tipo D2', 'Tipo D3',
    'Tipo D4', 'Tipo D5', 'Tipo D6'
  ]
  showDropDown: boolean;

  constructor() {

  }
  ngOnInit(): void {
  }

}
