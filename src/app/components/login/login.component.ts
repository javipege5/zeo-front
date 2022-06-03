import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthenticationService } from 'src/app/services/AuthenticationService.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formL = new FormGroup({});
  submitted = false;
  resultsError: any;
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.formL = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
        ),
        Validators.maxLength(254),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(254),
      ]),
    });
  }

  ngOnInit(): void {}

  get form(): { [key: string]: AbstractControl } {
    return this.formL.controls;
  }

  submit() {
    this.submitted = true;
    if (this.formL.valid) {
      let email = this.form['email'].value;
      let password = this.form['password'].value;
      this.authService.login(email, password).subscribe({
        next: (v) => {
          console.log(v);
          this.submitted = false;
          let userName = v.userName || '';
          this.authService.setUser(email, userName);
          this.router.navigate(['list']);
        },

        error: (e) => {
          if ((e.error && e.error.message) || e.message)
            this.resultsError = (e.error && e.error.message) || e.message;
        }
      });
    }
  }
}
