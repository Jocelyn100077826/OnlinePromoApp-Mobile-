import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
import { AngularFirestore } from '@angular/fire/firestore'
import {UserService} from '../user.service';
import {firestore} from 'firebase/app'
import { Observable } from 'rxjs';
import {Router} from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit{

  userPosts

  constructor(private afs: AngularFirestore, private user: UserService, private router: Router) {
    const posts = afs.doc(`users/${user.getUID()}`)

    this.userPosts = posts.valueChanges()
    // console.log(user.getUID())
    }

    goTo(postID: string){
      this.router.navigate(['/tabs/post/'+ postID])
    }

  ngOnInit() {

  }
}
