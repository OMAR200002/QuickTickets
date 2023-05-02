import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {ActivatedRoute, Router} from "@angular/router";
import {MoviesService} from "../services/movies/movies.service";
import {Movie} from "../models/movie";
import {BookingService} from "../services/booking/booking.service";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MovieDetailPage implements OnInit {
  movie!:Movie
  isLooding:boolean=true;
MovieId!:any;
  Category!:any;
  constructor(private route:ActivatedRoute,private movieService:MoviesService,private r:Router,private bookingService:BookingService) { }

  ngOnInit() {
    this.route.params.subscribe(
      { next:(param)=>{ this.MovieId = param['MovieId']}}

    );

    this.route.queryParams.subscribe(
      { next:(param)=>{ this.Category = param['Category']}}
    );



    //this.movie=this.movieService.getMovieById(this.Category,this.MovieId);
    this.movieService.readMovieById(this.Category,this.MovieId);
this.movieService.subject.subscribe({next:value => this.movie=value})


  }

  bookmarkFilm(movie: Movie) {
    //this.bookingService.booking(movie);

    this.r.navigateByUrl("/tabs/buy-ticket/"+movie.id)

  }
}
