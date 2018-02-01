import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { UserRegister } from "../../models/UserRegister";
import { AlertService } from "../../services/alert.service";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/auth.service";
import { UserSignIn } from "../../models/UserSignIn";
import { HttpResponseCusom } from "../../models/HttpResponseCusom";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  userSignIn: UserSignIn = { name: '', password: '' };
  userRegister: UserRegister = { name: '', password: '', passwordConfirm: '', email: '' };
  errorRegister: string;
  errorSignIn: string;

  @ViewChild('signInForm') public signInForm: NgForm;
  @ViewChild('registerForm') public registerForm: NgForm;

  @Output() public closeModal = new EventEmitter<any>();

  constructor(private userService: UserService, private alertService: AlertService, private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
  }

  register() {
    this.userService.create(this.userRegister)
      .subscribe(
      (data: HttpResponseCusom) => {
        this.closeModal.emit();
        this.alertService.success(data.message, true);
      },
      (error: HttpResponseCusom) => {
        this.errorRegister = error.message;
      });
  }

  signIn() {
    this.authService.login(this.userSignIn)
      .subscribe(
      (data: HttpResponseCusom) => {
        this.closeModal.emit();
        this.alertService.success(data.message, true);
      },
      (error: HttpResponseCusom) => {
        this.errorSignIn = error.message;
      });
  }


}
