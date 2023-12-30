import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { PacientesService } from 'src/app/demo/service/pacientes.service';
import { GraficasServices } from 'src/app/demo/service/graficas.service';
import { MessageService } from 'primeng/api';

@Component({
    templateUrl: './chartsdemo.component.html',
    providers: [MessageService]
})
export class ChartsDemoComponent implements OnInit, OnDestroy {

    paciente = {
        id_paciente: 0,
        nombre:'',
        ocupacion:'',
        edad: 0,
        genero:'',
        telefono:'',
        fecha_nacimiento: ''
     };
      
    pacientes = [];

    sugerencias = [];

    consultas = [];

    musculos = [];

    huesos = [];

    imc: number = 0;

    nombre: string = '';

    id: number = 0;

    lineData: any;

    barData: any;

    barData2:any;

    lineOptions: any;

    barOptions: any;

    barOptions2:any;

    subscription: Subscription;

    constructor(public layoutService: LayoutService, private pacientesServices: PacientesService, private graficasServices: GraficasServices, private messageService: MessageService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(config => {
            this.initCharts();
        });
    }

   async ngOnInit() {
        this.initCharts();
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

    
    onFilter(event: Event) {
     this.sugerencias=this.pacientes.filter(p=>p.nombre.toLowerCase().indexOf((event['query']).toLowerCase()) > -1);
    } //funcion que permite filtrar los nombres de los pacientes

    async getData(){
      if(this.paciente != null && this.paciente.id_paciente != 0){
        this.consultas = await this.graficasServices.getConsultas(this.paciente.id_paciente)
        this.musculos = await this.graficasServices.getMusculos(this.paciente.id_paciente)
        this.huesos = await this.graficasServices.getHuesos(this.paciente.id_paciente)
        this.calcularIMC()
        this.nombre = this.paciente.nombre;
        this.initCharts()
        
    }else{
        this.messageService.add({  severity: 'warn', summary: 'Warn', detail: 'Selecciona primero un paciente', life: 3000}); 
    }
    }


    calcularIMC(){
        if(this.consultas.length > 0){
            let consulta = this.consultas[this.consultas.length-1]
            let peso = consulta['pesoadentro']
            let talla = consulta['tallaadentro']
            this.imc = peso / (talla*talla)
        }else{ ///// SE AUMENTA ESTE ELSE /////
            this.imc=0;
        }
    }


    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        ///Primera grafica (Pliegues)
        let dataBar=[];
        let val = 900;
        for(let i=0; i<this.musculos.length; i++){
            let info={
                label: '',
                backgroundColor: documentStyle.getPropertyValue('--teal-'+val),
                borderColor: documentStyle.getPropertyValue('--primary-'),
                data: []
            }
            info.label="Cita "+(i+1)+": "+this.musculos[i]['fecha']??'';
            info.data.push(this.musculos[i]['bicep']??0);
            info.data.push(this.musculos[i]['tricep']??0);
            info.data.push(this.musculos[i]['subescapular']??0);
            info.data.push(this.musculos[i]['supriliaco']??0);
            info.data.push(this.musculos[i]['abdomen']??0);
            info.data.push(this.musculos[i]['muslo']??0);
            dataBar.push(info);
            val = val-100; 
        }

        this.barData = {
            labels: ['bicep',
                'tricep',
                'subescapular',
                'supriliaco',
                'abdomen',
                'muslo'],
            datasets: dataBar,
        };
        
        this.barOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 800
                        }
                    },
                    grid: {
                        display: true,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };

       

        let dataBar2=[];
        val=900;
        for(let i=0; i<this.musculos.length; i++){
            let info={
                label: '',
                backgroundColor: documentStyle.getPropertyValue('--teal-'+val),
                borderColor: documentStyle.getPropertyValue('--primary-'),
                data: []
            }
            info.label="Cita "+(i+1)+": "+this.musculos[i]['fecha']??'';
            info.data.push(this.musculos[i]['bicep_relajado']??0);
            info.data.push(this.musculos[i]['bicep_contraido']??0);
            info.data.push(this.musculos[i]['antebrazo']??0);
            info.data.push(this.musculos[i]['gemelo']??0);
            info.data.push(this.musculos[i]['torax']??0);
            info.data.push(this.musculos[i]['gluteo']??0);
            dataBar2.push(info);
            val-=100;
        }

        this.barData2 = {
            labels: [
                'bicep relajado',
                'bicep contraido',
                'antebrazo',
                'gemelo',
                'torax',
                'gluteo'],
            datasets: dataBar2,
        };
        
        this.barOptions2 = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 800
                        }
                    },
                    grid: {
                        display: true,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };


       
        ///Segunda (consulta: Frecuencia cardiaca y oxigeno)
        let dataFechas=[]
        let dataFrecuenciaCardiaca=[]
        let dataNivelOxigeno=[]
    
        for(let i=0; i<this.consultas.length; i++){
            dataFechas.push(this.consultas[i]['fecha'])
            dataFrecuenciaCardiaca.push(this.consultas[i]['frecuencia_cardiaca']??0)
            dataNivelOxigeno.push(this.consultas[i]['nivel_oxigeno']??0)
        }
            this.lineData = {
            labels: dataFechas,
            datasets: [
                {
                    label: 'Frecuencia Cardiaca',
                    data: dataFrecuenciaCardiaca,
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--teal-600'),
                    borderColor: documentStyle.getPropertyValue('--teal-600'),
                    tension: .4
                },
                {
                    label: 'Nivel de Oxigeno',
                    data: dataNivelOxigeno,
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--teal-300'),
                    borderColor: documentStyle.getPropertyValue('--teal-300'),
                    tension: .4
                }
            ]
        };

        this.lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 800
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };

    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    
}
