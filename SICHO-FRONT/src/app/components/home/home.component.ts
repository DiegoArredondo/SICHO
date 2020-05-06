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

  contratacionSeleccionada: string = '0';
  distribucionSelecionada: string = '0';
  seleccionContratacion: string='';
  seleccionDistribucion: string='';
  hrsInvestigacionMax: number = 0;
  hrsClasenMax: number;
  hrsAsesoriaMax: number;
  hrsGestionAcademicaMax: number;


  tipoContratacion: Array<{ text:string, value: number}> = [
    {text: "Profesor Investigador Titular", value: 1},
    {text: "Profesor Investigador Auxiliar", value: 2},
    {text: "Profesor Interino", value: 3},
    {text: "Asistente Académico Administrativo con carga", value: 4},
  ]

  tipoDistribucion: Array<{ text:string, value: number}> = [
    {text: "Tipo A", value: 1},
    {text: "Tipo B1", value: 2},
    {text: "Tipo B2", value: 3},
    {text: "Tipo C", value: 4},
    {text: "Tipo D1", value: 5},
    {text: "Tipo D2", value: 6},
    {text: "Tipo D3", value: 7},
    {text: "Tipo D4", value: 8},
    {text: "Tipo D5", value: 9},
    {text: "Tipo D6", value: 10}
  ]
  showDropDown: boolean;

  constructor() {

  }
  ngOnInit(): void {
  }

  capturarContratacion() {
    // Pasamos el valor seleccionado a la variable seleccion1
    this.seleccionContratacion = this.contratacionSeleccionada;
  }

  capturarDistribucion() {
  // Pasamos el valor seleccionado a la variable seleccion1
  this.seleccionDistribucion = this.distribucionSelecionada;
}

  determinarHorasContratacion(){
    //calcula las horas mazimas dependiendo el tipo de contratacion
    switch(this.contratacionSeleccionada){
      case '1':
        this.hrsInvestigacionMax = 20;
        break;
      case '2':
        this.hrsInvestigacionMax = 20;
        break;
      case '3':
        this.hrsInvestigacionMax = 6;
        break;
      case '4':
        this.hrsInvestigacionMax = 6;
        break;
    }
  }

  determinarHorasDistribucion(){
    //calcula las horas maximas dependiendo el tipo de distribbucion
    switch(this.distribucionSelecionada){
      case '1':
        this.hrsClasenMax = 15;
        this.hrsAsesoriaMax = Math.round(this.hrsClasenMax/3);
        this.hrsGestionAcademicaMax = Math.round(this.hrsClasenMax/3);
        break;
      case '2':
        this.hrsClasenMax = 12;
        this.hrsAsesoriaMax = Math.round(this.hrsClasenMax/3);
        this.hrsGestionAcademicaMax = Math.round(this.hrsClasenMax/3);
        break;
      case '3':
        this.hrsClasenMax = 12;
        this.hrsAsesoriaMax = Math.round(this.hrsClasenMax/3);
        this.hrsGestionAcademicaMax = Math.round(this.hrsClasenMax/3);
        break;
      case '4':
        this.hrsClasenMax = 9;
        this.hrsAsesoriaMax = Math.round(this.hrsClasenMax/3);
        this.hrsGestionAcademicaMax = Math.round(this.hrsClasenMax/3);
        break;
      case '5':
        this.hrsClasenMax = 6;
        this.hrsAsesoriaMax = Math.round(this.hrsClasenMax/3);
        this.hrsGestionAcademicaMax = Math.round(this.hrsClasenMax/3);
        break;
      case '6':
        this.hrsClasenMax = 6;
        this.hrsAsesoriaMax = Math.round(this.hrsClasenMax/3);
        this.hrsGestionAcademicaMax = Math.round(this.hrsClasenMax/3);
        break;
      case '7':
        this.hrsClasenMax = 6;
        this.hrsAsesoriaMax = Math.round(this.hrsClasenMax/3);
        this.hrsGestionAcademicaMax = Math.round(this.hrsClasenMax/3);
        break;
      case '8':
        this.hrsClasenMax = 6;
        this.hrsAsesoriaMax = Math.round(this.hrsClasenMax/3);
        this.hrsGestionAcademicaMax = Math.round(this.hrsClasenMax/3);
        break;
      case '9':
        this.hrsClasenMax = 6;
        this.hrsAsesoriaMax = Math.round(this.hrsClasenMax/3);
        this.hrsGestionAcademicaMax = Math.round(this.hrsClasenMax/3);
        break;
      case '10':
        this.hrsClasenMax = 6;
        this.hrsAsesoriaMax = Math.round(this.hrsClasenMax/3);
        this.hrsGestionAcademicaMax = Math.round(this.hrsClasenMax/3);
        break;
    }
  }

}
