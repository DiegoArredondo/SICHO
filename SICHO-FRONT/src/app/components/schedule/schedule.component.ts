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
  
  

>>>>>>> master

  constructor(private ProfesorService:ProfesorService) {

  }

  ngOnInit(): void {
    this.ProfesorService.getProfesor().subscribe(responseProfesor => this.profesor = responseProfesor)
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
      }
    ]
  };

  imprimirHorario(){
    window.print();
  }

  alertaHoras(HorasE){
    if(HorasE>40){
      alert('Esta programando horas extra')
    }else{
      alert('Esta programando horas base')
    }
  }
  */
}
