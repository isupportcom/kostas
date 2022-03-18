import {
  Component,
  OnInit,
  AfterViewInit,
  Renderer2,
  ViewEncapsulation,
  ɵSWITCH_RENDERER2_FACTORY__POST_R3__
} from '@angular/core';

// IMPORT SERVICES
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductTypeService } from 'src/app/services/product-type.service';

// IMPORT MODELS
import { Product } from 'src/app/models/product.model';
import { ProductType } from 'src/app/models/product-type.model';
import { color, ProductFrame } from 'src/app/models/product-frame.model';
import { dk24, gt14dl, hs07 } from 'src/app/data/product-frame.data';
import { ProductFrameService } from 'src/app/services/product-frame.service';
import { StringValueToken } from 'html2canvas/dist/types/css/syntax/tokenizer';

@Component({
  selector: 'app-product-settings',
  templateUrl: './product-settings.component.html',
  styleUrls: ['./product-settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductSettingsComponent implements OnInit, AfterViewInit {

  private width: number;
  private height: number;

  private imageGlass;
  private imageGlass2;
  private imageWalls;
  private imageTopWall;
  private imageDoor;
  private imageDoor2;
  private imageDoorLeft;
  private imageDoorRight;
  private imageDoorTop;
  private imageHinge;
  private imageKare;


  private _selectedProduct: Product;
  private _selectedProductType: ProductType;

  private _validLeft: boolean;
  private _validRight: boolean;
  private _validTop: boolean;

  private _initDoorWidth: number;
  private _initDoorHeight: number;

  private _initLeftWidth: number;
  private _initLeftHeight: number;

  private _initRightWidth: number;
  private _initRightHeight: number;

  private _initTopWidth: number;
  private _initTopHeight: number;

  private _currentDoorWidth: number;
  private _currentDoorHeight: number;

  private _currentLeftWidth: number;
  private _currentRightWidth: number;
  private _currentTopWidth: number;

  private _currentLeftHeight: number;
  private _currentRightHeight: number;
  private _currentTopHeight: number;

  private _fullWidth: number;
  private _fullHeight: number;

  

  constructor(
    private renderer: Renderer2,
    private productService: ProductService,
    private productTypeService: ProductTypeService,
    private imageService: ImageService,
    private pfService: ProductFrameService
  ) {
    this.width = 50;
    this.height = 190;

    this._currentLeftWidth = 0;
    this._currentRightWidth = 0;
    this._currentTopHeight = 0;

    this._validLeft = this.imageService.validLeft;
    this._validRight = this.imageService.validRight;
    this._validTop = this.imageService.validTop;
  }

  bntStyle0: string;
  bntStyle1: string;
  limit: number;
  query = window.matchMedia("(max-width: 1840px)")

  ngOnInit(): void {

    this.bntStyle0 = 'btn-';
    this.bntStyle1 = 'btn-';
    
    if(this.pfService.productframe.type === "HINGED" || this.pfService.productframe.type === 'WOODEN LEAF'){
      console.log("ANOTHER LIMIT")
      this.limit = 320;
    }else{
      this.limit = 300;
    }

    if(this.imageService.validLockLeft){
      this.bntStyle0 = 'active';
    }else if(this.imageService.validLockRight) {
      this.bntStyle1 = 'active';
    }

    this._selectedProduct = this.productService.product;
    this._selectedProductType = this.productTypeService.productType;

    this.imageGlass = this.imageService.imageElementGlass;
    this.imageGlass2 = this.imageService.imageElementGlass2;
    this.imageWalls = this.imageService.imageElementWalls;
    this.imageTopWall = this.imageService.imageElementTopWall;
    this.imageDoor = this.imageService.imageElementDoor;
    this.imageDoor2 = this.imageService.imageElementDoor2;
    this.imageDoorLeft = this.imageService.imageElementLeft;
    this.imageDoorRight = this.imageService.imageElementRight;
    this.imageDoorTop = this.imageService.imageElementTop;
    this.imageHinge = this.imageService.imageElementHinge;
    this.imageKare = this.imageService.imageElementKare;

    // Door section START
   

    if (this.query.matches) { // If media query matches
      this.imageService.setInitDoorWidth(this.imageDoor.naturalWidth/1.66);
      this.imageService.setInitDoorHeight(this.imageDoor.naturalHeight/1.66);
    } else{
      this.imageService.setInitDoorWidth(this.imageDoor.naturalWidth);
      this.imageService.setInitDoorHeight(this.imageDoor.naturalHeight);
    }
      

    this._initDoorWidth = this.imageService.initDoorWidth;
    this._initDoorHeight = this.imageService.initDoorHeight;

    if (!!(this.imageService.currentDoorWidth || this.imageService.currentDoorHeight)) {
      this._currentDoorWidth = this.imageService.currentDoorWidth;
      this._currentDoorHeight = this.imageService.currentDoorHeight;
    } else {
      this.imageService.setCurrentDoorWidth(this.width);
      this.imageService.setCurrentDoorHeight(this.height);
      this._currentDoorWidth = this.width;
      this._currentDoorHeight = this.height;
    }
    // Door section END

    /*/ DoorLeft section START
    this.imageService.setInitLeftWidth(this.imageDoorLeft.naturalWidth);
    this.imageService.setInitLeftHeight(this.imageDoorLeft.naturalHeight);

    this._initLeftWidth = this.imageService.initLeftWidth;
    this._initLeftHeight = this.imageService.initLeftHeight;

    if (!!(this.imageService.currentLeftWidth || this.imageService.currentLeftHeight)) {
      this._currentLeftWidth = this.imageService.currentLeftWidth;
      this._currentLeftHeight = this.imageService.currentLeftHeight;
    } else {
      this.imageService.setCurrentLeftWidth(this.width);
      this.imageService.setCurrentLeftHeight(this.height);
      this._currentLeftWidth = this.width;
      this._currentLeftHeight = this.height;
    }
    // DoorLeft section END

    // DoorRight section START
    this.imageService.setInitRightWidth(this.imageDoorRight.naturalWidth);
    this.imageService.setInitRightHeight(this.imageDoorRight.naturalHeight);

    this._initRightWidth = this.imageService.initRightWidth;
    this._initRightHeight = this.imageService.initRightHeight;

    if (!!(this.imageService.currentRightWidth || this.imageService.currentRightHeight)) {
      this._currentRightWidth = this.imageService.currentRightWidth;
      this._currentRightHeight = this.imageService.currentRightHeight;
    } else {
      this.imageService.setCurrentRightWidth(this.width);
      this.imageService.setCurrentRightHeight(this.height);
      this._currentRightWidth = this.width;
      this._currentRightHeight = this.height;
    }
    // DoorRight section END*/

    /*/ DoorTop section START

      this.imageService.setInitTopWidth(this.imageDoor.naturalWidth);
      this.imageService.setInitTopHeight(this.imageDoorTop.naturalHeight);

    this._initTopWidth = this.imageService.initTopWidth;
    this._initTopHeight = this.imageService.initTopHeight;

    if (!!(this.imageService.currentTopWidth || this.imageService.currentTopHeight)) {
      this._currentTopWidth = this.imageService.currentTopWidth;
      this._currentTopHeight = this.imageService.currentTopHeight;
    } else {
      this.imageService.setCurrentTopWidth(this.width);
      this.imageService.setCurrentTopHeight(this.width);
      this._currentTopWidth = this.width;
      // ALLAGI
      this._currentTopHeight = this.width;
    }
    // DoorTop section END

    // IF SECTION FULL WIDTH & FULL HEIGHT
    if (!!this.imageService.fullWidth) {
      this._fullWidth = this.imageService.fullWidth;
    } else {
      this._fullWidth = this.width;
      this.imageService.setFullWidth(this.width);
    }

    if (!!this.imageService.fullHeight) {
      this._fullHeight = this.imageService.fullHeight;
    } else {
      this._fullHeight = this.fullHeight;
      this.imageService.setFullHeight(this.height);
    }
    // IF SECTION FULL WIDTH & FULL HEIGHT

    if (!!(this._selectedProductType)) {
      switch (this._selectedProductType.position) {
        case 'l':
          {
            this._validLeft = true;
            this._validRight = false;
            this._validTop = false;

            this.imageService.setValidLeft(true);
            this.imageService.setValidRight(false);
            this.imageService.setValidTop(false);

            // DEFINE 0
            this._currentRightWidth = 0;
            this._currentTopWidth = 0;
            this._currentRightHeight = 0;
            this._currentTopHeight = 0;

            this.imageService.setCurrentRightWidth(0);
            this.imageService.setCurrentTopWidth(0);
            this.imageService.setCurrentRightHeight(0);
            this.imageService.setCurrentTopHeight(0);
            // DEFINE 0

            this.defineLeft();

            this._fullWidth = this.fullWidth;
            this.imageService.setFullWidth(this._fullWidth);

            this._fullHeight = this.fullHeight;
            this.imageService.setFullHeight(this._fullHeight);

            break;
          }
        case 'r':
          {
            this._validLeft = false;
            this._validRight = true;
            this._validTop = false;

            this.imageService.setValidLeft(false);
            this.imageService.setValidRight(true);
            this.imageService.setValidTop(false);

            // DEFINE 0
            this._currentLeftWidth = 0;
            this._currentTopWidth = 0;
            this._currentLeftHeight = 0;
            this._currentTopHeight = 0;

            this.imageService.setCurrentLeftWidth(0);
            this.imageService.setCurrentTopWidth(0);
            this.imageService.setCurrentLeftHeight(0);
            this.imageService.setCurrentTopHeight(0);
            // DEFINE 0

            this.defineRight();

            this._fullWidth = this.fullWidth;
            this.imageService.setFullWidth(this._fullWidth);

            this._fullHeight = this.fullHeight;
            this.imageService.setFullHeight(this._fullHeight);

            break;
          }
        case 't':
          {
            this._validLeft = false;
            this._validRight = false;
            this._validTop = true;

            this.imageService.setValidLeft(false);
            this.imageService.setValidRight(false);
            this.imageService.setValidTop(true);

            // DEFINE 0
            this._currentLeftWidth = 0;
            this._currentRightWidth = 0;
            this._currentLeftHeight = 0;
            this._currentRightHeight = 0;

            this.imageService.setCurrentLeftWidth(0);
            this.imageService.setCurrentRightWidth(0);
            this.imageService.setCurrentLeftHeight(0);
            this.imageService.setCurrentRightHeight(0);
            // DEFINE 0

            this.defineTop();

            this._fullWidth = this.fullWidth;
            this.imageService.setFullWidth(this._fullWidth);

            this._fullHeight = this.fullHeight;
            this.imageService.setFullHeight(this._fullHeight);

            break;
          }
        case 'lr':
          {
            this._validLeft = true;
            this._validRight = true;
            this._validTop = false;

            this.imageService.setValidLeft(true);
            this.imageService.setValidRight(true);
            this.imageService.setValidTop(false);

            // DEFINE 0
            this._currentTopWidth = 0;
            this._currentTopHeight = 0;

            this.imageService.setCurrentTopWidth(0);
            this.imageService.setCurrentTopHeight(0);
            // DEFINE 0

            this.defineLeft();
            this.defineRight();

            this._fullWidth = this.fullWidth;
            this.imageService.setFullWidth(this._fullWidth);

            this._fullHeight = this.fullHeight;
            this.imageService.setFullHeight(this._fullHeight);

            break;
          }
        case 'tl':
          {
            this._validLeft = true;
            this._validRight = false;
            this._validTop = true;

            this.imageService.setValidLeft(true);
            this.imageService.setValidRight(false);
            this.imageService.setValidTop(true);

            // DEFINE 0
            this._currentRightWidth = 0;
            this._currentRightHeight = 0;

            this.imageService.setCurrentRightWidth(0);
            this.imageService.setCurrentRightHeight(0);
            // DEFINE 0

            this.defineTop();
            this.defineLeft();

            this._fullWidth = this.fullWidth;
            this.imageService.setFullWidth(this._fullWidth);

            this._fullHeight = this.fullHeight;
            this.imageService.setFullHeight(this._fullHeight);

            break;
          }
        case 'tr':
          {
            this._validLeft = false;
            this._validRight = true;
            this._validTop = true;

            this.imageService.setValidLeft(false);
            this.imageService.setValidRight(true);
            this.imageService.setValidTop(true);

            // DEFINE 0
            this._currentLeftWidth = 0;
            this._currentLeftHeight = 0;

            this.imageService.setCurrentLeftWidth(0);
            this.imageService.setCurrentLeftHeight(0);
            // DEFINE 0

            this.defineTop();
            this.defineRight();

            this._fullWidth = this.fullWidth;
            this.imageService.setFullWidth(this._fullWidth);

            this._fullHeight = this.fullHeight;
            this.imageService.setFullHeight(this._fullHeight);

            break;
          }
        case 'all':
          {
            this._validLeft = true;
            this._validRight = true;
            this._validTop = true;

            this.imageService.setValidLeft(true);
            this.imageService.setValidRight(true);
            this.imageService.setValidTop(true);

            this.defineLeft();
            this.defineRight();
            this.defineTop();

            this._fullWidth = this.fullWidth;
            this.imageService.setFullWidth(this._fullWidth);

            this._fullHeight = this.fullHeight;
            this.imageService.setFullHeight(this._fullHeight);

            break;
          }
        default:
          {
            this._validLeft = false;
            this._validRight = false;
            this._validTop = false;

            this.imageService.setValidLeft(false);
            this.imageService.setValidRight(false);
            this.imageService.setValidTop(false);

            // DEFINE 0
            this._currentLeftWidth = 0;
            this._currentRightWidth = 0;
            this._currentTopWidth = 0;

            this._currentLeftHeight = 0;
            this._currentRightHeight = 0;
            this._currentTopHeight = 0;

            this.imageService.setCurrentLeftWidth(0);
            this.imageService.setCurrentRightWidth(0);
            this.imageService.setCurrentTopWidth(0);

            this.imageService.setCurrentLeftHeight(0);
            this.imageService.setCurrentRightHeight(0);
            this.imageService.setCurrentTopHeight(0);
            // DEFINE 0

            break;
          }
      }
    }
    */
  }

  ngAfterViewInit(): void {
    this.resizeImageDoorWidth(this._currentDoorWidth);
    this.resizeImageDoorHeight(this._currentDoorHeight);

    if (this._validLeft) {
      this.resizeImageLeftWidth(this._currentLeftWidth);
    }
    if (this._validRight) {
      this.resizeImageRightWidth(this._currentRightWidth);
    }
    if (this._validTop) {
      this.resizeImageTopHeight(this._currentTopHeight);
    }
  }

  formatLabel(value: number): string {
    if (value >= 50 && value <= 120) {
      return (value / 100) + 'm';
    }
    return value + 'm';
  }


  get findlimit(){
    return this.limit;
  }

  // GETTERS
  get selectedProduct(): Product {
    return this._selectedProduct;
  }

  get currentDoorWidth(): number {
    return this._currentDoorWidth;
  }

  get currentDoorHeight(): number {
    return this._currentDoorHeight;
  }

  get currentLeftWidth(): number {
    return this._currentLeftWidth;
  }

  get currentLeftHeight(): number {
    return this._currentLeftHeight;
  }

  get currentRightWidth(): number {
    return this._currentRightWidth;
  }

  get currentRightHeight(): number {
    return this._currentRightHeight;
  }

  get currentTopWidth(): number {
    return this._currentTopWidth;
  }

  get currentTopHeight(): number {
    return this._currentTopHeight;
  }

  get validLeft(): boolean {
    return this._validLeft;
  }

  get validRight(): boolean {
    return this._validRight;
  }

  get validTop(): boolean {
    return this._validTop;
  }

  get fullWidth() {
    let leftWidth: number;
    let rightWidth: number;
    if (this.validLeft) {
      leftWidth = this._currentLeftWidth;
    } else {
      leftWidth = 0;
    }

    if (this.validRight) {
      rightWidth = this._currentRightWidth;
    } else {
      rightWidth = 0;
    }
    return this._currentDoorWidth + leftWidth + rightWidth;
  }

  get fullHeight() {
    let topHeight: number;
    if (this.validTop) {
      topHeight = this._currentTopHeight;
    } else {
      topHeight = 0;
    }
    return this._currentDoorHeight + topHeight;
  }

  // SETTERS
  set currentDoorWidth(value: number) {
    this._currentDoorWidth = value;
  }

  set currentDoorHeight(value: number) {
    this._currentDoorHeight = value;
  }

  set currentLeftWidth(value: number) {
    this._currentLeftWidth = value;
  }

  set currentLeftHeight(value: number) {
    this._currentLeftHeight = value;
  }

  set currentRightWidth(value: number) {
    this._currentRightWidth = value;
  }

  set currentRightHeight(value: number) {
    this._currentRightHeight = value;
  }

  set currentTopWidth(value: number) {
    this._currentTopWidth = value;
  }

  set currentTopHeight(value: number) {
    this._currentTopHeight = value;
  }

  // FUNCTIONS
  resizeImageDoorWidth(width: number): void {
    if (width < 50 || width > 120) {
      width = 50;
      this._currentDoorWidth = 50;
      this.imageService.setCurrentDoorWidth(50);
      if (this.validTop) {
        this._currentTopWidth = 50;
        this.imageService.setCurrentTopWidth(50);
      }
    } else {
      this._currentDoorWidth = width;
      this.imageService.setCurrentDoorWidth(width);
      if (this.validTop) {
        this._currentTopWidth = width;
        this.imageService.setCurrentTopWidth(width);
      }
    }
    const doorWidth = this._initDoorWidth + (width - 50);
    const smalldoorWidth = this._initDoorWidth + ((((width-50)/2) + 50) - 50);
    this.imageService.setFullWidth(this.fullWidth);
    console.log(smalldoorWidth);
    if(true){
      this.renderer.setStyle(this.imageDoor, 'width', smalldoorWidth-5 + 'px');
      this.renderer.setStyle(this.imageHinge, 'width', smalldoorWidth -5 + 'px');
    this.renderer.setStyle(this.imageDoor2,'width', smalldoorWidth-5 + 'px');
    this.renderer.setStyle(this.imageGlass,'width', smalldoorWidth-5 + 'px');
    this.renderer.setStyle(this.imageGlass2,'width', smalldoorWidth-5 + 'px');
    this.renderer.setStyle(this.imageKare,'width', smalldoorWidth-5 + 'px');
    }else{
      this.renderer.setStyle(this.imageDoor, 'width', doorWidth + 'px');
      this.renderer.setStyle(this.imageHinge, 'width', doorWidth + 'px');
    this.renderer.setStyle(this.imageDoor2,'width', doorWidth + 'px');
    this.renderer.setStyle(this.imageGlass,'width', doorWidth + 'px');
    this.renderer.setStyle(this.imageKare,'width', doorWidth + 'px');
    }
    
    //this.renderer.setStyle(this.imageWalls,'width', doorWidth + 'px');
    if (this.validTop) {
      this.renderer.setStyle(this.imageDoorTop, 'width', doorWidth + 'px');
    }
  }

  renderTop(top: number,wdth: number): void{
    this.renderer.setStyle(this.imageTopWall, 'height', top  + 'px');
    if(wdth>600){
      this.renderer.setStyle(this.imageTopWall, 'width', 675  + 'px');
    }else{
      this.renderer.setStyle(this.imageTopWall, 'width', 410  + 'px');
    }
    
    
  }


  resizeImageDoorHeight(height: number): void {
    if (height < 190 || height > this.limit) {
      height = 190;
      this._currentDoorHeight = height;
      this.imageService.setCurrentDoorHeight(height);
      if (this.validLeft) {
        if (this.validTop) {
          this._currentLeftHeight = this._currentDoorHeight + this._currentTopHeight;
          this.imageService.setCurrentLeftHeight(this._currentLeftHeight);
        } else {
          this._currentLeftHeight = height;
          this.imageService.setCurrentLeftHeight(height);
        }
      }
      if (this.validRight) {
        if (this.validTop) {
          this._currentRightHeight = this._currentDoorHeight + this._currentTopHeight;
          this.imageService.setCurrentRightHeight(this._currentRightHeight);
        } else {
          this._currentRightHeight = height;
          this.imageService.setCurrentRightHeight(height);
        }
      }
    } else {
      this._currentDoorHeight = height;
      this.imageService.setCurrentDoorHeight(height);
      if (this.validLeft) {
        if (this.validTop) {
          this._currentLeftHeight = this._currentDoorHeight + this._currentTopHeight;
          this.imageService.setCurrentLeftHeight(this._currentLeftHeight);
        } else {
          this._currentLeftHeight = height;
          this.imageService.setCurrentLeftHeight(height);
        }
      }
      if (this.validRight) {
        if (this.validTop) {
          this._currentRightHeight = this._currentDoorHeight + this._currentTopHeight;
          this.imageService.setCurrentRightHeight(this._currentRightHeight);
        } else {
          this._currentRightHeight = height;
          this.imageService.setCurrentRightHeight(height);
        }
      }
    }
    const doorHeight = this._initDoorHeight + (this._currentDoorHeight - 190);
    const topHeight = this._initTopHeight + (this._currentTopHeight - 100);
    let marginHeight = this._currentDoorHeight-190;
    let top = this.imageService.initDoorHeight; 

    this.imageService.setFullHeight(this.fullHeight);
  const smalldoorHeight = this._initDoorHeight + ((this._currentDoorHeight - 190)/2);
  let smallmarginHeight = (this._currentDoorHeight-190)/2;

    if(true){
      this.renderer.setStyle(this.imageGlass, 'height', smalldoorHeight + 'px');
      this.renderer.setStyle(this.imageGlass2, 'height', smalldoorHeight + 'px');
    this.renderer.setStyle(this.imageDoor, 'height', smalldoorHeight + 'px');
    this.renderer.setStyle(this.imageDoor2, 'height', smalldoorHeight + 'px');
    this.renderer.setStyle(this.imageHinge, 'height', smalldoorHeight + 'px');
    this.renderer.setStyle(this.imageKare, 'height', smalldoorHeight + 'px');
      let i = smallmarginHeight/9
      if(smalldoorHeight === top + smallmarginHeight){
        top = top - smallmarginHeight + (smalldoorHeight - (top + 1))*3;
      this.renderer.setStyle(this.imageWalls, 'margin-top', smallmarginHeight - i + 'px');
      this.renderer.setStyle(this.imageTopWall, 'margin-top', smallmarginHeight - i + 'px');
      }
    }else{
      this.renderer.setStyle(this.imageGlass, 'height', doorHeight + 'px');
    this.renderer.setStyle(this.imageDoor, 'height', doorHeight + 'px');
    this.renderer.setStyle(this.imageDoor2, 'height', doorHeight + 'px');
    this.renderer.setStyle(this.imageHinge, 'height', doorHeight + 'px');
    this.renderer.setStyle(this.imageKare, 'height', doorHeight + 'px');
    const i = marginHeight/8;
    console.log(marginHeight -i);
    if(doorHeight === top + marginHeight ){
      top = top + marginHeight + (doorHeight - (top + 1))*3;
      this.renderer.setStyle(this.imageWalls, 'margin-top', marginHeight - i + 'px');
      this.renderer.setStyle(this.imageTopWall, 'margin-top', marginHeight - i + 'px');
    }
    }
  
    
    
    

    if(this.query.matches){
      console.log(this.currentDoorHeight);
      top = top - (10*((this._currentDoorHeight-200)/2)-((this._currentDoorHeight-200)/2));
      if(top>501){
        top = 501;
      }
      this.renderTop(top,this.imageService.initDoorWidth);
    }else{
      console.log(this.currentDoorHeight);
      top =  top - (10*((this._currentDoorHeight-200)/2)-((this._currentDoorHeight-200)/2));
      if(top>833){
        top = 833;
      }
      console.log(top);
    this.renderTop(top,this.imageService.initDoorWidth);
    }
    

    if (this.validLeft) {
      if (this.validTop) {
        this.renderer.setStyle(this.imageDoorLeft, 'height', (doorHeight + topHeight) + 'px');
      } else {
        this.renderer.setStyle(this.imageDoorLeft, 'height', doorHeight + 'px');
      }
    }
    if (this.validRight) {
      if (this.validTop) {
        this.renderer.setStyle(this.imageDoorRight, 'height', (doorHeight + topHeight) + 'px');
      } else {
        this.renderer.setStyle(this.imageDoorRight, 'height', doorHeight + 'px');
      }
    }
  }

  resizeImageLeftWidth(width: number): void {
    if (width < 100 || width > 150) {
      width = 100;
      this.currentLeftWidth = width;
      this.imageService.setCurrentLeftWidth(width);
    } else {
      this.defineLeft();
      this._currentLeftWidth = width;
      this.imageService.setCurrentLeftWidth(width);
    }
    this.imageService.setFullWidth(this.fullWidth);

    if (this.validLeft) {
      const leftWidth = this._initLeftWidth + (width - 100);
      this.renderer.setStyle(this.imageDoorLeft, 'width', leftWidth + 'px');
    }
  }

  resizeImageRightWidth(width: number): void {
    if (width < 100 || width > 150) {
      width = 100;
      this._currentRightWidth = width;
      this.imageService.setCurrentRightWidth(width);
    } else {
      this.defineRight();
      this._currentRightWidth = width;
      this.imageService.setCurrentRightWidth(width);
    }
    this.imageService.setFullWidth(this.fullWidth);

    if (this.validRight) {
      const rightWidth = this._initRightWidth + (width - 100);
      this.renderer.setStyle(this.imageDoorRight, 'width', rightWidth + 'px');
    }
  }

  resizeImageTopHeight(height: number): void {
    if (height < 100 || height > 150) {
      height = 100;
      this._currentTopHeight = height;
      this.imageService.setCurrentTopHeight(height);
    } else {
      this._currentTopHeight = height;
      this.imageService.setCurrentTopHeight(height);
    }
    const topHeight = this._initTopHeight + (this._currentTopHeight - 100);
    const doorHeight = this._initDoorHeight + (this._currentDoorHeight - 200);
    this.imageService.setFullHeight(this.fullHeight);
    this.renderer.setStyle(this.imageDoorTop, 'height', topHeight + 'px');
    if (this.validLeft) {
      console.log('mpika')
      this.renderer.setStyle(this.imageDoorLeft, 'height', (topHeight + doorHeight) + 'px');
    }
    if (this.validRight) {
      this.renderer.setStyle(this.imageDoorRight, 'height', (topHeight + doorHeight) + 'px');
    }
  }

  // HELPERS
  private defineLeft() {
    if (!!this.imageService.currentLeftWidth) {
      this._currentLeftWidth = this.imageService.currentLeftWidth;
    } else {
      this._currentLeftWidth = this.width;
      this.imageService.setCurrentLeftWidth(this.width);
    }
    this._currentLeftHeight = this.imageService.currentDoorHeight;
    this.imageService.setCurrentLeftHeight(this._currentLeftHeight);
  }

  private defineRight() {
    if (!!this.imageService.currentRightWidth) {
      this._currentRightWidth = this.imageService.currentRightWidth;
    } else {
      this._currentRightWidth = this.width;
      this.imageService.setCurrentRightWidth(this.width);
    }
    this._currentRightHeight = this.imageService.currentDoorHeight;
    this.imageService.setCurrentRightHeight(this._currentRightHeight);
  }

  private defineTop() {
    // Width of top portion is the sum of right window + actual door + right window
    if (!!this.imageService.currentTopHeight) {
      this._currentTopHeight = this.imageService.currentTopHeight;
    } else {
      // Width giati thelw na einai 100, oxi 200 cm, tha to ftiaksw meta
      this._currentTopHeight = this.width;
      this.imageService.setCurrentTopHeight(this.width);
    }
    this._currentTopWidth = this.width;
    this.imageService.setCurrentTopWidth(this.width);
  }

  validLock(n: number){
    this.bntStyle0 = 'btn-';
    this.bntStyle1 = 'btn-';
    if(n === 0){
      this.imageService.setValidLockLeft(true);
      this.bntStyle0  = "active";
    }else{
      this.imageService.setValidLockRight(true);
      this.bntStyle1 = 'active';
    }
  }


}
