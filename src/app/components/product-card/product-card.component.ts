import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  isAdding = false;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  addToCart(event: Event): void {
    event.stopPropagation();
    if (this.product.inStock) {
      this.isAdding = true;
      this.cartService.addToCart(this.product);
      setTimeout(() => this.isAdding = false, 800);
    }
  }

  viewProduct(): void {
    this.router.navigate(['/product', this.product.id]);
  }

  get discountPercent(): number | null {
    if (this.product.originalPrice && this.product.originalPrice > this.product.price) {
      return Math.round(((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100);
    }
    return null;
  }

  get isInCart(): boolean {
    return this.cartService.isInCart(this.product.id);
  }
}
