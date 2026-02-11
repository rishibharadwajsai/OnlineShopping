import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../models/user.model';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'http://localhost:5071/api/auth/register';
  private loginUrl = 'http://localhost:5071/api/auth/login';
  private currentUser$ = new BehaviorSubject<User | null>(null);
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  private mockOrders: Order[] = [
    {
      id: 'ORD-2026-001',
      date: new Date('2026-01-15'),
      items: [
        { productName: 'Heritage Chronograph', quantity: 1, price: 4250, imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=100&h=100&fit=crop' },
        { productName: 'Silk Pocket Square Set', quantity: 2, price: 320, imageUrl: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=100&h=100&fit=crop' }
      ],
      total: 4890,
      status: 'delivered'
    },
    {
      id: 'ORD-2026-002',
      date: new Date('2026-02-01'),
      items: [
        { productName: 'Cashmere Overcoat', quantity: 1, price: 2890, imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=100&h=100&fit=crop' }
      ],
      total: 2890,
      status: 'shipped'
    },
    {
      id: 'ORD-2026-003',
      date: new Date('2026-02-08'),
      items: [
        { productName: 'Fountain Pen — Onyx', quantity: 1, price: 560, imageUrl: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=100&h=100&fit=crop' },
        { productName: 'Cognac Leather Gloves', quantity: 1, price: 420, imageUrl: 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?w=100&h=100&fit=crop' }
      ],
      total: 980,
      status: 'processing'
    }
  ];

  getCurrentUser(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }

  getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  login(email: string, password: string): boolean {
    // Mock login
    const mockUser: User = {
      Name: 'Rishi Bharadwaj Sai',
      Email: 'rishi@gmail.com',
      Password: 'password123',
      ConfirmPassword: 'password123',
      Mobile: '1234567890',
    };
    this.currentUser$.next(mockUser);
    this.isLoggedIn$.next(true);
    return true;
  }

  // signup(firstName: string, lastName: string, email: string, password: string): boolean {
  //   const newUser: User = {
  //     id: 1,
  //     firstName,
  //     lastName,
  //     email,
  //     avatarUrl: ''
  //   };
  //   this.currentUser$.next(newUser);
  //   this.isLoggedIn$.next(true);
  //   return true;
  // }

  logout(): void {
    this.currentUser$.next(null);
    this.isLoggedIn$.next(false);
  }

  getOrders(): Order[] {
    return this.mockOrders;
  }

  getUserInitials(): string {
    const user = this.currentUser$.value;
    if (user) {
      return `${user.Name.charAt(0)}${user.Name.charAt(1)}`;
    }
    return '';
  }

  registerUser(user: User): Observable<any> {
    return this.http.post(this.registerUrl, user);
  }
}
