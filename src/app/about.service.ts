import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class QRService {
    private data;
    constructor(private firestore: AngularFirestore) {

    }
    
    create_about() {
        //return this.firestore.collection('user');
      }
}
