import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Router} from "@angular/router";

@Component({
  selector: 'app-confirm-buy',
  templateUrl: './confirm-buy.page.html',
  styleUrls: ['./confirm-buy.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ConfirmBuyPage implements OnInit,OnDestroy {
  counter: number = 5;
  counterId!: any;
  timeoutId!: any;
  constructor(private router: Router) { }

  ngOnInit() {
    this.timeoutId = setTimeout(()=>{
      this.router.navigateByUrl("/tabs/home");
    },5000)
    this.counterId = setInterval(()=>this.counter--,1000)
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutId);
    clearInterval(this.counter);
  }

}
