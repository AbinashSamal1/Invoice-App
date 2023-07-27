import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  showForm!: boolean;

  constructor(
    private formBuilder: FormBuilder, private auth: InvoiceService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['invoice']);
    }

  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }


  login(): void {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe(
        (result) => {
          this.router.navigate(['invoice']);
        },
        (err: Error) => {
          alert(err.message);
        }
      );
    }
  }

  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
