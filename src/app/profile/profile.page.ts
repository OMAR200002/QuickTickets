import { Component , OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from "@angular/common";
import {RouterModule,Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  standalone: true,
  imports: [CommonModule,IonicModule, ReactiveFormsModule,RouterModule],
})
export class ProfilePage implements OnInit {

  ngOnInit(): void {
    let t=this.s.getUser()
    if(t!=null){
      this.userEmail=t[0]
      this.userName=t[1]
    }
  }
  userEmail!:string
  userName!:string
constructor(private s:AuthService) {
}
  showPersonalData() {

  }

  showSettings() {

  }

  logout() {
this.s.logout();
  }
}
