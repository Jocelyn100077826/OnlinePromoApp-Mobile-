import {Injectable} from '@angular/core'
import {AngularFireAuth} from '@angular/fire/auth'
import {first} from 'rxjs/operators'
import { auth } from 'firebase/app'

import {Observable} from 'rxjs';
import { map } from 'rxjs/operators'
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

interface user {
  username: string,
  uid: string,
  vault: Array<string>
}

@Injectable()
export class UserService {
  
  private user: user

 constructor(private afAuth: AngularFireAuth,public db: AngularFirestore){
  
  // this.userCollection = db.collection<user>('user');

    // this.u = this.userCollection.snapshotChanges().pipe(
    //   map(actions => {
    //     return actions.map(a => {
    //       const data = a.payload.doc.data();
    //       const id = a.payload.doc.id;
    //       return { id, ...data};
    //     });
    //   })
    // );
 }
 getUserInfo(id): Observable<any>{
  return this.db.collection('users').doc(id).valueChanges();
}

 setUser(user:user){
   this.user = user
 }

 async isAuthenticated(){
   if(this.user) return true

   const user = await this.afAuth.authState.pipe(first()).toPromise()

   

   if (user){

     this.setUser({
       username: user.email,
       uid: user.uid,
       vault: []
     })
     return true
   }else{
     return false
   }
 }

 reAuth(username: string, password: string){
   return this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(username ,password))
 }
 updatePassword(npassword: string){
   return this.afAuth.auth.currentUser.updatePassword(npassword)
 }

 updateEmail(newemail: string){
   return this.afAuth.auth.currentUser.updateEmail(newemail)
 }

 getUsername(): string{
   return this.user.username
 }

 getUID(): string{
   return this.user.uid
 }

  
}
