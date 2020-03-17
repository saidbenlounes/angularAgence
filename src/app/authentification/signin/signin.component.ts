import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { error } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  // Model de données pour utiliser la méhode reactive dans les formulaires
  // meme nom de refernce dans le formulaire HTML(ici signinForm)
  signinForm: FormGroup;

  //Form builder c'est le constructeur des formulaires
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthentificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initSigninForm();

  }
  // Initialisation du formulaire {email: "", password: ""}
  initSigninForm(){
    this.signinForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]]
    });
  }
  // Récuperer les données du formolaire {email: "toto", password: "123456"}
  onSubmitSigninForm(){
    const email  = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;
    this.authenticationService.signInUser(email, password).then(
      (data)=>{
        this.router.navigate(['/admin','dashboard']); // la redirection
      }
    ).catch(
      (error)=>{
        console.log(error);
      }
    );
  }


}
