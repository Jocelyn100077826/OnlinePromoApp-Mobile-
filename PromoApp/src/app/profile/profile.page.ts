import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http'
import { AngularFirestore } from '@angular/fire/firestore'
import {UserService} from '../user.service';
import {firestore} from 'firebase/app'
import {AlertController} from '@ionic/angular'
import {Router} from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit{

  imageURL: string
  desc: string
  busy: boolean =false
  profileURL: string
  mainuser
  sub
  profilePic: string

  username: string

  @ViewChild('fileButton') fileButton

  constructor(
    public http: Http,
    public afstore: AngularFirestore,
    public user: UserService,
    public alertController: AlertController,
    public router: Router) {

    this.mainuser = afstore.doc(`users/${user.getUID()}`)

    this.sub = this.mainuser.valueChanges().subscribe(event => {
      this.username = event.username
      this.profilePic = event.profilePic
    })


    // if(!this.profilePic){
      // this.profilePic = "2769e565-594c-491d-af2b-4678c4af2897"
    // }
    }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }

  ngOnInit(){
  }

  async createPost(){
    this.busy = true
    const image = this.imageURL
    const desc = this.desc

    this.afstore.doc(`users/${this.user.getUID()}`).update({
      posts: firestore.FieldValue.arrayUnion(image) // unique id
    })

    this.afstore.doc(`posts/${image}`).set({
      desc,
      author: this.user.getUsername(),
      likes:[]
    })

    this.busy = false
    this.imageURL = ""
    this.desc = ""

    const alert = await this.alertController.create({
      header: 'Done',
      message: 'Your post has been submitted',
      buttons: ['Cool']
    })

    await alert.present()

    this.router.navigate(['/tabs/home'])
  }


  uploadFile(){
    this.fileButton.nativeElement.click()
  }

  fileChanged (event){

    this.busy = true

    const files = event.target.files
    console.log(files)

    const data = new FormData()
    data.append('file', files[0])
    data.append('UPLOADCARE_STORE','1')
    data.append('UPLOADCARE_PUB_KEY','f49b7b74d9cfddb1eb86')

    this.http.post('https://upload.uploadcare.com/base/',data).subscribe(event => {
      console.log(event)
      this.imageURL = event.json().file
      this.busy = false
    })
  }

}
