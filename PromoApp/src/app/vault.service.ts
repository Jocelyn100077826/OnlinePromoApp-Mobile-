
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {UserService} from './user.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

export interface Promo {
  title: string;
  promoter: string ;
  image: string;
  keys: Array<String>;
}

@Injectable({
  providedIn: 'root'
})
export class VaultService {

  private promoCollection: AngularFirestoreCollection<Promo>;

  private promo: Observable<Promo[]>;

  constructor(public db: AngularFirestore, public user: UserService){
  }

  getClaiming(id): Observable<any>{
    return this.db.collection('claiming').doc(id).valueChanges();
  }

  getPromo(id){
    return this.promoCollection.doc<Promo>(id).valueChanges();
  }
}

