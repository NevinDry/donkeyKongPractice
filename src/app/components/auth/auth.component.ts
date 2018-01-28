import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  userSignIn = { name: '', password: '' };
  userRegister = { name: '', password: '', passwordConfirm:'', email:'' };

  @ViewChild('signInForm') public signInForm: NgForm;
  @ViewChild('registerForm') public registerForm: NgForm;

  constructor() { }

  ngOnInit() {
  }

}
