import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-my-board',
  templateUrl: './my-board.component.html',
  styleUrls: ['./my-board.component.css']
})
export class MyBoardComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUserInfo().subscribe(
      (data) => {
        console.log("ezze");
      },
      (error) => {
        console.log("ezze");

      });
  }

}
