import { Component , OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from "@angular/common";
import {RouterModule,Router} from "@angular/router";
@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  standalone: true,
  imports: [CommonModule,IonicModule, ReactiveFormsModule,RouterModule],
})
export class ProfilePage implements OnInit {
  ngOnInit(): void {
  }

  showPersonalData() {

  }

  showSettings() {

  }

  logout() {

  }
}
