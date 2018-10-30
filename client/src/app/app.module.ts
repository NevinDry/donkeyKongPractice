import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';


import { ModalModule, BsDatepickerModule  } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { JwtInterceptorProvider } from './helpers/jwt.interceptor';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { NewGameComponent } from './components/new-game/new-game.component';
import { AuthComponent } from './components/auth/auth.component';
import { AlertComponent } from './components/alert/alert.component';

import { AuthenticationService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AlertService } from './services/alert.service';
import { GameService } from './services/game.service';

import {
  AppRoutingModule
} from './app.routes';
import { GameStatComponent } from './components/game-stat/game-stat.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    NewGameComponent,
    ModalWindowComponent,
    AuthComponent,
    AlertComponent,
    GameStatComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    JwtInterceptorProvider,
    AuthenticationService,
    UserService,
    AlertService,
    GameService,
    HttpClientModule,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
