import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onSignup() {
    // Reset messages
    this.errorMessage = '';
    this.successMessage = '';

    // Validate form
    if (!this.validateForm()) {
      return;
    }

    this.loading = true;

    try {
      const result = await this.authService.signUp(
        this.signupData.email,
        this.signupData.password,
        this.signupData.firstName,
        this.signupData.lastName
      );

      if (result.success) {
        this.successMessage = 'Account created successfully! Please check your email to verify your account.';
        // Optionally redirect to login page
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      } else {
        this.errorMessage = result.error || 'An error occurred during signup';
      }
    } catch (error) {
      this.errorMessage = 'An unexpected error occurred';
      console.error('Signup error:', error);
    } finally {
      this.loading = false;
    }
  }

  private validateForm(): boolean {
    if (!this.signupData.firstName.trim()) {
      this.errorMessage = 'First name is required';
      return false;
    }

    if (!this.signupData.lastName.trim()) {
      this.errorMessage = 'Last name is required';
      return false;
    }

    if (!this.signupData.email.trim()) {
      this.errorMessage = 'Email is required';
      return false;
    }

    if (!this.isValidEmail(this.signupData.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return false;
    }

    if (!this.signupData.password) {
      this.errorMessage = 'Password is required';
      return false;
    }

    if (this.signupData.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long';
      return false;
    }

    if (this.signupData.password !== this.signupData.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return false;
    }

    return true;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
