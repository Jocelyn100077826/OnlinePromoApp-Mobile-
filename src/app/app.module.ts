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

import {NgxQRCodeModule} from 'ngx-qrcode2'

import  {UserService } from './user.service';
import {AuthService} from './auth.service'
import { HttpModule } from '@angular/http'
import {SharedModule} from './share.module'

import {SocialSharing} from '@ionic-native/social-sharing/ngx'
import { FirebaseService } from '../app/service/firebase.service';
import { Crop } from '@ionic-native/crop/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AboutmodalPageModule } from '../app/aboutmodal/aboutmodal.module';
import { ReactiveFormsModule } from '@angular/forms';


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
    AngularFireDatabaseModule,
    HttpModule,
    SharedModule,
    AboutmodalPageModule,
    ReactiveFormsModule,
    NgxQRCodeModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    WebView,
    ImagePicker,
    Crop,
    FirebaseService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserService,
    File,
    AuthService,
    Camera,
    SocialSharing
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
