import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http'
import { AngularFirestore } from '@angular/fire/firestore'
import {UserService} from '../user.service';
import {firestore} from 'firebase/app'
import {AlertController,  ModalController, NavController, NavParams} from '@ionic/angular'
import {Router} from '@angular/router'
import { ToastController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { FirebaseService } from '../service/firebase.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { ActionSheetController } from '@ionic/angular';

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
  uid: string

  croppedImagepath = "";
  editabout = '';
  titleArray = {};
  image: any;
  aboutArray = [''];
  

  constructor(
    public http: Http,
    public afstore: AngularFirestore,
    public user: UserService,
    public alertController: AlertController,
    public router: Router,
    public file: File,
    
    private imagePicker: ImagePicker,
    public cropService: Crop,
    public toastCtrl: ToastController,
    private firebaseService: FirebaseService,
    private webview: WebView,
    public fireAuth: AngularFireAuth,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    public modalCtrl: ModalController,
    private navCtrl: NavController) {

    this.titleArray = [
      {'title1':'About'},
      {'title2':'Gender'},
      {'title3':'Contact'}
  ]

  this.mainuser = afstore.doc(`users/${user.getUID()}`)
  console.log(this.mainuser);

  this.sub = this.mainuser.valueChanges().subscribe(event => {
    
    this.username = event.username
    this.profilePic = event.profilePic
  })


    // if(!this.profilePic){
      // this.profilePic = "2769e565-594c-491d-af2b-4678c4af2897"
    // }
    }

  
  ngOnInit(){

    this.croppedImagepath = 'https://firebasestorage.googleapis.com/v0/b/onlinepromoapp.appspot.com/o/userprofile.png?alt=media&token=38f5ca47-5591-4a9c-98e2-4ff9f4b91039';
  }

  
  async editAbout(currentName, index) {
    let alert = await this.alertController.create({
      header: 'Edit About',
      message: 'edit your information',
      inputs: [
        {
          placeholder: currentName
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: data => {
            if (data[0].length === 0) {
              this.aboutArray[index] = currentName;
            } else {
              this.aboutArray[0] = data[0];
            }
          }
        },
        {
          text: 'Delete',
          handler: data => {
            this.aboutArray[index]= "";
          }
        }
      ]
    });
    await alert.present();
   }

   ngOnDestroy(){
    this.sub.unsubscribe()
  }

    // fileChanged (event){

  //   this.busy = true

  //   const files = event.target.files
  //   console.log(files)

  //   const data = new FormData()
  //   data.append('file', files[0])
  //   data.append('UPLOADCARE_STORE','1')
  //   data.append('UPLOADCARE_PUB_KEY','bb32f8bcf74a6c19b8fd')

  //   this.http.post('https://upload.uploadcare.com/base/',data).subscribe(event => {
  //     console.log(event)
  //     this.imageURL = event.json().file
  //     this.busy = false
   
  //   })
  // }

  pickImage(sourceType) {
    const options: CameraOptions = {
    quality: 50,
    sourceType: sourceType,
    //allowEdit: true,
    //targetWidth:820,
    correctOrientation: true,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    // let base64Image = 'data:image/jpeg;base64,' + imageData;
    this.cropImage(imageData)
    
    }, error => {
    // Handle error
    this.presentToast();
    });
    }
 
    async presentToast() {
      const toast = await this.toastCtrl.create({
        message: 'No image selected',
        duration: 2000
      });
      toast.present();
    }
  
    async openImagePickerCrop() {
      const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [{
          text: 'Load from Library',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
        ]
      });
      await actionSheet.present();
    }

 
  cropImage(imgPath) {
    this.cropService.crop(imgPath, { quality: 50 })
      .then(
        newPath => {
          this.showCroppedImage(newPath.split('?')[0])
          this.uploadImageToFirebase(newPath)
        },
        error => {
          alert('Error cropping image' + error);
        }
      );
  }

  showCroppedImage(ImagePath){
    
    var copyPath = ImagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];
  
     this.file.readAsDataURL(filePath,imageName).then(base64=>{
         this.croppedImagepath = base64;
     },error=>{
      alert('Error in showing image' + error);
     });
   }
 
 
     async uploadImageToFirebase(image){
 
       const toast = await this.toastCtrl.create({
         message: 'Image was updated successfully',
         duration: 3000
       });
 
 
       let image_src = this.webview.convertFileSrc(image);
 
     //uploads img to firebase storage
     this.firebaseService.uploadImage(image_src)
     .then(photoURL => {
       this.image = photoURL;
       toast.present();
     }, err =>{
       console.log(err);
     })
   }
 
   logout(){
     this.fireAuth.auth.signOut().then(()=>{
       this.router.navigate(["/login"]);
     })
   }
 

}
