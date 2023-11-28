import { Component, OnInit } from '@angular/core';
import { DataView } from 'primeng/dataview';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { MessageService } from 'primeng/api';
import { PacientesService } from '../../service/pacientes.service';

@Component({
    templateUrl:'./dashboard.component.html',
    providers: [MessageService]

})
export class DashboardComponent implements OnInit {
   

    // products: Product[] = [];

    pacientesDialog: boolean = false;

    deletepacientesDialog: boolean = false;

    submitted: boolean = false;

    paciente = {
       nombre:'',
       ocupacion:'',
       edad: 0,
       genero:'',
       telefono:''
    };

    cols: any[] = [];

    expedienteDialog: boolean = false;

    medidasDialog: boolean = false

    pacientes = [];




    constructor(private pacientesServices: PacientesService, private messageService: MessageService) { }

   async ngOnInit() {
       
        let response = await this.pacientesServices.getPacientes();
        this.pacientes = response.data;
       
    }


    async refresh(){

        let response = await this.pacientesServices.getPacientes();
        this.pacientes = response.data;
        
    }

    activeTabIndex: number =0;

//     editProduct(product: Product) {
//         this.product = { ...product };
//         this.productDialog = true;
//     }

//     deleteProduct(product: Product) {
//         this.deleteProductDialog = true;
//         this.product = { ...product };
//     }

//     confirmDelete() {
//         this.deleteProductDialog = false;
//         this.products = this.products.filter(val => val.id !== this.product.id);
//         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
//         this.product = {};
//     }

  //ESte es el cancelar del formulario create-paciente
   hideDialog() {
       this.pacientesDialog = false;
       this.submitted = false;
    }

    async savePacientes() {
        this.submitted = true;
         
        if (this.paciente.nombre?.trim()) {
            //respuesta del metodo savePaciente
            let response = await this.pacientesServices.savePaciente(this.paciente.nombre, this.paciente.ocupacion, this.paciente.edad, this.paciente.genero, this.paciente.telefono)

            if (response.status==200){
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Paciente Creado', life: 3000 });
                this.pacientesDialog = false;
                this.paciente = {
                    nombre:'',
                    ocupacion:'',
                    edad: 0,
                    genero:'',
                    telefono:''
                 };

            }else{
                this.messageService.add({  severity: 'error', summary: 'Error', detail: 'Paciente no Creado', life: 3000});
            };

        }
    }

//     findIndexById(id: string): number {
//         let index = -1;
//         for (let i = 0; i < this.products.length; i++) {
//             if (this.products[i].id === id) {
//                 index = i;
//                 break;
//             }
//         }

//         return index;
//     }

//     createId(): string {
//         let id = '';
//         const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//         for (let i = 0; i < 5; i++) {
//             id += chars.charAt(Math.floor(Math.random() * chars.length));
//         }
//         return id;
//     }
    

     openExp() {
//         this.submitted = false;
//         this.expedienteDialog = true;
    }

     openMed() {
//         this.submitted = false;
//         this.medidasDialog = true;
     }

    cerrarDialog() {
//         this.expedienteDialog = false;
//         this.submitted = false;
     }


     guardarMedidas(){
       
    }

    guardarExp(){
       
    }

     openNew() {
        this.paciente = { 
            nombre:'',
            ocupacion:'',
            edad: 0,
            genero:'',
            telefono:''};
        this.submitted = false;
        this.pacientesDialog = true;
    }


    onFilter(dv: DataView, event: Event) {
//         dv.filter((event.target as HTMLInputElement).value);
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