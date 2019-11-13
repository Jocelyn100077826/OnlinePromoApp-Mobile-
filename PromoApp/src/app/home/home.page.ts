import { Component, OnInit, ViewChild} from '@angular/core';
import { Http } from '@angular/http'
import { AngularFirestore } from '@angular/fire/firestore'
import {UserService} from '../user.service';
import {firestore} from 'firebase/app'
import { Observable } from 'rxjs';
import {Router} from '@angular/router'
import {Promo, PromotionsService} from './../promotions.service';
import { IonContent } from '@ionic/angular';

export interface Item { title: string; image: string; }

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit{
  
  @ViewChild(IonContent) content: IonContent; //ViewChild Declaration inside class

  promolist = [];
  carousel: any;

  loaded: any[];

  constructor(private afs: AngularFirestore, private promoService: PromotionsService, private router: Router) {
  
  }

  imgSlideOpt = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };

  ngOnInit() {
  this.afs.collection('promotions').valueChanges()
  .subscribe(promolist => {
    this.promolist = promolist;
    this.loaded = promolist;
  })

   this.carousel = [
    { image: '../../assets/imgs/sale.jpg' },
    { image: '../../assets/imgs/sale2.jpg' },
    { image: '../../assets/imgs/sale4.jpg' },
    { image: '../../assets/imgs/sale5.png' }
   ]

  }

  initializeItems() {
    this.promolist = this.loaded;
  }


  filter(evt) {
    this.initializeItems();
  
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    this.promolist = this.promolist.filter(currentGoal => {
      if (currentGoal.title && searchTerm) {
        if (currentGoal.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }
  
  loadData(event) {
    
    setTimeout(() => {
      console.log('Done');
      this.promolist;
      event.target.complete();
 
    }, 2000);
  }

  
}
