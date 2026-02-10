import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Order } from '../../models/user.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getIsLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.orders = this.authService.getOrders();
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'delivered': return 'var(--color-success)';
      case 'shipped': return 'var(--color-info)';
      case 'processing': return 'var(--color-gold-dark)';
      case 'cancelled': return 'var(--color-error)';
      default: return 'var(--color-ash)';
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
