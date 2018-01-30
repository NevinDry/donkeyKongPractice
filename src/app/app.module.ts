import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HttpClient } from '@angular/common/http';


import { ModalModule, BsDatepickerModule  } from "ngx-bootstrap";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { NewGameComponent } from './components/new-game/new-game.component';
import { AuthComponent } from './components/auth/auth.component';
import { AlertComponent } from './components/alert/alert.component';

import { AuthenticationService } from "./services/auth.service";
import { UserService } from "./services/user.service";
import { AlertService } from "./services/alert.service";

import {
  AppRoutingModule
} from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    NewGameComponent,
    ModalWindowComponent,
    AuthComponent,
    AlertComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [AuthenticationService, UserService, AlertService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
