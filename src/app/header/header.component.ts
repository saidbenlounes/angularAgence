import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Ma super agence';
  isDesabled = true;
  isLoggedIn = false;
  constructor(
    private authenticationService: AuthentificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (userSession)=>{
        if(userSession){
          return this.isLoggedIn = true;
        }else{
          return this.isLoggedIn = false;
        }
      }
    );
  }
  onClick(){
    this.isDesabled = false;
  }

  onSignOut(){
    this.authenticationService.signOutUser();
    this.router.navigate(['/home'])
  }

}
