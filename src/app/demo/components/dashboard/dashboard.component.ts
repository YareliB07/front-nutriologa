import { Component, OnInit } from '@angular/core';
import { DataView } from 'primeng/dataview';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { MessageService } from 'primeng/api';

@Component({
    templateUrl:'./dashboard.component.html',
    providers: [MessageService]

})
export class DashboardComponent implements OnInit {
   

    products: Product[] = [];

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    submitted: boolean = false;

    product: Product = {};

    cols: any[] = [];

    expedienteDialog: boolean = false;

    medidasDialog: boolean = false


    constructor(private productService: ProductService, private messageService: MessageService) { }

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' },
           

        ];
       
    }


    activeTabIndex: number =0;

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.name?.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
    

    openExp() {
        this.submitted = false;
        this.expedienteDialog = true;
    }

    openMed() {
        this.submitted = false;
        this.medidasDialog = true;
    }

    cerrarDialog() {
        this.expedienteDialog = false;
        this.submitted = false;
    }


    guardarMedidas(){
       
    }

    guardarExp(){
       
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
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