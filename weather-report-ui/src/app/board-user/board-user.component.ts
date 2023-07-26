import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  weatherList: any[] = [];
  error = "";
  constructor(private userService: UserService, private tokenStorage: TokenStorageService,  private router: Router) { }

  ngOnInit(): void {
    let majorCity = ["Hyderabad", "Mumbai", "Bengaluru","Kochi"];
    for(let i = 0; i < majorCity.length; i++){
       this.userService.getWatherforMajorCity(majorCity[i]).subscribe(
        data => {
          this.weatherList.push({...JSON.parse(data), city: majorCity[i]});
        },
        err => {
          // console.log(err.error);
          this.error = JSON.parse(err.error).message;
        }
      );
    }
    
    // this.userService.getWatherforMajorCity();
  }
  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }
}
