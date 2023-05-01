import { Injectable } from '@angular/core';
import {Movie} from "../../models/movie";
import {Show} from "../../models/show";
import {doc, Firestore, setDoc} from "@angular/fire/firestore";
import firebase from "firebase/compat";
import firestore = firebase.firestore;
import {v4 as uuidv4} from 'uuid';
import {Seat} from "../../models/seat.model";
@Injectable({
  providedIn: 'root'
})
export class BookingService {
SelectedSeats !:Seat[]
  constructor(private db:Firestore) { }



  async booking(movie: Movie){
    // let myuuid = uuidv4();
    // const id = Math.floor(Math.random() * 2) == 0 ? "LX8rMS3P7LrIWQoQJgHF" : "ODPcGd7PqIwmymPiVmTa"
    // let show: Show = new Show("", movie.id, id, new Date("December 17, 2023 09:00:00"))
    // await setDoc(doc(this.db, "shows",myuuid), {
    //   movie_id:show["movie"],
    //   sale_id:show["sale"],
    //   showTime:show['date']
    // });

  }


}
