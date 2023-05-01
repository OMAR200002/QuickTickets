import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {Movie} from "../models/movie";
import {MoviesService} from "../services/movies/movies.service";
import {async} from "@angular/core/testing";
import {interval} from "rxjs";

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.page.html',
  styleUrls: ['./movies-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterModule]
})
export class MoviesListPage implements OnInit {
  categoryName!: string;
  isCharged:boolean=false
  movies!: Movie[];
  constructor(private router: Router,private moviesService: MoviesService,private route: ActivatedRoute) { }

  ngOnInit() {
    // this.categoryName = this.route.snapshot.params['categoryName'];
     this.route.params.subscribe(
       { next:(param)=>{this.categoryName=param['categoryName'];this.moviesService.readMoviesByCategory(this.categoryName);}}

     );



    this.moviesService.Moviessubject.subscribe({next:value => {this.movies=value;this.isCharged=!this.isCharged}})
    while(true){console.log(this.categoryName)}
    //this.movies =  this.moviesService.getMoviesByCategory(this.categoryName);




  }


  cols: number=2;


  click(index:number){

    const movieId=this.movies[index].id;

    this.router.navigate(
      ['/movie-detail/',movieId],
      { queryParams: { Category: this.categoryName}}
    );

  }

}
