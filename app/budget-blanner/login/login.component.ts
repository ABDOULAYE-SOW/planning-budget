import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm:any;
  registerForm:any;
  activeForm: 'login' | 'register' = 'login';

  constructor( private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar){}
  ngOnInit(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  toggleForm(form: 'login' | 'register') {
    this.activeForm = form;
  }
  login() {
    if (this.loginForm.valid) {
      console.log("Login info==>", this.loginForm.value);
      this.router.navigate(['/budget-blanner/dashboard']);
    } else {
      this.snackBar.open('E-mail ou mot de passe non valide !', 'Fermer', { duration: 3000 })
    }
  }
  register(){
    if (this.registerForm.valid) {
      console.log("Register info==>>", this.registerForm.value);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      this.router.navigate(['/budget-blanner/login']);
    } else {
      this.snackBar.open('Veuillez remplir correctement tous les champs!' , 'Fermer', {duration: 3000});
    }
  }
}
