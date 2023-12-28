import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DataView } from 'primeng/dataview';
import { PacientesService } from 'src/app/demo/service/pacientes.service';
import { GraficasServices } from 'src/app/demo/service/graficas.service';

@Component({
    templateUrl: './chartsdemo.component.html'
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

    lineData: any;

    barData: any;

    lineOptions: any;

    barOptions: any;

    subscription: Subscription;

    constructor(public layoutService: LayoutService, private pacientesServices: PacientesService, private graficasServices: GraficasServices) {
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
    }else{
        window.alert("selecciona primero un paciente")
    }
    }


    calcularIMC(){
        if(this.consultas.length > 0){
            let consulta = this.consultas[this.consultas.length-1]
            let peso = consulta['pesoadentro']
            let talla = consulta['tallaadentro']
            this.imc = peso / (talla*talla)
        }
    }

    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        this.barData = {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
            datasets: [
                {
                    label: 'Peso primer cita',
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    data: [75, 59, 80, 81, 56, 64, 51]
                },
                {
                    label: 'Peso segunda cita',
                    backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                    borderColor: documentStyle.getPropertyValue('--primary-200'),
                    data: [, 71, 40, 55, 86, 67, 90]
                }
            ]
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
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
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

       

       

        this.lineData = {
            labels: ['Enero', 'Febrrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
            datasets: [
                {
                    label: 'Primer cita',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    tension: .4
                },
                {
                    label: 'Tercera cita',
                    data: [56, 65, 97, 48, 51, 27, 80],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                    borderColor: documentStyle.getPropertyValue('--primary-200'),
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
                        color: textColorSecondary
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
