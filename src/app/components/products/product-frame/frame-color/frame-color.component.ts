import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit, Output } from '@angular/core';
import { StringValueToken } from 'html2canvas/dist/types/css/syntax/tokenizer';
import { Colors, dk24, framedGT1060, framedGT12, GlassColors, gt14dl, HingedGT10, HingedGT12, HingedGT13, hs07, kare1, kare2, kare3, kare4, kare5, kare6, kare7, kare8, kare9, woodengt1060, woodengt11, woodengt12 } from 'src/app/data/product-frame.data';
import { color, glasscolor, locks, ProductFrame } from 'src/app/models/product-frame.model';
import { ProductFrameService } from 'src/app/services/product-frame.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-frame-color',
  templateUrl: './frame-color.component.html',
  styleUrls: ['./frame-color.component.scss']
})
export class FrameColorComponent implements OnInit {

  constructor(private pfService: ProductFrameService, private productService: ProductService) { }

  @Input() ftype: boolean;
  @Input() index: number;

  private frame: ProductFrame;
  colorFrame: color;
  colorGlass: glasscolor;
  colors = Colors;
  glasscolors = GlassColors;
  _colors:color[] = [];
  _anodize: color[] = [];
  _ral_colors:color[] = [];
  _ral_structura:color[] = [];
  _special_ral_sable:color[] = [];
  _colorsGlass: glasscolor[] = [];
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

  ngOnInit(): void {

    this.ftype = this.pfService.getFrameType();
    this.frame = this.pfService.getFrame();

    if(this.pfService.productframe.name === "GT12"){
      for(let i=0;i<=54;i++){
        this.colors[i+55].img = HingedGT12[i].img;
        if(this.frame.type === 'WOODEN LEAF'){
          this.colors[i] = woodengt12[i];
        }else{
          this.colors[i].img = framedGT12[i].img;
        }
      }
    }else if(this.pfService.productframe.name === "GT13"){
      for(let i=0;i<=54;i++){
        this.colors[i+55].img = HingedGT13[i].img;
        if(this.pfService.productframe.type === 'WOODEN LEAF'){
          
          this.colors[i] = woodengt11[i];
        }
      }
    }else if(this.pfService.productframe.name === 'GT10' || this.pfService.productframe.name === 'GT60'){
      for(let i=0;i<=54;i++){
        this.colors[i+55].img = HingedGT10[i].img;
        if(this.pfService.productframe.type === 'WOODEN LEAF'){
          this.colors[i] = woodengt1060[i];
        }else{
          this.colors[i].img = framedGT1060[i].img;
        }
      }
    }else if(this.pfService.productframe.name === 'GT11' && this.frame.type === 'WOODEN LEAF'){
      for(let i=0;i<=54;i++){
      this.colors[i] = woodengt11[i];
      }
    }
    if(this.frame.type === "WOODEN LEAF"){
      for(let i=0; i<= 54; i++){
        this._colors[i] = this.colors[i];
        if(i>=0 && i<=6){
          this._anodize[i] = this.colors[i];
        }else if(i>=7 && i<=26){
          this._ral_colors[i-7] = this.colors[i];
        }else if(i>=27 && i<=45){
          this._ral_structura[i-27] = this.colors[i];
        }else{
          this._special_ral_sable[i-46] = this.colors[i];
        }
      }
    }else if(this.frame.type === "FRAMED"){
      for(let i=0; i<=54; i++){
        this._colors[i] = this.colors[i];
        if(i>=0 && i<=6){
          this._anodize[i] = this.colors[i];
        }else if(i>=7 && i<=26){
          this._ral_colors[i-7] = this.colors[i];
        }else if(i>=27 && i<=45){
          this._ral_structura[i-27] = this.colors[i];
        }else{
          this._special_ral_sable[i-46] = this.colors[i];
        }
      }
    }else if(this.frame.type === "HINGED"){
      for(let i=0; i<=54; i++){
        this._colors[i] = this.colors[i+55];
        if(i>=0 && i<=6){
          this._anodize[i] = this.colors[i+55];
        }else if(i>=7 && i<=26){
          this._ral_colors[i-7] = this.colors[i+55];
        }else if(i>=27 && i<=45){
          this._ral_structura[i-27] = this.colors[i+55];
        }else{
          this._special_ral_sable[i-46] = this.colors[i+55];
        }
      }
    }else{
      this.ftype = false;
    }

    

    //colors button selected

    // color glass
    if(this.frame.type === "WOODEN LEAF"){
      for(let i=9; i<=16; i++){
        this._colorsGlass[i-9] = this.glasscolors[i];
      }
    }else{
      for(let i=0; i<=8; i++){
      this._colorsGlass[i] = this.glasscolors[i];
    } 
    }
    this.setkarearr();
    

    // color frame
    if(!!this.pfService.colorframe){
      this.colorFrame = this.pfService.colorframe;
    }else{
      this.colorFrame = this._colors[0];
    }
    this.setColorFrame(this.colorFrame);

    // color glass
    if(!!this.pfService.colorglass){
      this.colorGlass = this.pfService.colorglass;
      this.setColorGlass(this.colorGlass);
    }else{
      this.colorGlass = this._colorsGlass[0];
      this.setColorGlass(this.colorGlass);
    }
    
  }

