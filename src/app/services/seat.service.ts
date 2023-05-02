import {Injectable} from '@angular/core';
import {Seat, seatStatus} from "../models/seat.model";
import {Subject} from "rxjs";
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc, startAfter,
  where
} from "@angular/fire/firestore";
import {HttpClient} from "@angular/common/http";
import {Movie} from "../models/movie";
import {Show} from "../models/show";
import firebase from "firebase/compat";
import {equalTo} from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  private seats: Seat[] = [];

  seatSubject: Subject<Seat[]> = new Subject<Seat[]>();
  constructor(private db: Firestore) {
    for (let i = 0; i < 64; i++) {

      this.seats.push(new Seat(i,Math.random()>0.5 ?seatStatus.available: seatStatus.Reserved));
    }
  }
  r!:any
show!:Show
  async getSeats(id: string) {
    this.seats=[];

    const q = query(collection(this.db, "shows"), where("movie_id", "==", parseInt(id)));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let sh=doc.data()
      console.log(  sh["showTime"].toDate())
      this.show=new Show(doc.id,sh['movie_id'],sh['sale_id'],sh['showTime'].toDate());

      console.log(doc.id,sh['movie_id'],sh['sale_id'],this.show.date)
    });


    const docRef = doc(this.db, "sale", this.show["sale"]);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        this.r=docSnap.data()['seats'];

    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    /*for (const seatRef of this.r) {
      const docRef = doc(this.db, "seats", seatRef);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
       let seat  =docSnap.data();
       this.seats.push(new Seat(seatRef,seat['status']))

      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }*/
    const q2 = query(
      collection(this.db, "seats"),
      orderBy("id"),
      limit(64),
    );
    const q3 = query(
      collection(this.db, "seats"),
      where("id",">=", 63),
      limit(64),
    );

    const documentSnapshots = await getDocs(this.show["sale"]==="LX8rMS3P7LrIWQoQJgHF"?q2:q3);

    documentSnapshots.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const s = doc.data();

      this.seats.push(new Seat(s["id"],s["status"]))
    });

    console.log(this.seats);

    this.seatSubject.next(this.seats)

  }
  setSelected(seatId: number){
    this.seats.map(seat => {
      seat.status = seat.seatId == seatId ? seatStatus.selected : seat.status;
        return seat;
    } );
    this.seatSubject.next(this.seats);
  }
  onDeselectSeat(seatId: number) {
    this.seats.map(seat => {
      seat.status = seat.seatId == seatId ? seatStatus.available : seat.status;
      return seat;
    } );
    this.seatSubject.next(this.seats);
  }
  async confirmSeats() {
    //let newSeats:Seat[]=[]

    this.seats.map(seat => {
      seat.status = seat.status == seatStatus.selected ? seatStatus.Reserved : seat.status;
      //newSeats.push(seat)
      return seat;
    });
    //this.seats=newSeats;
    for (const seat of this.seats) {
      await setDoc(doc(this.db, "seats", seat.seatId+""), {
        id: seat.seatId,
        status:seat.status,
      });
    }
  }


}
