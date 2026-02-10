import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { User } from '../../models/user.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  cartCount = 0;
  isScrolled = false;
  showUserDropdown = false;
  showMobileMenu = false;
  showSearchOverlay = false;
  showLoginModal = false;
  showSignupModal = false;
  isLoggedIn = false;
  currentUser: User | null = null;
  searchQuery = '';
  searchResults: Product[] = [];

  // Login form
  loginEmail = '';
  loginPassword = '';

  // Signup form
  signupFirstName = '';
  signupLastName = '';
  signupEmail = '';
  signupPassword = '';

  private subscriptions: Subscription[] = [];

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private productService: ProductService,
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

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
    if (this.showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  openSearch(): void {
    this.showSearchOverlay = true;
    this.searchQuery = '';
    this.searchResults = [];
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const input = document.getElementById('search-input');
      if (input) input.focus();
    }, 100);
  }

  closeSearch(): void {
    this.showSearchOverlay = false;
    document.body.style.overflow = '';
  }

  onSearch(): void {
    if (this.searchQuery.trim().length > 1) {
      this.productService.searchProducts(this.searchQuery).subscribe(
        results => this.searchResults = results
      );
    } else {
      this.searchResults = [];
    }
  }

  selectSearchResult(product: Product): void {
    this.closeSearch();
    this.router.navigate(['/product', product.id]);
  }

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

  login(): void {
    if (this.loginEmail && this.loginPassword) {
      this.authService.login(this.loginEmail, this.loginPassword);
      this.closeModals();
      this.loginEmail = '';
      this.loginPassword = '';
    }
  }

  signup(): void {
    if (this.signupFirstName && this.signupLastName && this.signupEmail && this.signupPassword) {
      this.authService.signup(this.signupFirstName, this.signupLastName, this.signupEmail, this.signupPassword);
      this.closeModals();
      this.signupFirstName = '';
      this.signupLastName = '';
      this.signupEmail = '';
      this.signupPassword = '';
    }
  }

  logout(): void {
    this.authService.logout();
    this.showUserDropdown = false;
    this.router.navigate(['/']);
  }

  getUserInitials(): string {
    return this.authService.getUserInitials();
  }

  navigateHome(): void {
    this.router.navigate(['/']);
    this.showMobileMenu = false;
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
    this.showMobileMenu = false;
  }

  navigateToOrders(): void {
    this.router.navigate(['/orders']);
    this.showUserDropdown = false;
  }
}
