import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators} from "@angular/forms";
import { Router } from '@angular/router';

import { SocialAuthService } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider ,SocialUser} from "@abacritt/angularx-social-login";
import { SocialLoginModule} from "@abacritt/angularx-social-login";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: SocialUser;
  isSignedin: boolean;
  
  

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private router: Router,
    private authService: SocialAuthService
  ) { }

  ngOnInit(): void {

   

    
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.isSignedin = (user != null);
      console.log(this.user);
      localStorage.setItem('google_auth', JSON.stringify(this.user));

    });
  }



 

  onlogin(){
    if (!this.loginForm.valid) {
      return;
    }
    this.router.navigateByUrl('/dashboard')
    alert("login successful");
    
  }

  googleLoginOptions = {
    scope: 'profile email'
  }; 
  
  
  
  
GoogleSignIn(): void {

  
  
  this.authService.signIn(GoogleLoginProvider.PROVIDER_ID,this.googleLoginOptions).then(
      (data) => {
      
        localStorage.setItem('google_auth', JSON.stringify(data));
        this.router.navigateByUrl('/dashboard').then();
      });
  
}
FacebookSignIn(): void {
  this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
}




}
