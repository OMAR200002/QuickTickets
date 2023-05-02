import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AlertController} from "@ionic/angular";
import {HttpClient} from "@angular/common/http";
import {doc, Firestore, getDoc, setDoc} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import firebase from "firebase/compat";
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth, onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword, signOut
} from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 // user!: Observable<any>;
user!:string[]|null
  users!:Observable<any[]>;
  constructor(private afAuth:Auth,private router:Router,private alertController: AlertController,private db:Firestore) {
  }
  // constructor(private afAuth: AngularFireAuth,private alertController: AlertController,public http:HttpClient,private afs:Firestore) {
  //   this.user = afAuth.authState;
  //
  //
  // }
  forgetpassword(a: string) {
    const auth = getAuth();
    sendPasswordResetEmail(auth, a)
      .then(async () => {
        const alert = await this.alertController.create({
          header: 'Done',
          message: "we send you a reset password mail ",
          buttons: ['OK']
        });
        alert.present()
        console.clear();
        this.router.navigateByUrl("/login")
      })
      .catch(async (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.clear();
        const alert = await this.alertController.create({
          header: 'Error',
          message: "your email &/or password is incorrect ",
          buttons: ['OK']
        });
        alert.present()
        console.clear();

      });

    // this.afAuth.sendPasswordResetEmail(a,{ url: 'http://localhost:8100/home' } ).then(
    //   () => {
    //     console.log("hello")
    //   }, async err => {
    //
    //     const alert = await this.alertController.create({
    //       header: 'Error',
    //       message: "your email &/or password is incorrect ",
    //       buttons: ['OK']
    //     });
    //     alert.present()

    //   }
    //
    // )
    }


  register(name:string,a: string, b: string) {


    const auth = getAuth();
    createUserWithEmailAndPassword(auth,a, b)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;

        await setDoc(doc(this.db, "users", a), {
          name: name,
         tickets:[]
        });
        this.router.navigateByUrl("/tabs/home")
        // ...
      })
      .catch(async (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.clear();
        const alert = await this.alertController.create({
          header: 'Error',
          message: "your email &/or password is incorrect ",
          buttons: ['OK']
        });
        alert.present()
        console.clear();

      });
    // this.afAuth.createUserWithEmailAndPassword(a,b).then(
    //   () => {
    //     console.log("hello")
    //   }, async err => {
    //
    //     const alert = await this.alertController.create({
    //       header: 'Error',
    //       message: "your email &/or password is incorrect ",
    //       buttons: ['OK']
    //     });
    //     alert.present()

      // }

    }
  login(a: string, b: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, a, b)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        this.router.navigateByUrl("/tabs/home")
        // ...
      })
      .catch(async (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.clear();
        const alert = await this.alertController.create({
          header: 'Error',
          message: "your email &/or password is incorrect ",
          buttons: ['OK']
        });
        alert.present()
        console.clear();
      });

    // this.afAuth.signInWithEmailAndPassword(a, b).then(
    //   () => {
    //
    //     console.log("hello")
    //   }, async err => {
    //
    //     console.clear();
    //     const alert = await this.alertController.create({
    //       header: 'Error',
    //       message: "your email &/or password is incorrect ",
    //       buttons: ['OK']
    //     });
    //     alert.present()
    //     console.clear();
    //   }
    // )
  }
  getUser(){
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      console.log(user)
      if (user) {
        console.log(user.email + "")
        const docRef = doc(this.db, "users", user.email + "");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log(docSnap.data())
         let l=docSnap.data();
          this.user = [user.email + "",l['name']]
        } else {
          // docSnap.data() will be undefined in this case

        }
        const uid = user.uid;

      } else {
        this.user = []
      }
    });
    return this.user
  }
logout(){
  const auth = getAuth();
  signOut(auth).then(() => {
    this.router.navigateByUrl("/auth")
    // Sign-out successful.
  }).catch((error) => {
    console.log("se")
  });
}
  go() {
    this.router.navigateByUrl("/tabs/home")
  }
}
