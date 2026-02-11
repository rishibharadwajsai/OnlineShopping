import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html'
})
export class SignupModalComponent {
  @Input() show = false;
  @Output() closed = new EventEmitter<void>();
  @Output() switchToLogin = new EventEmitter<void>();

  signupFirstName = '';
  signupLastName = '';
  signupEmail = '';
  signupPassword = '';

  constructor(private authService: AuthService) {}

  signup(): void {
    if (this.signupFirstName && this.signupLastName && this.signupEmail && this.signupPassword) {
      this.authService.signup(this.signupFirstName, this.signupLastName, this.signupEmail, this.signupPassword);
      this.closed.emit();
      this.signupFirstName = '';
      this.signupLastName = '';
      this.signupEmail = '';
      this.signupPassword = '';
    }
  }

  closeModal(): void {
    this.closed.emit();
  }

  goToLogin(): void {
    this.switchToLogin.emit();
  }
}
