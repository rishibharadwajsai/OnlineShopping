import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-search-overlay',
  templateUrl: './search-overlay.component.html'
})
export class SearchOverlayComponent {
  @Input() show = false;
  @Output() closed = new EventEmitter<void>();

  searchQuery = '';
  searchResults: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnChanges(): void {
    if (this.show) {
      this.searchQuery = '';
      this.searchResults = [];
      setTimeout(() => {
        const input = document.getElementById('search-input');
        if (input) input.focus();
      }, 100);
    }
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

  closeSearch(): void {
    this.closed.emit();
  }
}
