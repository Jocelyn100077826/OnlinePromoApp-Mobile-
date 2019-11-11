import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import {UserService} from '../user.service';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ""
  password: string = ""

  isPassword: boolean

  constructor(public afAuth: AngularFireAuth, private router: Router, public user: UserService,
    private firebaseDynamicLinks: FirebaseDynamicLinks) { }

  ngOnInit() {
    this.isPassword = true;

    
  }

  async login(){
    const {username,password} = this
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username ,password)

      if (res.user){

        this.user.setUser({
          username,
          uid: res.user.uid,
          vault: []
        })

        console.log("Welcome " + username)
        this.router.navigate(['/tabs'])
      }

    }catch(err){
      console.dir(err)
      if(err.code == "auth/user-not-found"){
        console.log("User not found")
        document.getElementById("error").innerHTML = "No user with this email";
        
      }else if(err.code == "auth/wrong-password"){
        document.getElementById("error").innerHTML = "Incorrect Password Or Email";
      }else{
        
        document.getElementById("error").innerHTML = err.message;
      }


    }
  } 

  showpw(){
    if(this.isPassword === true){
        this.isPassword = false;
    }
    else{
        this.isPassword = true;
    }
  }

  checkmine(){
    this.firebaseDynamicLinks.onDynamicLink()
  .subscribe((res: any) => console.log(res), (error:any) => console.log(error));

  }
  
}
