
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators'
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
export class PromotionsService {

  private promoCollection: AngularFirestoreCollection<Promo>;

  private promo: Observable<Promo[]>;

  constructor(db: AngularFirestore){
    this.promoCollection = db.collection<Promo>('promotions');

    this.promo = this.promoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data};
        });
      })
    );
  }

  getPromos(){
    return this.promo;
  }

  getPromo(id){
    return this.promoCollection.doc<Promo>(id).valueChanges();
  }
}

