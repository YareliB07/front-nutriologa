import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { auth } from '../configurations/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router:Router, private route:ActivatedRoute) { }
  
  provider = new GoogleAuthProvider();

  isLogin(){
    let id=window.localStorage.getItem("idUser");
    if(id!=null){
      return true;
    }else{
      return false;
    }
  }

  async loginGoogle(){
    let response = await signInWithPopup(auth, this.provider);
    if(response!=null){
      const credential = GoogleAuthProvider.credentialFromResult(response);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = response.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      window.localStorage.setItem("idUser", user.uid);
      let responseAPI;
      return true;
    }else{
      return false;
    }
  }

  logout(){
    signOut(auth).then(() => {
      // Sign-out successful.
      window.localStorage.removeItem("idUser");
      this.router.navigate(["/"]);
    }).catch((error) => {
      // An error happened.
    });
  }
}