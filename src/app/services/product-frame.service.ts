import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Hinge, kare, kare1, kare2, kare3, kare4, kare5, kare6, kare7, kare8, kare9, ProductsFrame } from '../data/product-frame.data';
import { color, glasscolor, locks, ProductFrame } from '../models/product-frame.model';
import { Product } from '../models/product.model';
import { ProductService } from './product.service';


@Injectable({
  providedIn: 'root'
})
export class ProductFrameService {

  private _productFrame$: Observable<any>;
  private _productFrameList$: Observable<ProductFrame[]>;
  private _productsFrame$: Observable<ProductFrame[]>;
  //private _productFrame: ProductFrame;
  productFrame: ProductFrame;
  private product: Product;
  private ftype = false;
  kares = kare;
 
  karearr: locks[] = [];
  kare1 = kare1;
  kare2 = kare2;
  kare3 = kare3;
  kare4 = kare4;
  kare5 = kare5;
  kare6 = kare6;
  kare7 = kare7;
  kare8 = kare8;
  kare9 = kare9;
  k = 
    {
      id:1,
    name:"",
    description: "",
    img_url: '',
    type:""
    }
  ;
_productFrame = {
  id:1,
    name:"",
    description: "",
    img_url: '',
    type:""
}


  constructor(private productService: ProductService) {
   }

  // Get all products
  getAllProductFrames(): Observable<ProductFrame[]> {
    this._productFrameList$ = of(ProductsFrame);
    return this._productFrameList$;
  }

  setProductFrame(productFrame: ProductFrame) {
    this._productFrame = productFrame;
    this.product = this.productService.product;
    this.product.product_frame = productFrame;
    this.productService.setProduct(this.product);
    this.k.type = this._productFrame.type;
  }
  kare: ProductFrame;
  nokare = false;
  currentkarename: string;
  setFrameKare(productKare: ProductFrame){
    this.kare = productKare;
    this.product.description= this.kare.type; //eikona kare
    this.currentkarename = productKare.description;
    console.log(this.currentkarename);
  }

  get frameKare(){
    return this.kare;
  }

  _gt10size: number;

  setgt10size(value: number){
    this._gt10size = value;
  }

  get gt10size(){
    return this._gt10size;
  }
  
  get karename(){
    return this.currentkarename;
  }

  get kareimg(){
    return this.kare.type;
  }

  getFrame(){
    return this._productFrame;
  }

  getProductFrame() {
    this._productFrame$ = this.getAllProductFrames().pipe(
      map(products => products.find(productFrame => this._productFrame = productFrame)));
    return this._productFrame;
  }

  get productframe(){
    return this.getProductFrame();
  }

  setFrameType(s: boolean){
    this.ftype = s;
  }

  color: color;
  colorGlass: glasscolor;
  hingecolor = Hinge;
  hinge: locks;
  setColorFrame(c: color){
    this.color = c;
    this.product.image_url = this.color.img;
    this.setimagecolor(c.img_thumb);
    if(this._productFrame.type === 'HINGED'){
      for(let i=0; i<=54; i++){
      if(this.color.name === this.hingecolor[i].color){
        this.hinge = this.hingecolor[i];
        this.product.product_frame.description = this.hingecolor[i].img;
        this.product.description = ''
      }
    }
  }else if( this._productFrame.type === 'WOODEN LEAF'){
    this.product.description = '';
    this.product.product_frame.description = './assets/product/door/woods/3rdhingeWooden.png'
  }
}
    


  setKareColor(img: string){
    this.product.description = img;
  }
    
  

  setColorGlass(c: glasscolor){
    this.colorGlass = c;
    this.product.glass_img = this.colorGlass.img;
    console.log(this.product.glass_img)
  }

  lockimg : string;
  lockname: string;
  imagecolor: string;
  lockImage(img: string, name: string){
    this.lockimg = img;
    this.lockname = name;
  }

  setimagecolor(color:string){
    this.imagecolor = color;
  }

  get Hinge(){
    return this.hinge;
  }

  get imageColor(){
    return this.imagecolor;
  }
  get lockimage(){
    return this.lockimg;
  }

  get locksname(){
    return this.lockname;
  }

  get isFramed(){
    if(this.k.type === 'FRAMED'){
      return true;
    }else if(this.k.type === '' || this.k.type != 'FRAMED'){
      return false;
    }
  }

  getColorFrame(){
    return this.color;
  }

  getColorGlass(){
    return this.colorGlass;
  }
  hinged = false;
  typehinged(b: boolean){
     this.hinged = b;
  }
  get typehinge(){
     if(this._productFrame.type === 'WOODEN LEAF' || this.hinged){
       return true;
     }else{
       return false;
     }
   }

  get colorframe(){
     return this.getColorFrame();
  }

  get colorglass(){
    return this.getColorGlass();
  }

  getFrameType(){
    return this.ftype;
  }

}