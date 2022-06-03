import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserList } from 'src/app/models/UserList';
import { AuthenticationService } from 'src/app/services/AuthenticationService.service';
import { UsersService } from 'src/app/services/Users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  list: UserList[] = [];
  userName!: String ;
  isLogged:boolean=false;
  constructor(
    private router: Router,
    private usersService: UsersService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
      this.isLogged = this.checkUser() ? true:false;
      if(this.isLogged)this.userName = this.authService.getUserName() || '';
      this.usersService.list().subscribe((data) => {
        this.list = data;
      });
    
  }

  checkUser() {
    return this.authService.checkUser();
  }

  logout(){
    this.authService.logout();
  }
}
