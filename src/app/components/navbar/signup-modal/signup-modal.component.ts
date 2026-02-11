import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html'
})
export class SignupModalComponent {
  @Input() show = false;
  @Output() closed = new EventEmitter<void>();
  @Output() switchToLogin = new EventEmitter<void>();


  user:User = new User();

  constructor(private authService: AuthService) {}

  signup(signupForm : any): void {
    console.log(signupForm.value);
    console.log(this.user);
    }
  

  closeModal(): void {
    this.closed.emit();
  }

  goToLogin(): void {
    this.switchToLogin.emit();
  }
}
