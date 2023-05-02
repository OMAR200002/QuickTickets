import { Component , OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
// import {AuthService} from "../services/auth.service";
@Component({
  selector: 'app-auth',
  templateUrl: 'auth.page.html',
  styleUrls: ['auth.page.scss'],
  standalone: true,
  imports: [CommonModule,IonicModule, ReactiveFormsModule],
})
export class AuthPage implements OnInit {
  list!:any;
  screen: any='signin';
  formDataLogin!: FormGroup;
  formDataSignUp!: FormGroup;
  formDataForget!: FormGroup;

// ,private s:AuthService
  constructor(private fb:FormBuilder,private s:AuthService) {


    this.formDataLogin=this.fb.group(
      {
        email_login: ['',[Validators.required, Validators.email]],
        password_login: ['',[Validators.required]],
      }
    )
    this.formDataSignUp=this.fb.group(
      {
        name_signup: ['',[Validators.required]],
        email_signup: ['',[Validators.required, Validators.email]],
        password_signup: ['',[Validators.required]],
      }
    )
    this.formDataForget=this.fb.group(
      {
        email_forget: ['',[Validators.required, Validators.email]],

      }
    )
  }

  ngOnInit(): void {
    this.s.getUser()
        //throw new Error('Method not implemented.');
    }

  change(event: string) {
    this.screen = event;
  }

  login() {

    this.s.login(this.formDataLogin.value['email_login'],this.formDataLogin.value['password_login'])
//console.log(this.formDataLogin.value['email_login'],this.formDataLogin.value['password_login'])


  }
  reset(){

this.s.forgetpassword(this.formDataForget.value['email_forget'])
  }
  register() {
    console.log(this.formDataSignUp.value['email_signup'],this.formDataSignUp.value['password_signup'])

      this.s.register(this.formDataSignUp.value['name_signup'],this.formDataSignUp.value['email_signup'],this.formDataSignUp.value['password_signup'])



  }

}
