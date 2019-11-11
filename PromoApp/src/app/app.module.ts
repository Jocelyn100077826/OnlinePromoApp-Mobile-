import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import firebaseConfig from './firebase'
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore'
import { AngularFirestore } from '@angular/fire/firestore'

import {BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner/ngx';
import {NgxQRCodeModule} from 'ngx-qrcode2'

import  {UserService } from './user.service';
import {AuthService} from './auth.service'
import { HttpModule } from '@angular/http'
import {SharedModule} from './share.module'

import {SocialSharing} from '@ionic-native/social-sharing/ngx'
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links/ngx'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpModule,
    SharedModule,
    NgxQRCodeModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserService,
    AuthService,
    BarcodeScanner,
    SocialSharing,
    FirebaseDynamicLinks
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
