import { Injectable } from '@angular/core';
import axios from 'axios';
import * as moment from 'moment';


@Injectable({providedIn:"root"})
export class GraficasServices {

    constructor() { }
    url='https://fastapi-service-fhatimareyes.cloud.okteto.net/' 
    
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



