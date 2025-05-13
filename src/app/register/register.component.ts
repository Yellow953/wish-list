import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  error: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.auth
      .register({
        name: this.name,
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.access_token);
          console.log('Registered and logged in');
          this.router.navigate(['/main']);
        },
        error: (err) => {
          if (err.status === 422 && err.error.errors) {
            const firstError = Object.values(err.error.errors)[0];
            this.error = Array.isArray(firstError) ? firstError[0] : firstError;
          } else {
            this.error = err.error?.message || 'Registration failed';
          }
        },
      });
  }

  login() {
    this.router.navigate(['/login']);
  }
}
