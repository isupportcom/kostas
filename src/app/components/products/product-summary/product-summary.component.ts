import { Component, OnInit, AfterViewInit, Renderer2, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';

// IMPORT SERVICES
import { ImageService } from './../../../services/image.service';
import { ProductService } from './../../../services/product.service';
import { AuthService } from './../../../services/auth.service';

// IMPORT MODELS
import { Customer } from './../../../models/customer.model';
import { Product } from './../../../models/product.model';

import html2canvas from 'html2canvas';
import { ProductFrameService } from 'src/app/services/product-frame.service';
import { color, glasscolor, locks, ProductFrame } from 'src/app/models/product-frame.model';
import template from "./../../../data/pdfTemplate.data";
import { jsPDF } from "jspdf";



@Component({
  selector: 'app-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['./product-summary.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ProductSummaryComponent implements OnInit, AfterViewInit {

  private _fullWidth: number;
  private _fullHeight: number;
  private readonly chargePerDimension: number = 2;
  private _customer: Customer;
  private _product: Product;
  @ViewChild('content') content:ElementRef;  
  pdfTable!: ElementRef;
  finalDoorImageBase64: unknown;
  pdfImage = new Image();
  hideInfo: boolean = true;
  dateNow: Date;
  dimentions: string;
  spinerVisible: boolean = false;

  constructor(
    private renderer: Renderer2,
    private pfService: ProductFrameService,
    private productService: ProductService,
    private auth: AuthService,
    private imageService: ImageService,
  ) { }

  // OnLoad
  ngOnInit(): void {
    this._customer = this.auth.customer;
    this._product = this.productService.product;
    this._fullWidth = this.fullWidth;
    this._fullHeight = this.fullHeight;
  }

  ngAfterViewInit(): void {
    this.printImage();
     setTimeout(() => {
      this.printImage();
    }, 500); 
  }

 clr: color ={
   name: 'Επίλεξε χρώμα',
   id: 1,
   category: "επιλογή",
   img:"",
   img_thumb:""
 };
 gls: glasscolor={
  name: 'Επίλεξε χρώμα',
  id: 1,
  category: "επιλογή",
  img:"",
  thumb_img: ""
 };
 frames: ProductFrame ={
   id: 1,
   name: 'Επίλεξε πλαίσιο',
   description: "",
   img_url: "",
   type:''
 };

 locks: locks ={
   name: "Επίλεξε κλειδαριά",
   img: '',
   color: ''
 }

 get wallWidth(){
   return this.pfService.gt10size;
 }

 // Thumb Images
 get imagedin(){
  let image= '';
  if(this.imageService.validLockLeft){
    image = this.imageService.lockleft;
  }else{
    image =  this.imageService.lockright;
  }
  return image;
}

get imageframe(){
  let image = '';
  if(!!this.pfService.productframe){
    image =  this.pfService.productframe.img_url;
  }
    return image; 
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

 get lockstype(){
    return this.pfService.locksname;
 }

 get framed(){
   if(this.pfService.productframe.type === 'FRAMED'){
     return true;
   }else {
     return false;
   }
 }

 get frame(){
   if(this.pfService.getProductFrame()){
     return this.pfService.getProductFrame();
   }else{
     return this.frames;
   }

 }

  get color(): color {
    if(this.pfService.getColorFrame()){
      return this.pfService.getColorFrame();
    }else{
      return this.clr; 
    }
  }

  get glass(): glasscolor{
    if(this.pfService.getColorGlass()){
      return this.pfService.getColorGlass();
    }else{
      return this.gls;
    }
  }

  lockpos!: string;
  get lock():string{
    if(this.imageService.validLockLeft){
      this.lockpos = 'Αριστερά'
    }else{
      this.lockpos = 'Δεξιά'
    }
    return this.lockpos;
  }

  // GETTERS
  get customer(): Customer {
    return this._customer;
  }

  get product(): Product {
    return this._product;
  }

  private get fullWidth() {
    if (!!this.imageService.fullWidth) {
      return this.imageService.fullWidth;
    }
    return this.productService.product.initWidth;
  }

  private get fullHeight() {
    if (!!this.imageService.fullHeight) {
      return this.imageService.fullHeight;
    }
    return this.productService.product.initHeight;
  }

  get width(): number {
    return this._fullWidth;
  }

  get height(): number {
    return this._fullHeight;
  }

  get finalPrice(): number {
    return this.calculatePriceWithDiscount();
  }

  // PRIVATE FUNCTIONS
  private extraPrice(): number {
    // Assume that every cm in either height or width costs 2 euros
    const widthPrice = (this.imageService.currentDoorWidth - this._product.initWidth) * this.chargePerDimension;
    const heightPrice = (this.imageService.currentDoorHeight - this._product.initHeight) * this.chargePerDimension;
    return (widthPrice + heightPrice);
  }

  private calculatePriceWithDiscount(): number {
    const price = this._product.initPrice;
    const productPrice = price + this.extraPrice();
    const discountPrice = (this.auth.customer.timol_pol.discount / 100) * productPrice;
    return (productPrice - discountPrice);
  }

  // IMAGE SCREENSHOT
  private printImage() {
    html2canvas(document.querySelector('.img-container'), { allowTaint: true }).then(canvas => {
      // const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      const image = canvas.toDataURL(this.imageService.imageUrl);
      this.imageService.setImageUrl(image);
    });
  }

  get CalculateFinalPrice():string{
    const euro: string = '\u20ac';
    const multiplication: string = '\u00D7';
    return  euro + (this.finalPrice).toFixed(2);
  }

  // GENERATE PDF
  // async generatePdf(value: string): Promise<void> {
  //   if (!(value === 'download' || value === 'view' || value === 'print')) {
  //     alert('mallon exei ginei mlkia');
  //   }
  //   const image = this.imageService.imageUrl;
  //   const euro: string = '\u20ac';
  //   const multiplication: string = '\u00D7';
  //   const polName: string = this._customer.timol_pol.id.toString();
  //   const usernameNoSpace: string = this._customer.username.replace(/\s/g, '');
  //   const fileName: string = 'Prosfora-' + polName + '-' + usernameNoSpace + '.pdf';

  //   const pdf = {
  //     pageSize: 'A4',
  //     pageOrientation: 'portrait', // portrait
  //     info: {
  //       title: 'Prosfora',
  //       author: 'Onoma Etairias',
  //       subject: 'Prosfora timis me vasi ton pelati',
  //       keywords: ['agora', 'prosfora', 'portes', 'parathira']
  //     },
  //     content: [
  //       { image: await this.getBase64ImageFromURL('../../../assets/pdf_pca.png') },
  //       {
  //         layout: 'lightHorizontalLines',
  //         table: {
  //           headerRows: 0,
  //           widths: ['70%', '30%'],
  //           body: [
  //             [{ text: 'Όνοματεπώνυμο Πελάτη', bold: true }, this.customer.username],
  //             [{ text: 'Τιμολογιακή πολιτική', bold: true }, this.customer.timol_pol.name],
  //             [{ text: 'Ποσοστό έκπτωσης βάση της τιμολογιακής πολιτικής', bold: true }, this.customer.timol_pol.discount + '%'],
  //             [{ text: 'Κωδικός προϊόντος', bold: true }, this._product.pid],
  //             [{ text: 'Όνομα προϊόντος', bold: true }, this._product.name],
  //             [{ text: 'Αρχική τιμή', bold: true }, euro + (this._product.initPrice).toFixed(2)],
  //             [
  //               { text: 'Διαστάσεις προϊόντος', bold: true },
  //               (this.imageService.fullWidth / 100).toFixed(2) + 'm ' + multiplication + ' '
  //               + (this.imageService.fullHeight / 100).toFixed(2) + 'm'
  //             ],
  //             [
  //               { text: 'Τελική τιμή με έκπτωση ' + this._customer.timol_pol.discount + '%', bold: true },
  //               { text: euro + (this.finalPrice).toFixed(2) }
  //             ],
  //           ],
  //         },
  //       },
  //       { image: await this.getBase64ImageFromURL(image), style: 'center'},
  //       { qr: 'https://fir-df076.web.app/', style: 'qr', fit: 100 },
  //     ],
  //     styles: {
  //       left: {
  //         alignment: 'center',
  //         margin: 10
  //       },
  //       qr: {
  //         alignment: 'right',
  //       },
  //       image:{
  //         width: 500+'px',
  //         alignment: 'center'
  //       }
  //     }
  //   };
  //   switch (value) {
  //     case 'download': {
  //       pdfmake.createPdf(pdf).download(fileName);
  //       break;
  //     };
  //     case 'view': {
  //       pdfmake.createPdf(pdf).open();
  //       break;
  //     };
  //     case 'print': {
  //       pdfmake.createPdf(pdf).print();
  //       break;
  //     };
  //     default: {
  //       console.log('Error');
  //       break;
  //     }
  //   }
  // }

 
  
  public async downloadAsPDF( download:boolean) {
    this.spinerVisible = true;
    this.hideInfo = false;
    this.dateNow = new Date();
    this.dimentions = `${this.width} x ${this.height}`;
    let content= this.content.nativeElement;  
    
    var HTML_Width = 1400;
		var HTML_Height = 1720;
		var top_left_margin = 0;
		var PDF_Width =  1400;
		var PDF_Height = (PDF_Width *1.2)+(top_left_margin*2);
		var canvas_image_width = HTML_Width;
		var canvas_image_height = HTML_Height;
		
		var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
		
    const image = this.imageService.imageUrl;
    let that = this; 
    this.pdfImage.src = image;
    this.pdfImage.onload = function () {
      html2canvas(content,{allowTaint:true}).then(function(canvas) {
        canvas.getContext('2d');
        
        console.log(canvas.height+"  "+canvas.width);
        
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
        
        
        for (var i = 1; i <= totalPDFPages - 1; i++) { 
          pdf.addPage( [PDF_Width, PDF_Height]);
          pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
        }
        
        if  (download){
          pdf.save("Προσφορά");
        }else{
          //pdf.output("dataurlnewwindow");
          window.open(URL.createObjectURL(pdf.output("blob")));
        }
        that.spinerVisible = false;
        that.hideInfo = true;
      });
    }
  }

  private async getBase64ImageFromURL(imageUrl) {
    var res =  await fetch(imageUrl);
    var blob =  await res.blob();
  
    return new Promise((resolve, reject) => {
      var reader  = new FileReader();
      reader.addEventListener("load", function () {
          resolve(reader.result);
      }, false);
  
      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
  }

  private getBase64ImageFromURL2(url: string) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        let canvas = this.renderer.createElement("canvas");
        canvas.width = this.imageService.fullWidth ;
        canvas.height = this.imageService.fullHeight;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, this.imageService.fullWidth , this.imageService.fullHeight );

        const dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }
}
