import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory = 'All';
  sortOption = 'featured';
  isLoading = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.categories = this.productService.getCategories();
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProductsByCategory(this.selectedCategory).subscribe(products => {
      this.products = products;
      this.applySort();
      // Simulate loading for elegant transition
      setTimeout(() => this.isLoading = false, 300);
    });
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.loadProducts();
  }

  onSortChange(sort: string): void {
    this.sortOption = sort;
    this.applySort();
  }

  private applySort(): void {
    let sorted = [...this.products];
    switch (this.sortOption) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    this.filteredProducts = sorted;
  }
}
