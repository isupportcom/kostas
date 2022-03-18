import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Products } from '../data/product.data';
import { ProductFrame } from '../models/product-frame.model';
import { Product } from './../models/product.model';
import { ProductFrameService } from './product-frame.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _product$: Observable<any>;
  private _productList$: Observable<Product[]>;
  private _products$: Observable<Product[]>;
  private _product: Product;

  constructor() { }


  // Get all products
  getAllProducts(): Observable<Product[]> {
    this._productList$ = of(Products);
    return this._productList$;
  }

  // Get products by category (In case we want to get products from a specific category)
  getProductsByCategory(category: string): Observable<Product[]> {
    this._products$ = this.getAllProducts().pipe(
      map(products => products.filter(product => product.category === category)));
    // this._products = this._productList.filter(product => product.category === category);
    return this._products$;
  }

  // Get a specific product by its id
  getProductById(id: number): Observable<Product> {
    this._product$ = this.getAllProducts().pipe(
      map(products => products.find(product => product.id === id)));
    return this._product$;
    // this._product = this._productList.find(product => product.id === id);
    // const product = of(this._productList.find(product => product.id === id));
    // return product;
  }

  setProduct(product: Product) {
    this._product = product;
  }

  private getProduct() {
    this._product$ = this.getAllProducts().pipe(
      map(products => products.find(product => this._product = product)));
    return this._product;
  }

  get product(): Product {
    return this.getProduct();
  }

}
