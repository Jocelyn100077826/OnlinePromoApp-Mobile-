import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {AngularFirestore} from '@angular/fire/firestore'
import {UserService} from '../user.service'
import { firestore} from 'firebase/app'
import { PromotionsService, Promo } from '../promotions.service';
import { SocialSharing} from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  promo: Promo = {
    title: '123',
    image: './../assets/default.jpg',
    promoter: '123',
    keys: []
  }

  promoId = null;

  constructor(private route: ActivatedRoute,
              private afs: AngularFirestore,
              private promoService: PromotionsService,
              private socialSharing: SocialSharing) {
  }

  shareTwitter(){
    this.socialSharing.shareViaTwitter("Hi")
  }

  shareFacebook(){
    this.socialSharing.shareViaFacebook("PromoApp:https://onlinepromoapp.firebaseapp.com/sharing.html?id=6eXSm1eYLDtoKTwunuqj&fbclid=IwAR3fJ_zaoXtEEmLWzhNUDT9Oi7bzYoYpP114vjGs73mEq09C0eyxlpGYHiA");

  }

  shareWhatsapp(){
    this.socialSharing.shareViaWhatsApp("Hi",null)

  }


  ngOnInit() {
    this.promoId = this.route.snapshot.params['id'];
    if(this.promoId){
      console.log(this.promoId);
      this.loadPromo();

    }
  }

  loadPromo() {
    this.promoService.getPromo(this.promoId).subscribe(res => {
      this.promo = res;
      console.log(this.promo.image);
    })
  }

}
