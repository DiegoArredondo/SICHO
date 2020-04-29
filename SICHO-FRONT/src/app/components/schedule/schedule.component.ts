import { Component, OnInit, Input } from '@angular/core';
import {ProfesorService} from './schedule.service';
import {Schedule, View, EventSettingsModel, WorkWeekService} from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {

  public profesor:any = [];
  public eventSettings: EventSettingsModel;

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
          Location: 'USA',
          StartTime: new Date(2020, 3, 27, 9, 30),
          EndTime: new Date(2020, 3, 27, 11, 0),
          isReadOnly:true,
        })
      });
      // Inicializa eventSettings con el arreglo de materias
      this.eventSettings = {
        dataSource: dataSource   
      }; 
    })
  }

   

  /*
  public setView: View = 'Week'
  public workHours: WorkHoursModel = { start: '8:00', end: '16:00' };
  public eventObject:EventSettingsModel = {
    dataSource: [{
      EventTitle: "",
      EventStart: new Date(2020, 3, 27, 9, 0),
      EventEnd: new Date(2020, 3, 27, 10, 0),
      isReadOnly: true,
    },{
      Subject: "Introducción al internet de las cosas",
      StartTime: new Date(2020, 3, 28, 8, 30),
      EndTime: new Date(2020, 3, 28, 10, 0),
      isReadOnly: true,
      RecurrenceRule: "FREQ=WEEKLY;BYDAY=TU,TH;INTERVAL=1;"
    },{
      Subject: "Métodos ágiles de desarrollo",
      StartTime: new Date(2020, 3, 28, 11, 30),
      EndTime: new Date(2020, 3, 28, 13, 0),
      isReadOnly: true,
      RecurrenceRule: "FREQ=WEEKLY;BYDAY=TU,TH;INTERVAL=1;"
    },{
      Subject: "Proyecto de campo I",
      StartTime: new Date(2020, 3, 27, 13, 0),
      EndTime: new Date(2020, 3, 27, 16, 0),
      isReadOnly: true,
    },{
      Subject: "Tópico I",
      StartTime: new Date(2020, 3, 29, 13, 0),
      EndTime: new Date(2020, 3, 29, 14, 30),
      isReadOnly: true,
      RecurrenceRule: "FREQ=WEEKLY;BYDAY=WE,FR;INTERVAL=1;"
    },{
      Subject: "Arquitectura de Software",
      StartTime: new Date(2020, 3, 28, 15, 0),
      EndTime: new Date(2020, 3, 28, 16, 30),
      isReadOnly: true,
      RecurrenceRule: "FREQ=WEEKLY;BYDAY=TU,TH;INTERVAL=1;"
    }],
    fields: {
      subject: {name: 'EventTitle', default: 'Tutorias'},
      startTime: {name: 'EventStart'},
      endTime: {name: 'EventEnd'}
    }
  }
  */
}
