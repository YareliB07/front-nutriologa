import { Component, OnInit } from '@angular/core';
import { DataView } from 'primeng/dataview';
import { MessageService } from 'primeng/api';
import { PacientesService } from '../../service/pacientes.service';

@Component({
    templateUrl:'./dashboard.component.html',
    providers: [MessageService]

})
export class DashboardComponent implements OnInit {
   

    // products: Product[] = [];

    pacientesDialog: boolean = false;

    actualizarDialog: boolean = false;

    deletepacientesDialog: boolean = false;

    submitted: boolean = false;

    paciente = {
       id_paciente: 0,
       nombre:'',
       ocupacion:'',
       edad: 0,
       genero:'',
       telefono:'',
       fecha_nacimiento: ''
    };

    cols: any[] = [];

    idExpediente: number = 0; 

    expedienteDialog: boolean = false;

    medidasDialog: boolean = false

    fechaExpediente: string = 'ninguna';

    fechaMedidas: string = 'ninguna';

    pacientes = [];

    expediente = {
       antecedentesMedicos:{
         motivo: '',
         saludActual: ''
       },

       antecedentesPatologicos:{
         enfermedadesInfecciosas: [],//lista que contiene enfermedades infecciosas
         otrosInfecciosos:'',
         enfermedadesCronicas: [], //lista que contiene enfermedades cronicas
         otrosCronicos:'',
         consumo: [],
         otroConsumo:'',
         alergias: '',
         cirugias: ''
       },
     
      antecedentesObstetricos:{
        opciones:[],
        periodosMenstruales: '',
        duracionSangrado: 0, //validaar que sea entrada numerica
        anticonceptivos: '',
        cuales: '',
        dosisHormonal: '',
        tiempoUso: 0, //validar que sea numerico 
        controlados: '',
        climaterio: '',
        fechaClimaterio: '', //debe meterse el formato date 
        terapiaHormonal: '',
        dosisTerapia: '',
        nombreDosis: ''
      },

      tratamiento:{
        opciones:[],
        otros:'',
        alopatas:'',
        alternativas:''
      },

      farmacosNutricion:{
        cambiosGusto: '',
        cambiosApetito: '',
        bocaSeca: '',
        nauseas: '',
        diarreaTipo: '',
        constipacion: '',
        hiperglucemia: '',
        lipidos: '',
        dentadura: '', 

      },

      sintomasActuales:{
        banoVeces: '',
        opciones:[],

      },

      problemasNutricion:{
        subioPeso: '',
        cambioPeso: '',
        dietas: '',
        transtornos: '',

      },

      estiloVida:{
        actividadFisica:'',
        ejercicio:{
            tipo:'',
            frecuencia:'',
            semanaVeces:'',
            duracion:'',
            inicio:'',

        },
        indicadoresDieteticos:{
           comidasDia:'',
           preparacionComidas:'',
           cambioRadical: '',
           porque:'',
           como:'',
        },
        apetito:{
            tipo: '',
            masHambre: '',
            menosHambre:'',
            alimentoPreferido:'',
            alimentoMenospreciado:'',
            controlPeso:{
                opcion:'',
                veces:'',
                tipoDieta:'',
                haceCuanto:'',
                razon:'',
                apego:'',
                resultados:'',
                medicamentos:'',
                cuales:'',
                cambioPeso:'',
                cirugiaPeso:'',
                consumoAgua:''
            }

        }
      }

     };


    consulta ={
      pesoafuera:  0,
      tallaafuera: 0,
      tallasentado: 0,
      pesoadentro: 0,
      tallaadentro: 0,
      frecuencia_cardiaca: 0,
      nivel_oxigeno: 0,
      temperatura: 0,
      id_consulta: 0,
      id_paciente:0,
      fecha: 'ninguna'
     }
    
    medidasMusculos ={
      bicep: 0,
      tricep: 0,
      subescapular: 0,
      supriliaco: 0,
      bicep_relajado: 0,
      bicep_contraido: 0,
      antebrazo: 0,
      abdomen: 0,
      muslo: 0,
      gemelo: 0,
      torax: 0,
      gluteo: 0,
      id_musculos: 0,
      id_paciente: 0,
      fecha: 'ninguna'
    }

