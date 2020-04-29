import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  tipoContratacion: Array<{ text:string, value: number}> = [
    {text: "Profesor Investigador Titular", value: 1},
    {text: "Profesor Investigador Auxiliar", value: 2},
    {text: "Profesor Interino", value: 3},
    {text: "Asistente Académico Administrativo", value: 4},
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

  constructor(private router: Router) {

  }
  ngOnInit(): void {
  }

  submitSchedule(){
   

    // Obtener el usuario en la BD de ITSON
    this.router.navigate(["schedule"])
  }

}
