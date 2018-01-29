import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { UserRegister } from "../../models/UserRegister";
import { AlertService } from "../../services/alert.service";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  userSignIn = { name: '', password: '' };
  userRegister: UserRegister = { name: '', password: '', passwordConfirm: '', email: '' };

  @ViewChild('signInForm') public signInForm: NgForm;
  @ViewChild('registerForm') public registerForm: NgForm;

  constructor(private userService: UserService, private alertService: AlertService, private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
  }

  register() {
    this.userService.create(this.userRegister)
      .subscribe(
      data => {
        this.alertService.success('Registration successful', true);
        //this.router.navigate(['/login']);
      },
      error => {
        this.alertService.error(error);
      });
  }

  signIn() {
    this.authService.login(this.userSignIn)
      .subscribe(
      data => {
        this.alertService.success('Login successful', true);

        this.router.navigate(['/home']);
      },
      error => {
        this.alertService.error(error);
      });
  }


}
