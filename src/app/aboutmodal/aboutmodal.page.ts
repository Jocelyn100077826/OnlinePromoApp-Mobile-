import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-aboutmodal',
  templateUrl: './aboutmodal.page.html',
  styleUrls: ['./aboutmodal.page.scss'],
})
export class AboutmodalPage implements OnInit {

  about: string;
 
  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private navParams: NavParams,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  
  async closeModal() {
    
    await this.modalCtrl.dismiss();
    this.router.navigate(['/account']);
  }

  editAbt() {
   var test = this.about;

  }

}
