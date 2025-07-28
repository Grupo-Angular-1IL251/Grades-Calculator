import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async onLogin() {
    console.log('Login button clicked!');

    // Reset error message
    this.errorMessage = '';

    // Validate form
    if (!this.validateForm()) {
      return;
    }

    this.loading = true;

    try {
      const result = await this.authService.signIn(
        this.loginData.email,
        this.loginData.password
      );

      console.log('Login result:', result);

      if (result.success) {
        console.log('Login successful!');
        this.authService.saveUserIdToLocalStorage(result.data?.user ?? null);
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = result.error || 'Invalid email or password';
        console.log('Login failed:', this.errorMessage);
      }
    } catch (error) {
      this.errorMessage = 'An unexpected error occurred';
      console.error('Login error:', error);
    } finally {
      this.loading = false;
    }
  }

  private validateForm(): boolean {
    if (!this.loginData.email.trim()) {
      this.errorMessage = 'Email is required';
      return false;
    }

    if (!this.isValidEmail(this.loginData.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return false;
    }

    if (!this.loginData.password) {
      this.errorMessage = 'Password is required';
      return false;
    }

    return true;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
