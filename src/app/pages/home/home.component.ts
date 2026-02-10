import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <app-hero></app-hero>
    <app-product-list></app-product-list>
  `,
  styles: [':host { display: block; }']
})
export class HomeComponent {}
