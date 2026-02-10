import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems$ = new BehaviorSubject<CartItem[]>([]);
  private toastMessage$ = new BehaviorSubject<string>('');

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems$.asObservable();
  }

  getCartCount(): Observable<number> {
    return this.cartItems$.pipe(
      map(items => items.reduce((total, item) => total + item.quantity, 0))
    );
  }

  getCartTotal(): Observable<number> {
    return this.cartItems$.pipe(
      map(items => items.reduce((total, item) => total + (item.product.price * item.quantity), 0))
    );
  }

  getToast(): Observable<string> {
    return this.toastMessage$.asObservable();
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentItems = this.cartItems$.value;
    const existingIndex = currentItems.findIndex(item => item.product.id === product.id);

    if (existingIndex > -1) {
      const updatedItems = [...currentItems];
      updatedItems[existingIndex] = {
        ...updatedItems[existingIndex],
        quantity: updatedItems[existingIndex].quantity + quantity
      };
      this.cartItems$.next(updatedItems);
    } else {
      this.cartItems$.next([...currentItems, { product, quantity }]);
    }
    this.showToast(`${product.name} added to cart`);
  }

  removeFromCart(productId: number): void {
    const currentItems = this.cartItems$.value;
    const removedItem = currentItems.find(item => item.product.id === productId);
    this.cartItems$.next(currentItems.filter(item => item.product.id !== productId));
    if (removedItem) {
      this.showToast(`${removedItem.product.name} removed from cart`);
    }
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    const currentItems = this.cartItems$.value;
    const updatedItems = currentItems.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    this.cartItems$.next(updatedItems);
  }

  clearCart(): void {
    this.cartItems$.next([]);
    this.showToast('Cart cleared');
  }

  isInCart(productId: number): boolean {
    return this.cartItems$.value.some(item => item.product.id === productId);
  }

  private showToast(message: string): void {
    this.toastMessage$.next(message);
    setTimeout(() => this.toastMessage$.next(''), 3000);
  }
}