    medidasOseas= {
      biacromial: 0,
      bitrocanter: 0,
      biliaco: 0,
      torax: 0,
      humero: 0,
      carpo: 0,
      femur: 0,
      tobillo: 0,
      id_huesos: 0,
      id_paciente:0,
      fecha: 'ninguna'
    }





 constructor(private pacientesServices: PacientesService, private messageService: MessageService){ }

   async ngOnInit() { 
       //aquí está la función que retorna todos los pacientes
        let response = await this.pacientesServices.getPacientes();
        this.pacientes = response.data;
        this.pacientes.sort(function (a, b) {
            if (a.id_paciente > b.id_paciente) {
              return 1;
            }
            if (a.id_paciente < b.id_paciente) {
              return -1;
            }
            // a must be equal to b
            return 0;
        });
    }


    async refresh(){

        let response = await this.pacientesServices.getPacientes();
        this.pacientes = response.data;
        
    }

    activeTabIndex: number =0;


       update(paciente: any){ //método para mandar a traer solamente el formulario de actualizar
        this.paciente = { ...paciente };
        this.actualizarDialog = true;
       }


       async updatePaciente() { //método para actualizar el paciente
        console.log(this.paciente)
        try{
            let response= await this.pacientesServices.updatePaciente(this.paciente.id_paciente, this.paciente.nombre, this.paciente.ocupacion, this.paciente.edad, this.paciente.genero, this.paciente.telefono, this.paciente.fecha_nacimiento);
            window.location.reload();
            this.actualizarDialog = false;
                    this.paciente = {
                        id_paciente: 0,
                        nombre:'',
                        ocupacion:'',
                        edad: 0,
                        genero:'',
                        telefono:'',
                        fecha_nacimiento:''
                    }
        }
        catch(error){
            this.messageService.add({  severity: 'error', summary: 'Error', detail: 'Paciente no Creado', life: 3000});
           console.log(error.details);
        }

    }

    deletePacientes(paciente: any) {
        this.deletepacientesDialog = true;
        this.paciente = { ...paciente };
    }

