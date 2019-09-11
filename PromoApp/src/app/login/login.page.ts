import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import {UserService} from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ""
  password: string = ""

  constructor(public afAuth: AngularFireAuth, private router: Router, public user: UserService) { }

  ngOnInit() {
  }

  async login(){
    const {username,password} = this
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username + '@email.com',password)

      if (res.user){

        this.user.setUser({
          username,
          uid: res.user.uid
        })

        console.log("Welcome " + username)
        this.router.navigate(['/tabs'])
      }

    }catch(err){
      console.dir(err)
      if(err.code == "auth/user-not-found"){
        console.log("User not found")
      }
    }
  }

}
