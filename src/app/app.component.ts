import {Component, OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import {SeatService} from "./services/seat.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {map, take, tap} from "rxjs";
import {collection, doc, Firestore, getDocs, query, setDoc} from "@angular/fire/firestore";

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule,HttpClientModule],
})
export class AppComponent implements OnInit{
  constructor(private http: HttpClient,private db: Firestore) {}



  ngOnInit() {
    this.http.get("https://api.themoviedb.org/3/movie/popular?api_key=c9b5ef86122365a4c85f9e50034d66e0&language=en-US&page=1")
      .subscribe(async (response:any) => {
        response.results.forEach(async (m:any) => {
          m["poster_path"] = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/"+m["poster_path"];
          await setDoc(doc(this.db, "Popular_movies", m.id+""), m);
        })
      });
  }


}
