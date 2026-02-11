import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserLogin } from 'src/app/models/user-login';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html'
})
export class LoginModalComponent {
  @Input() show = false;
  @Output() closed = new EventEmitter<void>();
  @Output() switchToSignup = new EventEmitter<void>();

  user: UserLogin = new UserLogin();

  constructor(private authService: AuthService) {}

  login(loginForm: NgForm): void {
    if (loginForm.invalid) {
      return;
    }
    this.authService.loginUser(this.user).subscribe(
      response => {
        console.log('User logged in successfully', response);
        // Optionally close modal or switch to another page here
      },
      error => {
        console.error('Error logging in user', error);
      }
    );
  }

  closeModal(): void {
    this.closed.emit();
  }

  goToSignup(): void {
    this.switchToSignup.emit();
  }
}
