import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalWindowComponent } from "../modal-window/modal-window.component";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  @ViewChild('authModal') public authModal: ModalWindowComponent;

  constructor() { }

  ngOnInit() {
  }

 openAuthModal(){
   this.authModal.showPopup();
 }

 onCloseModalEvent(){
   this.authModal.hidePopup();
 }
}
