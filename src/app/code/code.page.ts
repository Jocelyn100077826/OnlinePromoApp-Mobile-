import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {AngularFirestore} from '@angular/fire/firestore'
import {UserService} from '../user.service'
import { firestore} from 'firebase/app'
import { PromotionsService, Promo } from '../promotions.service';
import { SocialSharing} from '@ionic-native/social-sharing/ngx';

import {NgxQRCodeModule} from 'ngx-qrcode2';
import {BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-code',
  templateUrl: './code.page.html',
  styleUrls: ['./code.page.scss'],
})
export class CodePage implements OnInit {

  promoId= "";
  encodedData:any = {};

  
  constructor(private route: ActivatedRoute,
    private afs: AngularFirestore,
    private promoService: PromotionsService,
    public scanner:BarcodeScanner) { }

  ngOnInit() {
    this.promoId = this.route.snapshot.params['id'];
    if (this.promoId != ""){
      console.log(this.promoId);
      // this.encode(this.promoId);
    }
  }

}
