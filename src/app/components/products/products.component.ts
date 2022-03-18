import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// IMPORT SERVICES
import { ImageService } from './../../services/image.service';
import { ProductService } from './../../services/product.service';

// IMPORTS MODELS
import { Product } from './../../models/product.model';
import { ProductFrame } from 'src/app/models/product-frame.model';
import { ProductFrameService } from 'src/app/services/product-frame.service';
import { of } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @ViewChild('image') private elementImage: ElementRef;
  @ViewChild('glass') private elementGlass: ElementRef;
  @ViewChild('glass2') private elementGlass2: ElementRef;
  @ViewChild('walls') private elementWalls: ElementRef;
  @ViewChild('topWall') private elementTopWall: ElementRef;
  @ViewChild('imgDoor') private elementDoor: ElementRef;
  @ViewChild('imgDoor2') private element2Door: ElementRef;
  @ViewChild('imgLeft') private elementLeft: ElementRef;
  @ViewChild('imgRight') private elementRight: ElementRef;
  @ViewChild('imgTop') private elementTop: ElementRef;
  @ViewChild('imgHinge') private elementHinge: ElementRef;
  @ViewChild('kare') private elementKare: ElementRef;
  

  private _product: Product;
  private _products: Product[];

  @Input() frame :ProductFrame;
  constructor(
    private productService: ProductService,
    private pfService: ProductFrameService,
    private imageService: ImageService,
    private sanitizer: DomSanitizer
  ) { }


  ngOnInit(): void {
    const allProducts = this.products;
    this.productService.setProduct(allProducts[0]);
  }

  ngAfterViewInit(): void {
    this.imageService.image = this.elementImage.nativeElement;
    this.imageService.imageElementGlass = this.elementGlass.nativeElement;
    this.imageService.imageElementGlass2 = this.elementGlass2.nativeElement;
    this.imageService.imageElementWalls = this.elementWalls.nativeElement;
    this.imageService.imageElementTopWall = this.elementTopWall.nativeElement;
    this.imageService.imageElementDoor2 = this.element2Door.nativeElement;
    this.imageService.imageElementDoor = this.elementDoor.nativeElement;
    this.imageService.imageElementHinge = this.elementHinge.nativeElement;
    this.imageService.imageElementKare = this.elementKare.nativeElement;
    //this.imageService.imageElementRight = this.elementRight.nativeElement;
    //this.imageService.imageElementTop = this.elementTop.nativeElement;
  }

  sanitized(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  
  // GETTERS
  get products() {
    this.productService.getAllProducts()
      .subscribe(products => this._products = products);
    return this._products;
  }

  get product() {
    this._product = this.productService.product;
    return this._product;
  }

  get validLeft(): boolean {
    return this.imageService.validLeft;
  }

  get validRight(): boolean {
    return this.imageService.validRight;
  }

  get validTop(): boolean {
    return this.imageService.validTop;
  }

  get validLockLeft(){
    return this.imageService.validLockLeft;
  }
  get validLockRight(){
    return this.imageService.validLockRight;
  }

  get imageframe(){
    let image = '';
    if(!!this.pfService.productframe){
      image =  this.pfService.productframe.img_url;
    }
      return image; 
  }

  get isframed(){
    if(this.pfService.isFramed){
      return true;
    }else{
      return false;
    }
  }

  get iswooden(){
    if(this.pfService.productframe.type === 'WOODEN LEAF'){
      return true;
    }else{
      return false;
    }
  }

  get noimage(){
    if(this.product.description === 'A modern door description' || this.product.description === ''){
      return true;
    }else{
      return false;
    }
  }

  get imageglass(){
    let image = '';
    if(!!this.pfService.colorglass){
      image = this.pfService.colorglass.thumb_img;
    }
    return image;
  }

  get imagelock(){
    let image= '';
    if(!!this.pfService.lockimage){
      image = this.pfService.lockimage;
    }
    return image;
  }

  get imagecolor(){
    let image="";
    if(!!this.pfService.imageColor){
      image = this.pfService.imageColor;
    }
    return image;
  }

  get imagedin(){
    let image= '';
    if(this.imageService.validLockLeft){
      image = this.imageService.lockleft;
    }else{
      image =  this.imageService.lockright;
    }
    return image;
  }

  get doorheight(){
    if(this.imageService.currentDoorHeight >= 230 && this.pfService.typehinge){
      return true;
    }else{
      return false;
    }
  }

  

  /* private _printImage() {
    html2canvas(document.querySelector('.img-container')).then(canvas => {
      const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      console.log(canvas.toDataURL())
      this.imageService.setImageUrl(image);
    });
  }

  get printImage() {
    return this._printImage();
  } */
}
