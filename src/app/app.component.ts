import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'MAISON';
  toastMessage = '';
  private subscription!: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.subscription = this.cartService.getToast().subscribe(msg => {
      this.toastMessage = msg;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
