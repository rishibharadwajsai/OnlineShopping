import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html'
})
export class UserDropdownComponent {
  @Input() currentUser: User | null = null;

  showUserDropdown = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-dropdown-container')) {
      this.showUserDropdown = false;
    }
  }

  toggleUserDropdown(event: Event): void {
    event.stopPropagation();
    this.showUserDropdown = !this.showUserDropdown;
  }

  getUserInitials(): string {
    return this.authService.getUserInitials();
  }

  navigateToOrders(): void {
    this.router.navigate(['/orders']);
    this.showUserDropdown = false;
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
    this.showUserDropdown = false;
  }

  logout(): void {
    this.authService.logout();
    this.showUserDropdown = false;
    this.router.navigate(['/']);
  }
}
