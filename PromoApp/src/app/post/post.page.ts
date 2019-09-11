import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {AngularFirestore} from '@angular/fire/firestore'
import {UserService} from '../user.service'
import { firestore} from 'firebase/app'

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  postID: string
  post
  postReference
  heartType: string = "heart-empty"
  sub

  constructor(private route: ActivatedRoute,
              private afs: AngularFirestore,
              private user: UserService) {
  }

  toggleHeart(){
    if(this.heartType == 'heart-empty'){
      this.postReference.update({
        likes:firestore.FieldValue.arrayUnion(this.user.getUID())
      })
    }else{
      this.postReference.update({
        likes:firestore.FieldValue.arrayRemove(this.user.getUID())
      })
    }
  }

  ngOnInit() {
      this.postID = this.route.snapshot.paramMap.get('id')
      this.postReference = this.afs.doc(`posts/${this.postID}`)
      this.sub = this.postReference.valueChanges().subscribe(val => {
        this.post = val
        this.heartType = val.likes.includes(this.user.getUID())? 'heart' : 'heart-empty'
      })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}
