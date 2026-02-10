import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  relatedProducts: Product[] = [];
  quantity = 1;
  isAdding = false;
  isLoading = true;
  selectedTab: 'description' | 'details' | 'shipping' = 'description';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadProduct(id);
    });
  }

  private loadProduct(id: number): void {
    this.isLoading = true;
    this.productService.getProductById(id).subscribe(product => {
      this.product = product;
      if (product) {
        this.loadRelatedProducts(product.category, product.id);
      }
      setTimeout(() => this.isLoading = false, 300);
    });
  }

  private loadRelatedProducts(category: string, excludeId: number): void {
    this.productService.getProductsByCategory(category).subscribe(products => {
      this.relatedProducts = products.filter(p => p.id !== excludeId).slice(0, 4);
    });
  }

  incrementQuantity(): void {
    this.quantity++;
  }

  decrementQuantity(): void {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart(): void {
    if (this.product && this.product.inStock) {
      this.isAdding = true;
      this.cartService.addToCart(this.product, this.quantity);
      setTimeout(() => this.isAdding = false, 800);
    }
  }

  get isInCart(): boolean {
    return this.product ? this.cartService.isInCart(this.product.id) : false;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  get discountPercent(): number | null {
    if (this.product?.originalPrice && this.product.originalPrice > this.product.price) {
      return Math.round(((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100);
    }
    return null;
  }
}
