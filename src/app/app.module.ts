import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule, BsDatepickerModule  } from "ngx-bootstrap";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { NewGameComponent } from './components/new-game/new-game.component';



import {
  AppRoutingModule
} from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    NewGameComponent,
    ModalWindowComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
