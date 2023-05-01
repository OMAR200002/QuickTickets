import {Component, OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import {SeatService} from "./services/seat.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {map, take, tap} from "rxjs";
import {collection, doc, Firestore, getDoc, getDocs, query, setDoc} from "@angular/fire/firestore";
import {Sale} from "./models/sale";
import {Seat} from "./models/seat.model";

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule,HttpClientModule],

})
export class AppComponent implements OnInit{
  constructor(private db: Firestore) {}



  async ngOnInit() {

  }


}
