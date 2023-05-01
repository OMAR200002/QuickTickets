import { Component , OnInit} from '@angular/core';
import {IonicModule, NavController, Platform} from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from "@angular/common";
import {RouterModule,Router} from "@angular/router";
import {CategoriesService} from "../services/categories/categories.service";
import {Category} from "../models/category";
@Component({
  selector: 'app-cats',
  templateUrl: 'categories-list.page.html',
  styleUrls: ['categories-list.page.scss'],
  standalone: true,
  imports: [CommonModule,IonicModule, ReactiveFormsModule,RouterModule],
})
export class CategoriesListPage implements OnInit {
  catlist!: Array<Category>;

  constructor(private router: Router,private categoriesService: CategoriesService,private platform: Platform, private navCtrl: NavController) {


  }


  cols: number=2;


  ngOnInit(): void {


    this.categoriesService.subject.subscribe({next:value => {this.catlist=value;console.log(this.catlist)}})
    //console.log(this.catlist)
    this.categoriesService.readAllCategories();
    //console.log(this.catlist)

  }

  click(cat:any){

    this.router.navigateByUrl("/movies-list/"+cat);
  }
}
