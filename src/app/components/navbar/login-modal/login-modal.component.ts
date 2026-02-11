import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html'
})
export class LoginModalComponent {
  @Input() show = false;
  @Output() closed = new EventEmitter<void>();
  @Output() switchToSignup = new EventEmitter<void>();

  loginEmail = '';
  loginPassword = '';

  constructor(private authService: AuthService) {}

  login(): void {
    if (this.loginEmail && this.loginPassword) {
      this.authService.login(this.loginEmail, this.loginPassword);
      this.closed.emit();
      this.loginEmail = '';
      this.loginPassword = '';
    }
  }

  closeModal(): void {
    this.closed.emit();
  }

  goToSignup(): void {
    this.switchToSignup.emit();
  }
}