    async confirmDelete() {
        this.deletepacientesDialog = false;
        // this.paciente = this.paciente.filter(val => val.id_paciente !== this.paciente.id_paciente);
        try {
            let response = await this.pacientesServices.deletePaciente(this.paciente.id_paciente);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            this.paciente = {
                id_paciente: 0,
                nombre: '',
                ocupacion: '',
                edad: 0,
                genero: '',
                telefono: '',
                fecha_nacimiento:''
            };
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }
    

  //ESte es el cancelar del formulario create-paciente
   hideDialog() {
 if(this.pacientesDialog){
       this.pacientesDialog = false;
      }else{
        this.actualizarDialog = false; 
      }
       this.submitted = false;
    }

    async savePacientes() {
        this.submitted = true;
         
        if (this.paciente.nombre?.trim()) {
            //respuesta del metodo savePaciente
            try{ 
                let response = await this.pacientesServices.savePaciente(this.paciente.nombre, this.paciente.ocupacion, this.paciente.edad, this.paciente.genero, this.paciente.telefono, this.paciente.fecha_nacimiento)

                if (response.status==200){
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Paciente Creado', life: 3000 });
                    // this.pacientes.push(this.paciente);
                    this.pacientesDialog = false;
                    this.paciente = {
                        id_paciente: 0,
                        nombre:'',
                        ocupacion:'',
                        edad: 0,
                        genero:'',
                        telefono:'',
                        fecha_nacimiento:''
                     };
                     window.location.reload()
                    }
            } catch(error){
                this.messageService.add({  severity: 'error', summary: 'Error', detail: 'Paciente no Creado', life: 3000});
               console.log("hubo un error");
            }
            
        }
    }

    
     
    async openExp(paciente: any) {
         
         this.paciente = { ...paciente };
         try{ 
          let data = await this.pacientesServices.getExpediente(this.paciente.id_paciente)
            this.idExpediente = data.data["id_expediente"]
            this.fechaExpediente = data.data["fecha_modificacion"]??"ninguna"
            this.expediente = JSON.parse(data.data["datos"]) 
            this.submitted = false;
            this.expedienteDialog = true;
          }catch(error){
            this.vaciarExp()
            this.submitted = false;
            this.expedienteDialog = true;
            console.log("hubo un error")
          }
           
    }

    vaciarExp(){
      this.idExpediente = 0
      this.fechaExpediente = 'ninguna',
        this.expediente =   {
           antecedentesMedicos:{
             motivo: '',
             saludActual: ''
           },
    
           antecedentesPatologicos:{
             enfermedadesInfecciosas: [],//lista que contiene enfermedades infecciosas
             otrosInfecciosos:'',
             enfermedadesCronicas: [], //lista que contiene enfermedades cronicas
             otrosCronicos:'',
             consumo: [],
             otroConsumo:'',
             alergias: '',
             cirugias: ''
           },
         
          antecedentesObstetricos:{
            opciones:[],
            periodosMenstruales: '',
            duracionSangrado: 0, //validaar que sea entrada numerica
            anticonceptivos: '',
            cuales: '',
            dosisHormonal: '',
            tiempoUso: 0, //validar que sea numerico 
            controlados: '',
            climaterio: '',
            fechaClimaterio: '', //debe meterse el formato date 
            terapiaHormonal: '',
            dosisTerapia: '',
            nombreDosis: ''
          },
    
          tratamiento:{
            opciones:[],
            otros:'',
            alopatas:'',
            alternativas:''
          },
    
          farmacosNutricion:{
            cambiosGusto: '',
            cambiosApetito: '',
            bocaSeca: '',
            nauseas: '',
            diarreaTipo: '',
            constipacion: '',
            hiperglucemia: '',
            lipidos: '',
            dentadura: '', 
    
          },
    
          sintomasActuales:{
            banoVeces: '',
            opciones:[],
    
          },
    
          problemasNutricion:{
            subioPeso: '',
            cambioPeso: '',
            dietas: '',
            transtornos: '',
    
          },
    
          estiloVida:{
            actividadFisica:'',
            ejercicio:{
                tipo:'',
                frecuencia:'',
                semanaVeces:'',
                duracion:'',
                inicio:'',
    
            },
            indicadoresDieteticos:{
               comidasDia:'',
               preparacionComidas:'',
               cambioRadical: '',
               porque:'',
               como:'',
            },
            apetito:{
                tipo: '',
                masHambre: '',
                menosHambre:'',
                alimentoPreferido:'',
                alimentoMenospreciado:'',
                controlPeso:{
                    opcion:'',
                    veces:'',
                    tipoDieta:'',
                    haceCuanto:'',
                    razon:'',
                    apego:'',
                    resultados:'',
                    medicamentos:'',
                    cuales:'',
                    cambioPeso:'',
                    cirugiaPeso:'',
                    consumoAgua:''
                }
    
            }
          }
    
         };
   
      }


      vaciarConsulta(){
        this.consulta ={
          pesoafuera:  0,
          tallaafuera: 0,
          tallasentado: 0,
          pesoadentro: 0,
          tallaadentro: 0,
          frecuencia_cardiaca: 0,
          nivel_oxigeno: 0,
          temperatura: 0,
          id_consulta: 0,
          id_paciente:0,
          fecha: 'ninguna'
        }

      }

      vaciarMusculos(){
        this.medidasMusculos ={
          bicep: 0,
          tricep: 0,
          subescapular: 0,
          supriliaco: 0,
          bicep_relajado: 0,
          bicep_contraido: 0,
          antebrazo: 0,
          abdomen: 0,
          muslo: 0,
          gemelo: 0,
          torax: 0,
          gluteo: 0,
          id_musculos: 0,
          id_paciente: 0,
          fecha: 'ninguna'
        }
      }

      vaciarHuesos(){
        this.medidasOseas= {
          biacromial: 0,
          bitrocanter: 0,
          biliaco: 0,
          torax: 0,
          humero: 0,
          carpo: 0,
          femur: 0,
          tobillo: 0,
          id_huesos: 0,
          id_paciente:0,
          fecha: 'ninguna'
        }
      }

     async guardarExp(){
        try{ 
            let transformar = JSON.stringify(this.expediente) //esta linea sirve para transformar el json a string
            let response = await this.pacientesServices.saveExpediente(transformar, this.paciente.id_paciente)

            if (response.status==200){
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Expediente Creado', life: 3000 });
                this.expedienteDialog = false;
                this.submitted = false;
                 this.vaciarExp() 
                }
        } catch(error){
            this.messageService.add({  severity: 'error', summary: 'Error', detail: 'Expediente no Creado', life: 3000});
           console.log("hubo un error");
        }
        
      }

     async updateExp(){
        try{ 
            let transformar = JSON.stringify(this.expediente) //esta linea sirve para transformar el json a string
            let response = await this.pacientesServices.updateExpediente(transformar, this.idExpediente, this.paciente.id_paciente)

            if (response.status==200){
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Expediente Creado', life: 3000 });
                this.expedienteDialog = false;
                this.submitted = false;
                 this.vaciarExp() 
                }
        } catch(error){
            this.messageService.add({  severity: 'error', summary: 'Error', detail: 'Expediente no Creado', life: 3000});
           console.log("hubo un error");
        }
        
      }

    async openMed(paciente: any) {
         this.paciente = { ...paciente };
         let consultas = await this.pacientesServices.ObtenerUltimaConsulta(this.paciente.id_paciente)
         if(consultas != undefined){
          this.consulta = consultas
         }else{
          this.vaciarConsulta()
         }

         let musculos = await this.pacientesServices.getUltimosMusculos(this.paciente.id_paciente)
         if(musculos != undefined){
          this.medidasMusculos = musculos
         }else{
          this.vaciarMusculos()
         }

         let huesos = await this.pacientesServices.getUltimosHuesos(this.paciente.id_paciente)
         if(huesos != undefined){
          this.medidasOseas = huesos
         }else{
          this.vaciarHuesos()
         }
         this.submitted = false;
         this.medidasDialog = true;
     }

   
   async saveConsulta(){
    try{ 
      this.consulta.id_paciente = this.paciente.id_paciente
      let response = await this.pacientesServices.saveConsulta(this.consulta)
        if(response.status==200){
          this.consulta = response.data
        }
    }catch(error){
      window.alert("hubo un error");
    }

   }

   async saveMusculos(){
    try{ 
      this.medidasMusculos.id_paciente = this.paciente.id_paciente
      let response = await this.pacientesServices.saveMusculos(this.medidasMusculos)
        if(response.status==200){
          this.consulta = response.data
        }
    }catch(error){
      window.alert("hubo un error");
    }

   }

   async saveHuesos(){
    try{ 
      this.medidasOseas.id_paciente = this.paciente.id_paciente
      let response = await this.pacientesServices.saveHuesos(this.medidasOseas)
        if(response.status==200){
          this.consulta = response.data
        }
    }catch(error){
      window.alert("hubo un error");
    }

   }


    cerrarDialog() {
//         this.expedienteDialog = false;
//         this.submitted = false;
     }


     guardarMedidas(){
       
    }


     openNew() { //metodo para abrir el form de agregar paciente
        this.paciente = { 
            id_paciente: 0,
            nombre:'',
            ocupacion:'',
            edad: 0,
            genero:'',
            telefono:'',
            fecha_nacimiento:''};
        this.submitted = false;
        this.pacientesDialog = true;
    }


    onFilter(dv: DataView, event: Event) {
         dv.filter((event.target as HTMLInputElement).value);
     }
    
    
    selectedInfecciosas: string[] = [];
    selectedCronicas: string[] = [];
    selectedConsumo: string[] = [];
    selectedTratamiento: string[] = [];
    selectedGineco: string[] = [];
    selectedPeriodo: string[] = [];
    selectedSintomas: string[] = [];

    periodo!: string;
    cirugias!: string;
    anticonceptivos!: string;
    climaterio!: string;
    hormonal!: string;
    actividad!: string;
    estiloV!: string;
    apetito!: string;
    controlPeso!: string;
    obtuvoResultado!: string;
    medicamentosBajar!: string;
    cirugiaPeso!: string;

}