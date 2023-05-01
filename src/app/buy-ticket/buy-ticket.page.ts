import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Seat} from "../models/seat.model";
import {SeatService} from "../services/seat.service";
import {seatStatus} from "../models/seat.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.page.html',
  styleUrls: ['./buy-ticket.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BuyTicketPage implements OnInit {
  seats!: Seat[];
  rows: number[] = [1,2,3,4,5,6,7,8];
  dateExample = new Date().toISOString();
  selectedSeats: number = 0;
  constructor(private seatService: SeatService,private route:ActivatedRoute) { }
MovieId!:string
  ngOnInit() {
    this.route.params.subscribe(
      { next:(param)=>{ this.MovieId = param['MovieId'];console.log("this "+this.MovieId)}}

    );
    this.seatService.getSeats(this.MovieId);


    this.seatService.seatSubject.subscribe(value => {
      this.seats = value;
      console.log(value)
    });
  }

  goBack() {
  }

  onSelectSeat(seatId: number) {
      this.seatService.setSelected(seatId);
      this.selectedSeats++;
  }

  onDeselectSeat(seatId: number) {
    this.seatService.onDeselectSeat(seatId);
    this.selectedSeats--;
  }

  dateChange() {
    console.log(this.dateExample);
  }

  buy() {
    this.seatService.confirmSeats();
    console.log("tm")
  }
}
