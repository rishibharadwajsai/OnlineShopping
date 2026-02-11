import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.css']
})
export class MobileMenuComponent {
  @Input() show = false;
  @Input() cartCount = 0;
  @Input() isLoggedIn = false;
  @Input() currentUser: User | null = null;
  @Output() closed = new EventEmitter<void>();
  @Output() openLogin = new EventEmitter<void>();
  @Output() openSignup = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  close(): void {
    this.closed.emit();
  }

  navigateHome(): void {
    this.router.navigate(['/']);
    this.close();
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
    this.close();
  }

  navigateToOrders(): void {
    this.router.navigate(['/orders']);
    this.close();
  }

  getUserInitials(): string {
    return this.authService.getUserInitials();
  }

  logout(): void {
    this.authService.logout();
    this.close();
    this.router.navigate(['/']);
  }

  onOpenLogin(): void {
    this.openLogin.emit();
  }

  onOpenSignup(): void {
    this.openSignup.emit();
  }
}
