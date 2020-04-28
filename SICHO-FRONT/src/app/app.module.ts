import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ScheduleComponent } from './components/schedule/schedule.component';

import {ProfesorService} from './components/schedule/schedule.service';
import { ScheduleModule, RecurrenceEditorModule, WeekService, WorkWeekService, DayService } from '@syncfusion/ej2-angular-schedule';
/*
import { FormsModule } from '@angular/forms';
*/
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ScheduleComponent,

  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ScheduleModule, RecurrenceEditorModule 
  ],
  providers: [ProfesorService, WeekService, WorkWeekService, DayService],
  bootstrap: [AppComponent]
})
export class AppModule { }
