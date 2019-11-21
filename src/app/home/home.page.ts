import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
import { AngularFirestore } from '@angular/fire/firestore'
import {UserService} from '../user.service';
import {firestore} from 'firebase/app'
import { Observable } from 'rxjs';
import {Router} from '@angular/router'
import {Promo, PromotionsService} from './../promotions.service';

export interface Item { title: string; image: string; }

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit{
  promos: Promo[];

  constructor(private afs: AngularFirestore, private promoService: PromotionsService, private router: Router) {
  
  }

  ngOnInit() {
    this.promoService.getPromos().subscribe(res => {
      this.promos = res;
    })

    var slides = document.querySelector('ion-slides');

    // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
    // slides.options = {
    //   initialSlide: 1,
    //   speed: 400
    // }
  }

  
}
