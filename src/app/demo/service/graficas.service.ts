import { Injectable } from '@angular/core';
import axios from 'axios';
import * as moment from 'moment';


@Injectable({providedIn:"root"})
export class GraficasServices {

    constructor() { }
    url='http://127.0.0.1:8000/' 
    
async getConsultas(id: number){
  try {
    let response = await  axios.get(this.url+'consultas/paciente/'+id)
    return response.data 
  } catch (error) {
    console.log("hubo un error")
  }
}

async getMusculos(id: number){
  try {
    let response = await  axios.get(this.url+'medidas_musculos/paciente/'+id)
    return response.data 
  } catch (error) {
    console.log("hubo un error")
  }
}

async getHuesos(id: number){
  try {
    let response = await  axios.get(this.url+'medidas_huesos/paciente/'+id)
    return response.data 
  } catch (error) {
    console.log("hubo un error")
  }
}




}



