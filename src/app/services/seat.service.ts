import {Injectable} from '@angular/core';
import {Seat, seatStatus} from "../buy-ticket/seat.model";
import {Subject} from "rxjs";
import {doc, Firestore, setDoc} from "@angular/fire/firestore";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  private seats: Seat[] = [];
  seatSubject: Subject<Seat[]> = new Subject<Seat[]>();
  constructor(private db: Firestore) {
    for (let i = 0; i < 64; i++) {
      this.seats.push(new Seat(i,"A",Math.random()>0.5 ?seatStatus.available: seatStatus.Reserved));
    }
  }

  getSeats(){
    return this.seats.slice();
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
}
