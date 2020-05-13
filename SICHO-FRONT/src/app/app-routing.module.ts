import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {path: "", component: LoginComponent} as Route,
  {path: "login", component: LoginComponent} as Route,
  {path: "home", component: HomeComponent} as Route,
  {path: "schedule", component: ScheduleComponent} as Route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
