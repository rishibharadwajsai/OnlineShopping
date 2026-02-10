import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Product } from '../models/product.model';
import { MOCK_PRODUCTS, PRODUCT_CATEGORIES } from '../data/mock-products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products$ = new BehaviorSubject<Product[]>(MOCK_PRODUCTS);

  getProducts(): Observable<Product[]> {
    return this.products$.asObservable();
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.products$.pipe(
      map(products => products.find(p => p.id === id))
    );
  }

  getFeaturedProducts(): Observable<Product[]> {
    return this.products$.pipe(
      map(products => products.filter(p => p.featured))
    );
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    if (category === 'All') {
      return this.getProducts();
    }
    return this.products$.pipe(
      map(products => products.filter(p => p.category === category))
    );
  }

  getCategories(): string[] {
    return PRODUCT_CATEGORIES;
  }

  searchProducts(query: string): Observable<Product[]> {
    const lowerQuery = query.toLowerCase();
    return this.products$.pipe(
      map(products => products.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
      ))
    );
  }
}
