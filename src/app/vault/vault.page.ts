import { Component } from '@angular/core';
import { Http } from '@angular/http'
import { AngularFirestore } from '@angular/fire/firestore'
import {UserService} from '../user.service';
import{Promo, PromotionsService}from '../promotions.service';
import {firestore} from 'firebase/app'
import {AlertController} from '@ionic/angular'
import {Router} from '@angular/router'
import { VaultService} from '../vault.service';

@Component({
  selector: 'app-vault',
  templateUrl: 'vault.page.html',
  styleUrls: ['vault.page.scss']
})

export class VaultPage {

  promos: Promo[];
  username: string
  uid: string

  
  mainuser
  sub

  arry: Array<any>

  vault: Array<string>

  fullPromo: Array<any>

  

 

  constructor(
    public http: Http,
    public afstore: AngularFirestore,
    public user: UserService,
    public promo: PromotionsService,
    public alertController: AlertController,
    public router: Router,
    public vaultservice: VaultService) {


    this.fullPromo = [];      

    this.mainuser = afstore.doc(`users/${user.getUID()}`)
    this.uid = user.getUID()

    this.sub = this.mainuser.valueChanges().subscribe(event => {
      this.username = event.username
    })


      
      
      this.displayVault();
    }

  
     displayVault(){
      this.vault = [];
      var vv= [];
      this.user.getUserInfo(this.uid).subscribe(dt => {
        this.vault = dt.vault;
        vv = dt.vault;
        console.log(dt.vault);
        console.log(vv);
        this.showVault(vv);
      });
     
    }

    showVault(vv){
      this.arry = [];
      console.log("no = " + vv);
      if(this.vault != []){
        console.log(this.vault.length);
          let i = 0;
          for(i=0;i<this.vault.length;i++){
            this.vaultservice.getClaiming(this.vault[i]).subscribe(data => {
              this.arry.push(data.promotion);
              console.log(this.vault);
              this.getPromoInfo(this.arry,this.vault);
            });
          }
        }
    }


    getPromoInfo(a,v){
      this.fullPromo = [];
      var i = 0;
      var ar = 0;
      console.log(a.length);
      for(i=0;i<a.length;i++){

        this.promo.getPromo(a[i]).subscribe(data => {
          console.log(data.title);
          ar += 1;
          var item = {title: data.title, image: data.image, code: v[i-1]};
          this.fullPromo.push(item);
          // if(i == a.length){
            // window.alert("Hi " + this.fullPromo.length + " = " + ar + " = " + i);
          // }
        });
      }
    }

    showProm(){
      window.alert(this.fullPromo.length);
    }

}

