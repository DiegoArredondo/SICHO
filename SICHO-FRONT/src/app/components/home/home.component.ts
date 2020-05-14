import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  guardarEnabled = false


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

  horasPorSemana = 0

  constructor(private router: Router, private apiService : ApiService) {

  }
  ngOnInit(): void {

  let user = environment.user

    if(!user){
      this.router.navigate(["login"])
      return
    }

    debugger;

    let horasClase = 0
    user.scheduleToProgram.forEach((subj: { durationMinutes: number; }) => {
      horasClase += subj.durationMinutes/60
    });

    this.horasProgramadas = horasClase + user.adviserHours + user.classPrepHours

    if(this.horasProgramadas>40){
      this.horasExtra = this.horasProgramadas -40
    }

    this.horasPorSemana = environment.user.classPrepHours
    
    this.contratacionSeleccionada = environment.user.contractType
    this.distribucionSeleccionada = environment.user.investigationLvl
    
    this.determinarHorasDistribucion()
    this.determinarHorasContratacion()
    
  }

  capturarContratacion() {
    //Pasamos el valor seleccionado a la variable seleccionada
    this.seleccionContratacion = this.contratacionSeleccionada;
  }

  capturarDistribucion() {
    this.seleccionDistribucion = this.distribucionSeleccionada;
  }

  setHorasInvestigacion(event) {
    this.horasPorSemana = event.target.value;

    if(this.contratacionSeleccionada && this.horasPorSemana && this.distribucionSeleccionada) this.guardarEnabled = true;
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

    this.horasPorSemana = this.hrsInvestigacionMin
    if(this.horasInvestigacionSemanales && this.horasPorSemana && this.clasesporProgramar) this.guardarEnabled = true;
    /* setTimeout(() => {
      this.contratacionSeleccionada = this.tipoContratacion[Number.parseInt(this.contratacionSeleccionada) -1].text
      setTimeout(() => {
        this.contratacionSeleccionada = this.tipoContratacion[Number.parseInt(this.contratacionSeleccionada) -1].text
      }, 100);
    }, 100); */
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
    if(this.contratacionSeleccionada && this.horasPorSemana && this.distribucionSeleccionada) this.guardarEnabled = true;
    /* setTimeout(() => {
      this.distribucionSeleccionada = this.tipoDistribucion[Number.parseInt(this.distribucionSeleccionada)-1].text
    }, 100); */
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

  submitSchedule() {
    // Obtener el usuario en la BD de ITSON
    this.router.navigate(["schedule"])
  }

  guardarDatos(){
    if(this.guardarEnabled)
    this.apiService.post(ApiService.actualizarUsuario, {"id": environment.user.id, "contractType": this.contratacionSeleccionada, "investigationLvl": this.distribucionSeleccionada, "adviserHours": this.asesoriasporProgramar, "classPrepHours": this.horasPorSemana}).subscribe(data =>{
      if(data){
        if(data.status == "updated"){
          alert("Información guardada con éxito")
          environment.user.contractType = this.contratacionSeleccionada
          environment.user.investigationLvl = this.distribucionSeleccionada
          environment.user.classPrepHours = this.horasPorSemana
          environment.user.adviserHours = this.asesoriasporProgramar
        }
      }
    })    
  }
}
