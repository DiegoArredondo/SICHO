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

  public eventSettings: EventSettingsModel = {
    dataSource: [
      {
        Id: 1,
        Subject: "Ayuda", /*profesor.scheduleToProgram.subjectName*/
        Location: 'USA',
        StartTime: new Date(2020, 3, 27, 9, 30),
        EndTime: new Date(2020, 3, 27, 11, 0),
        isReadOnly:true,
      },
      {
        Id: 2,
        Subject: "Tu sabia, lo que habia beibe", /*profesor.scheduleToProgram.subjectName*/
        Location: 'Ella es una bandolera',
        StartTime: new Date(2020, 3, 27, 9, 30),
        EndTime: new Date(2020, 3, 27, 11, 0),
        isReadOnly:true,
      }

    ]   
  };  
  
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

   

 /*
 export class RemoteDataComponent {
    public selectedDate: Date = new Date(2017, 5, 5);
    public currentView: View = 'Week';
    public readonly: boolean = true;
    private dataManger: DataManager = new DataManager({
        url: 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
        adaptor: new WebApiAdaptor,
        crossDomain: true
    });
 */
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
