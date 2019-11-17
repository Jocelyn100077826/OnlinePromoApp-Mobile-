import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { fileURLToPath } from 'url';

@Injectable()
export class FirebaseService {

  constructor(){}

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  // uploadImage(imageURI, randomId){
  //   return new Promise<any>((resolve, reject) => {
  //     let imageRef = firebase.storage().ref("images/");

  //     this.encodeImageUri(imageURI, function(image64){
  //       imageRef.putString(image64, 'data_url')
  //       .then(snapshot => {
  //         snapshot.ref.getDownloadURL()
  //         .then(res => resolve(res))
  //       }, err => {
  //         reject(err);
  //       })
  //     })
  //   })
  // }

  

  checkTime(i){

    var i;
    
    if (i < 10){
      i = '0' + i;
    }
    return i;
  }

  formatDate(){
    var d = new Date();
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();
    var year = d.getFullYear();
    var time = d.getTime();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('');
  }


  uploadImage(imageURI){

    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();

    // add a zero in front of numbers<10
    m = this.checkTime(m);
    s = this.checkTime(s);

    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('ProfileImages/' + this.formatDate() + h + m + s);
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          resolve(snapshot.downloadURL)
        }, err => {
          reject(err);
        })
      })
    })
  }
}