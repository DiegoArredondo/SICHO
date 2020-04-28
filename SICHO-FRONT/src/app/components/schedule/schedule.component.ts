import { Component, OnInit } from '@angular/core';
import {ProfesorService} from './schedule.service';
import {View, EventSettingsModel, WorkHoursModel} from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {

  constructor(private ProfesorService: ProfesorService) {

   }

   profesor:any = [];

  ngOnInit(): void {
    this.ProfesorService.getProfesor().subscribe(responseProfesor => this.profesor = responseProfesor)
  }

  public setView: View = 'Week'
  public workHours: WorkHoursModel = { start: '8:00', end: '16:00' };
  public eventObject:EventSettingsModel = {
    dataSource: [{
      Subject: "Tutrias",
      StartTime: new Date(2020, 3, 27, 9, 0),
      EndTime: new Date(2020, 3, 27, 10, 0),
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
    }]
  }
}
