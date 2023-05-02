import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AlertController, IonicModule} from '@ionic/angular';
import {Seat} from "../models/seat.model";
import {SeatService} from "../services/seat.service";
import {seatStatus} from "../models/seat.model";
import {ActivatedRoute, Router} from "@angular/router";

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
  constructor(private seatService: SeatService,
              private route:ActivatedRoute,
              private alertController: AlertController,
              private router: Router) { }
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

  async buy() {
    if (this.selectedSeats != 0) {
      this.seatService.confirmSeats();
      this.router.navigateByUrl("/confirm-buy");
    } else {
      console.clear();
      const alert = await this.alertController.create({
        header: 'Warning',
        message: "please select a seat",
        buttons: ['OK']
      });
      alert.present()
      console.clear();
    }
  }
}
