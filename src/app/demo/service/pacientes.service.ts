import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({providedIn:"root"})
export class PacientesService {

    constructor() { }

    url='https://fastapi-service-fhatimareyes.cloud.okteto.net/' 
    async getPacientes() {
       return await axios.get(this.url+'pacientes/')
    }

    async savePaciente(nombre: string, ocupacion:string, edad:number, genero: string, telefono:string){
        return await axios.post(this.url+'pacientes/', 
        { 
        'nombre': nombre,
        'ocupacion':ocupacion,
        'edar': edad,
        'genero': genero,
        'telefono': telefono})
    }

}


