import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Layout Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { AnnouncementBarComponent } from './components/navbar/announcement-bar/announcement-bar.component';
import { SearchOverlayComponent } from './components/navbar/search-overlay/search-overlay.component';
import { LoginModalComponent } from './components/navbar/login-modal/login-modal.component';
import { SignupModalComponent } from './components/navbar/signup-modal/signup-modal.component';
import { MobileMenuComponent } from './components/navbar/mobile-menu/mobile-menu.component';
import { UserDropdownComponent } from './components/navbar/user-dropdown/user-dropdown.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductListComponent } from './components/product-list/product-list.component';

// Page Components
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AnnouncementBarComponent,
    SearchOverlayComponent,
    LoginModalComponent,
    SignupModalComponent,
    MobileMenuComponent,
    UserDropdownComponent,
    FooterComponent,
    HeroComponent,
    ProductCardComponent,
    ProductListComponent,
    HomeComponent,
    CartComponent,
    ProductDetailComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
