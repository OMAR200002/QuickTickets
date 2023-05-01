import { Component , OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
@Component({
  selector: 'app-auth',
  templateUrl: 'auth.page.html',
  styleUrls: ['auth.page.scss'],
  standalone: true,
  imports: [CommonModule,IonicModule, ReactiveFormsModule],
})
export class AuthPage implements OnInit {
  screen: any = 'signin';
  formData: FormGroup;
  isLoading: boolean = false;
  constructor(private fb:FormBuilder,private router:Router) {
    this.formData = this.fb.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]],
    });
  }

  ngOnInit() {}

  change(event:any){
    this.screen = event;
  }

  login(){
    let formData: any = new FormData();
    if(this.formData.valid){
      this.isLoading = true
      // @ts-ignore
      formData.append('email', this.formData.get('email').value);
      // @ts-ignore
      formData.append('password', this.formData.get('password').value);
      console.log(this.formData)
      // this.auth.userLogin(formData).subscribe((data:any)=>{
      //   console.log(data);
      // });
    }
    this.router.navigateByUrl('/tabs/home');
  }

  register(){
    let formData: any = new FormData();
    if(this.formData.valid){
      this.isLoading = true
      // @ts-ignore
      formData.append('name', this.formData.get('name').value);
      // @ts-ignore
      formData.append('email', this.formData.get('email').value);
      // @ts-ignore
      formData.append('password', this.formData.get('password').value);
      console.log(this.formData)
      // this.auth.userRegister(formData).subscribe((data:any)=>{
      //   console.log(data);
      // });
    }
  }

}
