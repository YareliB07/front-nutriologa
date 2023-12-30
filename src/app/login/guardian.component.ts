import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "../demo/service/login.service";
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class Guardian implements CanActivate{

    constructor(private loginservice: LoginService, private router: Router){};

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(this.loginservice.isLogin()){
            return true;
            
        }else{
            this.router.navigate(['login']);
            return false;
        }
    }

}