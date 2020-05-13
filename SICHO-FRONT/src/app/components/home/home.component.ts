import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contratacionSeleccionada: string = '0';
  distribucionSeleccionada: string = '0';
  seleccionContratacion: string = '';
  seleccionDistribucion: string = '';
  hrsInvestigacionMax: number = 0;
  hrsInvestigacionMin: number = 0;
  hrsClaseMax: number;
  hrsClaseMin: number;
  hrsAsesorianMax: number;
  hrsAsesorianMin: number;
  hrsGestionAcademicaMax: number;
  hrsGestionAcademicaMin: number;
  selectedRam: number;

  // Aqui va el resultado del slider
  horasInvestigacionEstablecidas: number = 0;


  tipoContratacion: Array<{ text: string, value: number }> = [
    { text: "Profesor Investigador Titular", value: 1 },
    { text: "Profesor Investigador Auxiliar", value: 2 },
    { text: "Profesor Interino", value: 3 },
    { text: "Asistente Academico Administrativo", value: 4 },
  ]

  tipoDistribucion: Array<{ text: string, value: number }> = [
    { text: "Tipo A", value: 1 },
    { text: "Tipo B1", value: 2 },
    { text: "Tipo B2", value: 3 },
    { text: "Tipo C", value: 4 },
    { text: "Tipo D1", value: 5 },
    { text: "Tipo D2", value: 6 },
    { text: "Tipo D3", value: 7 },
    { text: "Tipo D4", value: 8 },
    { text: "Tipo D5", value: 9 },
    { text: "Tipo D6", value: 10 }
  ]

  clasesProgramadas: number = 0;
  clasesporProgramar: number = 0;
  InvProgramadas: number = 0;
  horasInvestigacionSemanales: number = 0;
  asesoriasProgramadas: number = 0;
  asesoriasporProgramar: number = 0;
  gestionAcademicaProgramada: number = 0;
  gestionAcademicaPorProgramar: number = 0;
  horasExtra: number = 0;
  horasProgramadas: number = 0;

  showDropDown: boolean;

  errorMsg;
  id;
  password: any;


  constructor(private router: Router, private apiService: ApiService) {

  }
  ngOnInit(): void {

  let user = environment.user

    debugger;

    let horasClase = 0
    user.scheduleToProgram.forEach((subj: { durationMinutes: number; }) => {
      horasClase += subj.durationMinutes/60
    });

    this.horasProgramadas = horasClase + user.adviserHours + user.classPrepHours

    if(this.horasProgramadas>40){
      this.horasExtra = this.horasProgramadas -40
    }

  }


  capturarContratacion() {
    //Pasamos el valor seleccionado a la variable seleccionada
    this.seleccionContratacion = this.contratacionSeleccionada;
  }

  capturarDistribucion() {
    this.seleccionDistribucion = this.distribucionSeleccionada;
  }

  setHorasInvestigacion(event) {
    this.horasInvestigacionEstablecidas = event.target.value;
  }

  determinarHorasContratacion() {
    //calcula las horas maximas dependiendo el tipo de contratacion
    switch (this.contratacionSeleccionada) {
      case '1':
        this.hrsInvestigacionMax = 20;
        this.hrsInvestigacionMin = 4;
        this.horasInvestigacionSemanales = 20;
        break;
      case '2':
        this.hrsInvestigacionMax = 20;
        this.hrsInvestigacionMin = 4;
        this.horasInvestigacionSemanales = 20;
        break;
      case '3':
        this.hrsInvestigacionMax = 6;
        this.hrsInvestigacionMin = 0;
        this.horasInvestigacionSemanales = 6
        break;
      case '4':
        this.hrsInvestigacionMax = 6;
        this.hrsInvestigacionMin = 0;
        this.horasInvestigacionSemanales = 6
        break;
    }

    this.horasInvestigacionEstablecidas = this.hrsInvestigacionMin
  }

  determinarHorasDistribucion() {
    //calcula las horas maximas dependiendo el tipo de distribucion
    switch (this.distribucionSeleccionada) {
      case '1':
        this.hrsClaseMax = 15;
        this.hrsClaseMin = 6;
        this.hrsAsesorianMax = Math.round(this.hrsClaseMax / 3);
        this.hrsAsesorianMin = Math.round(this.hrsClaseMin / 3);
        this.hrsGestionAcademicaMax = Math.round(this.hrsClaseMax / 3);
        this.hrsGestionAcademicaMin = Math.round(this.hrsClaseMin / 3);
        this.clasesporProgramar = this.hrsClaseMax;
        this.asesoriasporProgramar = this.hrsAsesorianMax;
        this.gestionAcademicaPorProgramar = this.hrsGestionAcademicaMax;
        break;
      case '2':
        this.hrsClaseMax = 12;
        this.hrsClaseMin = 6;
        this.hrsAsesorianMax = Math.round(this.hrsClaseMax / 3);
        this.hrsAsesorianMin = Math.round(this.hrsClaseMin / 3);
        this.hrsGestionAcademicaMax = Math.round(this.hrsClaseMax / 3);
        this.hrsGestionAcademicaMin = Math.round(this.hrsClaseMin / 3);
        this.clasesporProgramar = this.hrsClaseMax;
        this.asesoriasporProgramar = this.hrsAsesorianMax;
        this.gestionAcademicaPorProgramar = this.hrsGestionAcademicaMax;
        break;
      case '3':
        this.hrsClaseMax = 12;
        this.hrsClaseMin = 6;
        this.hrsAsesorianMax = Math.round(this.hrsClaseMax / 3);
        this.hrsAsesorianMin = Math.round(this.hrsClaseMin / 3);
        this.hrsGestionAcademicaMax = Math.round(this.hrsClaseMax / 3);
        this.hrsGestionAcademicaMin = Math.round(this.hrsClaseMin / 3);
        this.clasesporProgramar = this.hrsClaseMax;
        this.asesoriasporProgramar = this.hrsAsesorianMax;
        this.gestionAcademicaPorProgramar = this.hrsGestionAcademicaMax;
        break;
      case '4':
        this.hrsClaseMax = 9;
        this.hrsClaseMin = 6;
        this.hrsAsesorianMax = Math.round(this.hrsClaseMax / 3);
        this.hrsAsesorianMin = Math.round(this.hrsClaseMin / 3);
        this.hrsGestionAcademicaMax = Math.round(this.hrsClaseMax / 3);
        this.hrsGestionAcademicaMin = Math.round(this.hrsClaseMin / 3);
        this.clasesporProgramar = this.hrsClaseMax;
        this.asesoriasporProgramar = this.hrsAsesorianMax;
        this.gestionAcademicaPorProgramar = this.hrsGestionAcademicaMax;
        break;
      case '5':
        this.hrsClaseMax = 6;
        this.hrsClaseMin = 6;
        this.hrsAsesorianMax = Math.round(this.hrsClaseMax / 3);
        this.hrsAsesorianMin = Math.round(this.hrsClaseMin / 3);
        this.hrsGestionAcademicaMax = Math.round(this.hrsClaseMax / 3);
        this.hrsGestionAcademicaMin = Math.round(this.hrsClaseMin / 3);
        this.clasesporProgramar = this.hrsClaseMax;
        this.asesoriasporProgramar = this.hrsAsesorianMax;
        this.gestionAcademicaPorProgramar = this.hrsGestionAcademicaMax;
        break;
      case '6':
        this.hrsClaseMax = 6;
        this.hrsClaseMin = 6;
        this.hrsAsesorianMax = Math.round(this.hrsClaseMax / 3);
        this.hrsAsesorianMin = Math.round(this.hrsClaseMin / 3);
        this.hrsGestionAcademicaMax = Math.round(this.hrsClaseMax / 3);
        this.hrsGestionAcademicaMin = Math.round(this.hrsClaseMin / 3);
        this.clasesporProgramar = this.hrsClaseMax;
        this.asesoriasporProgramar = this.hrsAsesorianMax;
        this.gestionAcademicaPorProgramar = this.hrsGestionAcademicaMax;
        break;
      case '7':
        this.hrsClaseMax = 6;
        this.hrsClaseMin = 6;
        this.hrsAsesorianMax = Math.round(this.hrsClaseMax / 3);
        this.hrsAsesorianMin = Math.round(this.hrsClaseMin / 3);
        this.hrsGestionAcademicaMax = Math.round(this.hrsClaseMax / 3);
        this.hrsGestionAcademicaMin = Math.round(this.hrsClaseMin / 3);
        this.clasesporProgramar = this.hrsClaseMax;
        this.asesoriasporProgramar = this.hrsAsesorianMax;
        this.gestionAcademicaPorProgramar = this.hrsGestionAcademicaMax;
        break;
      case '8':
        this.hrsClaseMax = 6;
        this.hrsClaseMin = 6;
        this.hrsAsesorianMax = Math.round(this.hrsClaseMax / 3);
        this.hrsAsesorianMin = Math.round(this.hrsClaseMin / 3);
        this.hrsGestionAcademicaMax = Math.round(this.hrsClaseMax / 3);
        this.hrsGestionAcademicaMin = Math.round(this.hrsClaseMin / 3);
        this.clasesporProgramar = this.hrsClaseMax;
        this.asesoriasporProgramar = this.hrsAsesorianMax;
        this.gestionAcademicaPorProgramar = this.hrsGestionAcademicaMax;
        break;
      case '9':
        this.hrsClaseMax = 6;
        this.hrsClaseMin = 6;
        this.hrsAsesorianMax = Math.round(this.hrsClaseMax / 3);
        this.hrsAsesorianMin = Math.round(this.hrsClaseMin / 3);
        this.hrsGestionAcademicaMax = Math.round(this.hrsClaseMax / 3);
        this.hrsGestionAcademicaMin = Math.round(this.hrsClaseMin / 3);
        this.clasesporProgramar = this.hrsClaseMax;
        this.asesoriasporProgramar = this.hrsAsesorianMax;
        this.gestionAcademicaPorProgramar = this.hrsGestionAcademicaMax;
        break;
      case '10':
        this.hrsClaseMax = 6;
        this.hrsClaseMin = 6;
        this.hrsAsesorianMax = Math.round(this.hrsClaseMax / 3);
        this.hrsAsesorianMin = Math.round(this.hrsClaseMin / 3);
        this.hrsGestionAcademicaMax = Math.round(this.hrsClaseMax / 3);
        this.hrsGestionAcademicaMin = Math.round(this.hrsClaseMin / 3);
        this.clasesporProgramar = this.hrsClaseMax;
        this.asesoriasporProgramar = this.hrsAsesorianMax;
        this.gestionAcademicaPorProgramar = this.hrsGestionAcademicaMax;
        break;
    }
  }

  clasesPte() {
    this.clasesporProgramar = this.hrsClaseMax;
  }

  clasesSeleccionadas() {
    this.clasesProgramadas;
  }

  investigacionPte() {
    this.horasInvestigacionSemanales = this.hrsInvestigacionMax;
  }


  submitStatus() {

    if (this.clasesporProgramar == null) {
      this.errorMsg = "Seleccione una opcion en Tipo de Distribucion"
      return;
    }
    if (this.horasInvestigacionSemanales == null) {
      this.errorMsg = "Seleccione una opcion en Tipo de Contratacion"
      return;
    }
    if (this.asesoriasporProgramar  == null) {
      this.errorMsg = "Seleccione una opcion en Tipo de Distribucion"
      return;
    }
    if (this.gestionAcademicaPorProgramar  == null) {
      this.errorMsg = "Seleccione una opcion en Tipo de Distribucion"
      return;
    }

    this.apiService.post(ApiService.updateUserInfo, {"id": this.id, "contractType": this.clasesporProgramar,
          "investigationLvl":this.horasInvestigacionSemanales, "adviserHours": this.asesoriasporProgramar,
          "classPrepHours":this.gestionAcademicaPorProgramar }).subscribe(data => {
      if (data.status == "success") {
        environment.user = data.user
        this.router.navigate(["updateUserInf"])
      } else {
        this.errorMsg = data.msg
      }
    }, error => {
      alert(error)
    })
  }

  submitSchedule() {
    // Obtener el usuario en la BD de ITSON
    this.router.navigate(["schedule"])
  }
}

