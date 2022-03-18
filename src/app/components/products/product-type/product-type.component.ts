import { ImageService } from './../../../services/image.service';
import { ProductTypeService } from './../../../services/product-type.service';
import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { ProductType } from 'src/app/models/product-type.model';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent implements OnInit, AfterViewInit {

  private imageDoor;
  private imageDoorLeft;
  private imageDoorRight;
  private imageDoorTop;

  private _productType: ProductType;
  private _productsType: ProductType[] = [];

  constructor(
    private renderer: Renderer2,
    private productTypeService: ProductTypeService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    if (!!this.productTypeService.productType) {
      this._productType = this.productTypeService.productType;
    } else {
      this._productType = this.productsType[0];
    }
    this.productTypeService.getAllProductTypes()
      .subscribe((productsType) => this._productsType = productsType);

    this.imageDoor = this.imageService.imageElementDoor;
    this.imageDoorLeft = this.imageService.imageElementLeft;
    this.imageDoorRight = this.imageService.imageElementRight;
    this.imageDoorTop = this.imageService.imageElementTop;
  }

  ngAfterViewInit(): void {
    this.initDoorDimensions();
  }

  setProductType(productType: ProductType): void {
    this._productType = productType;
    this.productTypeService.setProductType(productType);
    switch (this._productType.position) {
      case 'l':
        this.imageService.setValidLeft(true);
        this.imageService.setValidRight(false);
        this.imageService.setValidTop(false);
        break;
      case 'r':
        this.imageService.setValidLeft(false);
        this.imageService.setValidRight(true);
        this.imageService.setValidTop(false);
        break;
      case 't':
        this.imageService.setValidLeft(false);
        this.imageService.setValidRight(false);
        this.imageService.setValidTop(true);
        break;
      case 'lr':
        this.imageService.setValidLeft(true);
        this.imageService.setValidRight(true);
        this.imageService.setValidTop(false);
        break;
      case 'tl':
        this.imageService.setValidLeft(true);
        this.imageService.setValidRight(false);
        this.imageService.setValidTop(true);
        break;
      case 'tr':
        this.imageService.setValidLeft(false);
        this.imageService.setValidRight(true);
        this.imageService.setValidTop(true);
        break;
      case 'all':
        this.imageService.setValidLeft(true);
        this.imageService.setValidRight(true);
        this.imageService.setValidTop(true);
        break;
      default:
        this.imageService.setValidLeft(false);
        this.imageService.setValidRight(false);
        this.imageService.setValidTop(false);
        break;
    }
  }

  get selectedProductType() {
    this.initDoorDimensions();
    return this._productType;
  }

  get productsType() {
    this.productTypeService.getAllProductTypes()
      .subscribe(productsType => this._productsType = productsType);
    return this._productsType;
  }

  private initDoorDimensions() {
    // DOOR DIMENSIONS
    const initDoorWidth = this.imageDoor.naturalWidth;
    const initDoorHeight = this.imageDoor.naturalHeight;

    this.renderer.setStyle(this.imageDoor, 'width', initDoorWidth + 'px');
    this.renderer.setStyle(this.imageDoor, 'height', initDoorHeight + 'px');

    // DOOR LEFT DIMENSIONS
    const initLeftWidth = this.imageDoorLeft.naturalWidth;
    let initLeftHeight;
    if (this.imageService.validTop) {
      initLeftHeight = this.imageDoor.naturalHeight + this.imageDoorTop.naturalHeight;
    } else {
      initLeftHeight = this.imageDoor.naturalHeight;
    }

    this.renderer.setStyle(this.imageDoorLeft, 'width', initLeftWidth + 'px');
    this.renderer.setStyle(this.imageDoorLeft, 'height', initLeftHeight + 'px');

    // DOOR RIGHT DIMENSIONS
    const initRightWidth = this.imageDoorRight.naturalWidth;
    let initRightHeight;
    if (this.imageService.validTop) {
      initRightHeight = this.imageDoor.naturalHeight + this.imageDoorTop.naturalHeight;
    } else {
      initRightHeight = this.imageDoor.naturalHeight;
    }

    this.renderer.setStyle(this.imageDoorRight, 'width', initRightWidth + 'px');
    this.renderer.setStyle(this.imageDoorRight, 'height', initRightHeight + 'px');

    // DOOR TOP DIMENSIONS
    // const initTopWidth = this.imageDoorTop.naturalWidth;
    const initTopWidth = this.imageDoor.naturalWidth;
    const initTopHeight = this.imageDoorTop.naturalHeight;

    this.renderer.setStyle(this.imageDoorTop, 'width', initTopWidth + 'px');
    this.renderer.setStyle(this.imageDoorTop, 'height', initTopHeight + 'px');
  }
}
