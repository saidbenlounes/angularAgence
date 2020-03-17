import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'monAgence';
  constructor(){
    const firebaseConfig = {
      apiKey: "AIzaSyCZ0ZJCZBihGLI8z2jWbFm_niBdXvj9Hzc",
      authDomain: "monagencesaid.firebaseapp.com",
      databaseURL: "https://monagencesaid.firebaseio.com",
      projectId: "monagencesaid",
      storageBucket: "monagencesaid.appspot.com",
      messagingSenderId: "885635185744",
      appId: "1:885635185744:web:8adf48dedfb125bf30a555"
    };
    firebase.initializeApp(firebaseConfig);

  }

}
