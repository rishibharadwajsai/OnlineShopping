import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  cartCount = 0;
  isScrolled = false;
  showMobileMenu = false;
  showSearchOverlay = false;
  showLoginModal = false;
  showSignupModal = false;
  isLoggedIn = false;
  currentUser: User | null = null;

  private subscriptions: Subscription[] = [];

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.cartService.getCartCount().subscribe(count => this.cartCount = count),
      this.authService.getIsLoggedIn().subscribe(loggedIn => this.isLoggedIn = loggedIn),
      this.authService.getCurrentUser().subscribe(user => this.currentUser = user)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  // --- Mobile Menu ---
  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
    document.body.style.overflow = this.showMobileMenu ? 'hidden' : '';
  }

  closeMobileMenu(): void {
    this.showMobileMenu = false;
    document.body.style.overflow = '';
  }

  // --- Search Overlay ---
  openSearch(): void {
    this.showSearchOverlay = true;
    document.body.style.overflow = 'hidden';
  }

  closeSearch(): void {
    this.showSearchOverlay = false;
    document.body.style.overflow = '';
  }

  // --- Auth Modals ---
  openLoginModal(): void {
    this.showLoginModal = true;
    this.showSignupModal = false;
    this.showMobileMenu = false;
    document.body.style.overflow = 'hidden';
  }

  openSignupModal(): void {
    this.showSignupModal = true;
    this.showLoginModal = false;
    this.showMobileMenu = false;
    document.body.style.overflow = 'hidden';
  }

  closeModals(): void {
    this.showLoginModal = false;
    this.showSignupModal = false;
    document.body.style.overflow = '';
  }

  // --- Navigation ---
  navigateHome(): void {
    this.router.navigate(['/']);
    this.showMobileMenu = false;
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
    this.showMobileMenu = false;
  }
}
