import { Component, OnInit } from '@angular/core';
import {ProfesorService} from './schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  constructor(private ProfesorService: ProfesorService) {

   }

   profesor:any = [];

  ngOnInit(): void {
    this.ProfesorService.getProfesor().subscribe(responseProfesor => this.profesor = responseProfesor)
  }

}
