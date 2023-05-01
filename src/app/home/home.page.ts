import {Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {Router, RouterModule} from "@angular/router";
import {CategoriesService} from "../services/categories/categories.service";
import {MoviesService} from "../services/movies/movies.service";
import {Movie} from "../models/movie";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, NgForOf],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit{
  @ViewChild("slides") slides : ElementRef | undefined;

  popularMovies!: Movie[] ;
  constructor(private router: Router,
              private categoriesService: CategoriesService,
              private moviesService: MoviesService) {

  }

  ngOnInit() {
    this.slides?.nativeElement.swiper.spaceBetween("50");
    this.popularMovies = this.moviesService.getPopularMovies();
  }

  goToCategories() {
    this.router.navigateByUrl("/categories-list");
  }

  toDetails() {
    //TODO : To movie detail
  }

  goToPopular() {
    this.router.navigateByUrl("/movies-list/Popular");
  }
}
