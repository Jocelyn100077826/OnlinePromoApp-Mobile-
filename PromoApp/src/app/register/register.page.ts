import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router'
import { auth } from 'firebase/app'

import { AngularFirestore } from '@angular/fire/firestore'

import { AlertController } from '@ionic/angular'
import {UserService} from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username: string = ""
  email: string = ""
  password: string = ""
  cpassword: string = ""

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public alert: AlertController,
    public afstore: AngularFirestore,
    public user: UserService) { }

  ngOnInit() {
  }

  async signup(){
    const {username,email,password,cpassword} = this
    if (password != cpassword){
      this.showAlert("Error","Passwords dont match")
      return console.error("Password doesnt match")
    }
    try{
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email,password)
      if (res){
        this.showAlert("Success","Welcome Aboard!")

        this.afstore.doc(`users/${res.user.uid}`).set({
          username
        })

        this.user.setUser({
          username,
          uid: res.user.uid,
          vault: []
        })


        this.router.navigate(['/tabs'])
      }
    }catch(err){
      this.showAlert("Error",err.message)
      console.dir(err)
    }
  }

  navtologin(){
    this.router.navigate(['/login'])
  }

  async showAlert(header : string, message : string){
    const alert = await this.alert.create({
      header,
      message,
      buttons: ['OK']
    })

    await alert.present()
  }

}
