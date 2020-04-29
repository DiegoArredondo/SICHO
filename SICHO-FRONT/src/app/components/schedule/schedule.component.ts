import { Component, OnInit, Input } from '@angular/core';
import {ProfesorService} from './schedule.service';
import {Schedule, View, EventSettingsModel, WorkWeekService} from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {

  public eventSettings:EventSettingsModel
  public profesor:any = [];
  horasE=true;
  

  constructor(private ProfesorService:ProfesorService) {

  }

  ngOnInit(): void {
    this.ProfesorService.getProfesor().subscribe(responseProfesor => {
      this.profesor = responseProfesor

      let dataSource = []
      
      //Recorre las materias a programar y las agrega al arreglo
      this.profesor.scheduleToProgram.forEach(stp => {
        dataSource.push({
          Id: 1,
          Subject: stp.subjectName,
          Location: stp.classroom,
          StartTime: new Date(2020, 3, 27, stp.start[0], stp.start[1]),
          EndTime: new Date(2020, 3, 27, stp.end[0], stp.end[1]),
          isReadOnly:true,
          RecurrenceRule: "FREQ=WEEKLY;BYDAY="+stp.days.toString()+";INTERVAL=1;"
        })
      });
      // Inicializa eventSettings con el arreglo de materias
      this.eventSettings = {
        dataSource:dataSource   
      };
    })
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