  setColorGlass(color: glasscolor){
    this.colorGlass = color;
    this.pfService.setColorGlass(this.colorGlass);
  }

  setkarearr(){
    if(this.pfService.isFramed){
      if(this.pfService.karename === this.kare1[0].name){
        for(let i=0;i<=54;i++){
          this.karearr[i] = this.kare1[i]
        }
      }else if(this.pfService.karename === this.kare2[0].name){
        for(let i=0;i<=54;i++){
          this.karearr[i] = this.kare2[i]
        }
      }else if(this.pfService.karename === this.kare3[0].name){
        for(let i=0;i<=54;i++){
          this.karearr[i] = this.kare3[i]
        }
      }else if(this.pfService.karename === this.kare4[0].name){
        for(let i=0;i<=54;i++){
          this.karearr[i] = this.kare4[i]
        }
      }else if(this.pfService.karename === this.kare5[0].name){
        for(let i=0;i<=54;i++){
          this.karearr[i] = this.kare5[i]
        }
      }else if(this.pfService.karename === this.kare6[0].name){
        for(let i=0;i<=54;i++){
          this.karearr[i] = this.kare6[i]
        }
      }else if(this.pfService.karename === this.kare7[0].name){
        for(let i=0;i<=54;i++){
          this.karearr[i] = this.kare7[i]
        }
      }else if(this.pfService.karename === this.kare8[0].name){
        for(let i=0;i<=54;i++){
          this.karearr[i] = this.kare8[i]
        }
      }else if(this.pfService.karename === this.kare9[0].name){
        for(let i=0;i<=54;i++){
          this.karearr[i] = this.kare9[i]
        }
      }
      
    }
  }

  
  setColorFrame(color: color){
    if(this.pfService.isFramed && this.pfService.kareimg != '../../../assets/kare/nokare.png'){
      for(let i=0; i<=54;i++){
      if(this.karearr[i].color === color.name){
        this.pfService.setKareColor(this.karearr[i].img);
      }
    }
    }
    this.colorFrame = color; 
    this.pfService.setColorFrame(color);
  }

  setColorAnodize(color: color){
    this.setColorFrame(color);
  }
  setColorRal(color: color){
    this.setColorFrame(color);
  }
  setColorRals(color: color){
    this.setColorFrame(color);
  }
  setColorSpecial(color: color){
    this.setColorFrame(color);
  }

  get selectedColorFrame(){
    return this.colorFrame;
  }

  get selectedColorGlass(){
    return this.colorGlass;
  }

  

  get fd(){
    let flush = false;
    if(this.frame.name === 'FD(FLUSH DOOR)'){
      flush = true;
    }
    return flush;
  }
 
  btn: boolean[] = [false,false,false,false];
  check(n: number){
      if(this.btn[n]){
      this.btn[n] = false;
    }else{
      this.btn[n] = true;
    }
    return this.btn;
  }
  
   ischeck(n: number){
    return this.btn[n];
  }
    

  
}
