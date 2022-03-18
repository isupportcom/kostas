import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductType } from '../models/product-type.model';
import { ProductsType } from '../data/product-type.data';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  private _productType$: Observable<any>;
  private _productTypeList$: Observable<ProductType[]>;
  private _productsType$: Observable<ProductType[]>;
  private _productType: ProductType;
  private product: Product;

  constructor(private productService: ProductService) { }

  // Get all products
  getAllProductTypes(): Observable<ProductType[]> {
    this._productTypeList$ = of(ProductsType);
    return this._productTypeList$;
  }

  setProductType(productType: ProductType) {
    this._productType = productType;
    this.product = this.productService.product;
    this.product.product_type = productType;

  }

  getProductType() {
    this._productType$ = this.getAllProductTypes().pipe(
      map(products => products.find(productType => this._productType = productType)));
    return this._productType;
  }

  get productType() {
    return this.getProductType();
  }
}
