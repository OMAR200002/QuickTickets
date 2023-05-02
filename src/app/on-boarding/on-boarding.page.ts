import {Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.page.html',
  styleUrls: ['./on-boarding.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnBoardingPage implements OnInit {
  @ViewChild("mainSlides") slides : ElementRef | undefined;
  constructor(private router: Router) { }

  ngOnInit() {
  }



  goBack() {
    this.slides?.nativeElement.swiper.slidePrev();
  }

  skip() {
      this.router.navigateByUrl("/auth");
  }


  goNext() {
    this.slides?.nativeElement.swiper.slideNext();
  }

  toHome() {
    this.router.navigate(["/auth"]);
  }
}
