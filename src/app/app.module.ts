import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { ProductService } from './demo/service/product.service';
import { LoginComponent } from './login/login.component';

import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        CardModule,
        InputTextModule,
        ButtonModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
         ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
