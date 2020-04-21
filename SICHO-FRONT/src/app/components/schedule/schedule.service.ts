import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()

export class ProfesorService{
    constructor(private http:HttpClient){

    }

    private url:string = "http://localhost:3000/profesor" ;

    getProfesor() {
        return this.http.get(this.url);
    }
}