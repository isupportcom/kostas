import { Component, OnInit, Output, ViewEncapsulation } from '@angular/core';

// IMPORT SERVICES
import { ProductService } from './../../../services/product.service';
import { AuthService } from './../../../services/auth.service';

// IMPORT MODELS
import { Product } from './../../../models/product.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit {

  private _product: Product;
  private _products: Product[] = [];
  constructor(
    private auth: AuthService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    if (!this._product) {
      this._product = this.productService.product;
    }
    this.productService.getAllProducts()
      .subscribe((products) => this._products = products);
  }

  setProduct(product: Product): void {
    this._product = product;
  }

  // GETTERS
  get productDetails() {
    return this._product;
  }

  get products(): Product[] {
    return this._products;
  }

  get loggedIn(): boolean {
    return this.auth.isLoggedIn;
  }

}

