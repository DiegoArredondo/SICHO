import { Component, OnInit, Input } from '@angular/core';
import {ProfesorService} from './schedule.service';
import {Schedule, View, EventSettingsModel, WorkWeekService} from '@syncfusion/ej2-angular-schedule';
import {environment} from "src/environments/environment"

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {

  public eventSettings:EventSettingsModel
  public profesor:any = [];
  /* public profesor:any = environment.user;*/
  horasE=true;
  

  constructor(private ProfesorService:ProfesorService) {

  }

  ngOnInit(): void {
    /*
    let dataSource = []

    this.profesor.scheduleToProgram.forEach(element => {
      dataSource.push({
        Subject:element.subjectName,
        Location:element.classroom,
        StartTime: new Date(2020, 3, 27, element.start[0], element.start[1]),
        EndTime: new Date(2020, 3, 27, element.end[0], element.end[1]),
        isReadOnly: true
      })
    });

    this.eventSettings = {
      dataSource:dataSource   
    };
    */

    this.ProfesorService.getProfesor().subscribe(responseProfesor => {
      this.profesor = responseProfesor

      let dataSource = []
      
      //Recorre las materias a programar y las agrega al arreglo
      this.profesor.scheduleToProgram.forEach(stp => {
        dataSource.push({
          Subject: stp.subjectName,
          Location: stp.classroom,
          StartTime: new Date(2020, 3, 27, stp.start[0], stp.start[1]),
          EndTime: new Date(2020, 3, 27, stp.end[0], stp.end[1]),
          isReadOnly:true,
          RecurrenceRule: "FREQ=WEEKLY;BYDAY="+this.daysContvertion(stp.days)+";INTERVAL=1;"
        })
      });
      // Inicializa eventSettings con el arreglo de materias
      this.eventSettings = {
        dataSource:dataSource   
      };
    })
    
  }

  daysContvertion(daysNumbers = []){
    var daysLetters = []
    daysNumbers.forEach(element => {
      switch(element){
        case 1:
          daysLetters.push("MO");
          break;
        case 2:
          daysLetters.push("TU");
          break;
        case 3:
          daysLetters.push("WE");
          break;
        case 4:
          daysLetters.push("TH");
          break;
        case 5:
          daysLetters.push("WE");
          break;
        default:
          break;
      }
    });
    return daysLetters
  }

  imprimirHorario(){
    window.print();
  }

  alertaHoras(){
    if(this.horasE=true){
      alert('Esta programando horas extra')
    }else{
      alert('Esta programando horas base')
    }
  }
}
