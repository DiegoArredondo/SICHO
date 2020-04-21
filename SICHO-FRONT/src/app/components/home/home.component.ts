import { Component, OnInit } from '@angular/core';

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

  tipoContratacion= "Tiempo completo";
  nivelInvestigacion= "Doctorado";

  constructor() { }

  ngOnInit(): void {
  }

}
