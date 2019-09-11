import {Injectable} from '@angular/core'
import {AngularFireAuth} from '@angular/fire/auth'
import {first} from 'rxjs/operators'
import { auth } from 'firebase/app'

interface user {
  username: string,
  uid: string
}

@Injectable()
export class UserService {
  private user: user

 constructor(private afAuth: AngularFireAuth){

 }

 setUser(user:user){
   this.user = user
 }

 async isAuthenticated(){
   if(this.user) return true

   const user = await this.afAuth.authState.pipe(first()).toPromise()

   if (user){
     this.setUser({
       username: user.email.split('@')[0],
       uid: user.uid
     })
     return true
   }else{
     return false
   }
 }

 reAuth(username: string, password: string){
   return this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(username + "@email.com",password))
 }
 updatePassword(npassword: string){
   return this.afAuth.auth.currentUser.updatePassword(npassword)
 }

 updateEmail(newemail: string){
   return this.afAuth.auth.currentUser.updateEmail(newemail + "@email.com")
 }

 getUsername(): string{
   return this.user.username
 }

 getUID(): string{
   return this.user.uid
 }
}
