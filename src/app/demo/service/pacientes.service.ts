import { Injectable } from '@angular/core';
import axios from 'axios';
import * as moment from 'moment';


@Injectable({providedIn:"root"})
export class PacientesService {

    constructor() { }

    url='https://fastapi-service-fhatimareyes.cloud.okteto.net/' 
    async getPacientes() {
       return await axios.get(this.url+'pacientes/')
    }

    async savePaciente(nombre: string, ocupacion:string, edad:number, genero: string, telefono:string, fecha_nacimiento: string){
        return await axios.post(this.url+'pacientes/', 
        {
            nombre: nombre,
            edad: edad,
            telefono: telefono,
            genero: genero,
            fecha_nacimiento: fecha_nacimiento,
            ocupacion: ocupacion},{headers:{"Content-Type":"application/json"}}) //una cabezera para comunicarse
    }

    async updatePaciente(id: number, nombre: string, ocupacion:string, edad:number, genero: string, telefono:string, fecha_nacimiento:string){
        return await axios.put(this.url+'pacientes/'+id, 
        {
            nombre: nombre,
            edad: edad,
            telefono: telefono,
            genero: genero,
            fecha_nacimiento: fecha_nacimiento,
            ocupacion: ocupacion},{headers:{"Content-Type":"application/json"}})
    }

   async deletePaciente(id: number){
    return await axios.delete(this.url+'pacientes/'+id)
   }

   async saveExpediente(datos: string, id_paciente: number){
    let fecha = moment(Date.now()).format("YYYY-MM-DD") //variable para darle formato a la fecha de modificacion del Exp
    return await axios.post(this.url+'expedientes/', 
    {
        fecha_modificacion: fecha,
        datos: datos,
        id_paciente: id_paciente},{headers:{"Content-Type":"application/json"}}) //una cabezera para comunicarse
  }
   
  async getExpediente(id:number) {
    return await axios.get(this.url+'expedientes/paciente/'+id)
 }

 async updateExpediente(datos: string, idExpediente: number, id_paciente: number){
    let fecha = moment(Date.now()).format("YYYY-MM-DD") //variable para darle formato a la fecha de modificacion del Exp
    return await axios.put(this.url+'expedientes/'+idExpediente, 
    {
        fecha_modificacion: fecha,
        datos: datos,
        id_paciente: id_paciente
    },{headers:{"Content-Type":"application/json"}}) //una cabezera para comunicarse
  }


  async saveConsulta(parametros: any){
    let fecha = moment(Date.now()).format("YYYY-MM-DD") //variable para darle formato a la fecha de modificacion del Exp
    return await axios.post(this.url+'consultas/', 
    {
        fecha: fecha,
        pesoafuera: parametros.pesoafuera,
        tallaafuera: parametros.tallaafuera,
        tallasentado: parametros.tallasentado,
        pesoadentro: parametros.pesoadentro,
        tallaadentro: parametros.tallaadentro,
        frecuencia_cardiaca: parametros.frecuencia_cardiaca,
        nivel_oxigeno: parametros.nivel_oxigeno,
        temperatura: parametros.temperatura,
        id_paciente: parametros.id_paciente
    },{headers:{"Content-Type":"application/json"}}) //una cabezera para comunicarse
}
  


async saveMusculos(parametros: any){
    let fecha = moment(Date.now()).format("YYYY-MM-DD") //variable para darle formato a la fecha de modificacion del Exp
    return await axios.post(this.url+'medidas_musculos/', 
    {
     bicep: parametros.bicep,
     tricep: parametros.tricep,
     subescapular:parametros.subescapular,
     supriliaco: parametros.supriliaco,
     bicep_relajado: parametros.bicep_relajado,
     bicep_contraido: parametros.bicep_contraido,
     antebrazo: parametros.antebrazo,
     abdomen: parametros.abdomen,
     muslo: parametros.muslo,
     gemelo: parametros.gemelo,
     torax: parametros.torax,
     gluteo: parametros.gluteo,
     id_paciente: parametros.id_paciente,
     fecha: fecha
    },{headers:{"Content-Type":"application/json"}}) //una cabezera para comunicarse
}

async saveHuesos(parametros: any){
    let fecha = moment(Date.now()).format("YYYY-MM-DD") //variable para darle formato a la fecha de modificacion del Exp
    return await axios.post(this.url+'medidas_huesos/', 
    {
     biacromial: parametros.biacromial,
     bitrocanter: parametros.bitrocanter,
     biliaco: parametros.biliaco,
     torax: parametros.torax,
     humero: parametros.humero,
     carpo: parametros.carpo,
     femur: parametros.femur,
     tobillo: parametros.tobillo,
     id_paciente: parametros.id_paciente,
     fecha: fecha
    },{headers:{"Content-Type":"application/json"}}) //una cabezera para comunicarse
}

async ObtenerUltimaConsulta(id: number){
  try {
    let response = await  axios.get(this.url+'consultas/paciente/'+id)
    let indice = response.data.length
    if (indice>0){
        return response.data[response.data.length-1] 
    }
   
  } catch (error) {
    console.log("hubo un error")
  }
}

async getUltimosMusculos(id: number){
  try {
    let response = await  axios.get(this.url+'medidas_musculos/paciente/'+id)
    let indice = response.data.length
    if (indice>0){
        return response.data[response.data.length-1] 
    }
  } catch (error) {
    console.log("hubo un error")
  }
}

async getUltimosHuesos(id: number){
  try {
    let response = await  axios.get(this.url+'medidas_huesos/paciente/'+id)
    let indice = response.data.length
    if (indice>0){
        return response.data[response.data.length-1] 
    }
  } catch (error) {
    console.log("hubo un error")
  }
}

}


