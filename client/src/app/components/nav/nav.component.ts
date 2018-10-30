import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalWindowComponent } from "../modal-window/modal-window.component";
import { AuthenticationService } from "../../services/auth.service";
import { User } from "../../models/User";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  @ViewChild('authModal') public authModal: ModalWindowComponent;

  constructor(private authService:AuthenticationService) { 
      this.authService.init();
  }

  ngOnInit() {
  }

 openAuthModal(){
   this.authModal.showPopup();
 }

 onCloseModalEvent(){
   this.authModal.hidePopup();
 }
}
