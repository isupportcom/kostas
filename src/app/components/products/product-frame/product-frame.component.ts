import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Colors, dk24, dk24GT10, dk24GT12, dk24GT13, dk24hinged, dl04, dl04GT10, dl04GT12, dl04GT13, framedGT1060, framedGT12, GlassColors, GT1060dk24, GT1060gt14dl, GT1060gt14dl2, GT1060hs07, GT12dk24, GT12gt14dl, GT12gt14dl2, GT12hs07, gt14dl, gt14dl2, hd01a, hd01aGT10, hd01aGT12, hd01aGT13, HingedGT10, HingedGT12, HingedGT13, hs07, kare, ProductsFrame, roundgt1060, roundgt11, roundgt12, squaregt1060, squaregt11, squaregt12, woodengt1060, woodengt11, woodengt12 } from 'src/app/data/product-frame.data';
import { color, ProductFrame, types } from 'src/app/models/product-frame.model';
import { ProductFrameService } from 'src/app/services/product-frame.service';

@Component({
  selector: 'app-product-frame',
  templateUrl: './product-frame.component.html',
  styleUrls: ['./product-frame.component.scss']
})
export class ProductFrameComponent implements OnInit {

    types= [
    {name:"FRAMED",
     id: 1},
     {name:"HINGED",
     id: 2},
     {name:"WOODEN LEAF",
     id: 3},
     {name:"ALUMINIUM LEAF",
     id: 4},
     {name: '',
     id: 5}
     
  ]

  @Input()frame: ProductFrame;
  
   productFrame: ProductFrame;
   selectframetype = false;
   kar : ProductFrame;
   productsFrame: ProductFrame[] = [];
   kares: ProductFrame[] = [];

   bntStyle0: string;
   bntStyle1: string;
   bntStyle2: string;
   bntStyle3: string;

   bnt2: String;
  bnt1: string;
  bnt3: string;
  bnt4: string;
  bnt5: string;
  bnt6: string;
  bnt7: string;
  bnt8: string;
  bnt9: string;
  _currentsize: number = 75;
  
  lockcolors = gt14dl;
  lockcolors1 = gt14dl2;
  lockcolors2 = dk24;
  lockcolors3 = hs07;
  lockcolors4 = dk24hinged;
  lockcolors5 = dl04;
  lockcolors6 = hd01a;
  lockcolors7 = dk24GT12;
  lockcolors8 = dl04GT12;
  lockcolors9 = hd01aGT12;
  lockcolors10 = dk24GT13;
  lockcolors11 = dl04GT13;
  lockcolors12 = hd01aGT13;
  lockcolors13 = dk24GT10;
  lockcolors14 = dl04GT10;
  lockcolors15 = hd01aGT10;
  lockcolors16 = GT12gt14dl;
  lockcolors17 = GT12gt14dl2;
  lockcolors18 = GT12dk24;
  lockcolors19 = GT12hs07;
  lockcolors20 = GT1060gt14dl;
  lockcolors21 = GT1060gt14dl2;
  lockcolors22 = GT1060dk24;
  lockcolors23 = GT1060hs07;

  kare = kare;
  

  glasses = GlassColors;
  framescolors = Colors;
  gt12framed = framedGT12;
  gt1060framed = framedGT1060;
  gt12hinge = HingedGT12;
  gt13hinge = HingedGT13;
  gt10hinge = HingedGT10;
  woodengt11 = woodengt11;
  woodengt12 = woodengt12;
  woodengt1060 = woodengt1060;
  round = roundgt11;
  square = squaregt11;
  roundgt12 = roundgt12;
  squaregt12 = squaregt12;
  roundgt1060 = roundgt1060;
  squaregt1060 = squaregt1060;


  colorFrame: color;
  colors = Colors;
  @Input() _colors:color[] = [];

  k:ProductFrame ={
    id:1,
    name:"",
    description: "",
    img_url: '',
    type:""
  }

  constructor(private pfService: ProductFrameService) { }

  ngOnInit(){


    this.bnt2 = "active";
    this.bnt1 = 'btn-';
    this.bnt3 = 'btn-';
    this.bnt4 = 'btn-';
    this.bnt5 = 'btn-';
    this.bnt6 = 'active';
    this.bnt7 = 'btn-';
    this.bnt8 = 'active';
    this.bnt9 = 'btn-';

    this.bntStyle0 = 'btn-';
    this.bntStyle1 = 'btn-';
    this.bntStyle2 = 'btn-';
    this.bntStyle3 = 'btn-';


    if(this.pfService.gt10size === null){
      this.resizegt10wall(75);
    }else{
      this.resizegt10wall(this.pfService.gt10size);
    }
    

    for(let i=0; i<=54; i++){
      this._colors[i] = this.colors[i];
    }

    this.pfService.getAllProductFrames()
    .subscribe((productsFrame)=> this.productsFrame = productsFrame);

    
    for(let i=0; i<=9;i++){
      this.kares[i] = this.kare[i];
    }
    
    if(!!this.pfService.productframe ){
      this.productFrame = this.pfService.getProductFrame();
      this.frame = this.selectedProductFrame;
      for(let i=0; i<=3; i++){
        if(this.pfService.productframe.type === this.types[i].name){
          if(this.pfService.isFramed){
            for(let i=0;i<=8;i++){
              if(this.pfService.karename === this.kare[i].name){
                this.setFramekare(this.kare[i]);
            }
            }
                this.onType(i);
          }else{
            this.setProductFrame(this.productFrame);
          this.onType(i);
          }
          
        }
      }
    }else{
      this.productFrame = this.productsFrame[0];
      this.setProductFrame(this.productFrame);
    }

    
    if(this.ischeck){
      console.log(this.pfService.lockname);
      if(this.pfService.lockname === 'GT14DL2'){
        this.lock(2);
      }else if(this.pfService.lockname === 'GT14DL'){
        this.lock(1);
      }else if(this.pfService.lockname === 'DK24'){
        this.lock(3);
      }else if(this.pfService.lockname === 'HS07'){
        this.lock(4);
      }else if(this.pfService.lockname === 'DK24-HINGED'){
        this.lock(5);
      }else if(this.pfService.lockname === 'DL04'){
        this.lock(6);
      }else if(this.pfService.lockname === 'HD01A'){
        this.lock(7);
      }else if(this.pfService.lockname === 'ROUND'){
        this.lock(8);
      }else if(this.pfService.lockname === 'SQUARE'){
        this.lock(9);
      }
    }

   
  }

  nokares = false;
  nokare(){
    if(this.nokares){
      this.nokares = false;
    }else{
      this.nokares = true;
      this.kar = this.k;
      this.setFramekare(this.kar);
    }
  }
  get karechoises(){

    return this.nokares;
  }
  setProductFrame(productFrame: ProductFrame): void {
    this.productFrame = productFrame;

    if(this.productFrame.name === 'GT10' || this.productFrame.name === 'GT60'){
      this.pfService.setgt10size(75);
    }else{
      this.pfService.setgt10size(undefined);
    }

    this.pfService.setProductFrame(productFrame);
    this.frame = this.selectedProductFrame;
    this.onType(4);
    this.getchoices(false);
    this.pfService.setFrameKare(this.k);
  }
  setFramekare(kar: ProductFrame): void{
      this.kar = kar;
      this.pfService.setFrameKare(kar);
    
  }

  get selectedFrameKare(){
    return this.kar;
  }

  get selectedProductFrame() {
    return this.productFrame;
  }

  get productsFrames() {
    this.pfService.getAllProductFrames()
      .subscribe(productsFrame => this.productsFrame = productsFrame);
    return this.productsFrame;
  }

  fd(f : ProductFrame){
    if(f.name === this.productsFrame[5].name){
      return true;
    }
  }

  onType(i: number){
    this.bntStyle0 = 'btn-';
    this.bntStyle1 = 'btn-';
    this.bntStyle2 = 'btn-';
    this.bntStyle3 = 'btn-';
    this.frame.type = this.types[i].name;
    this.pfService.setProductFrame(this.frame);
    this.selectframetype = true;
    this.pfService.setFrameType(true);
    if(this.frame.type === "ALUMINIUM LEAF" || this.frame.type === "WOODEN LEAF"){
      if(this.productFrame.name === 'GT12'){
        this.bntStyle2 = 'active';
        this.pfService.setColorFrame(this.woodengt12[6]);
        this.pfService.setColorGlass(this.glasses[10]);
        this.lock(8);
      }else if(this.productFrame.name === 'GT11' || this.productFrame.name === 'GT13'){
        this.bntStyle2 = 'active';
        this.pfService.setColorFrame(this.woodengt11[6]);
        this.pfService.setColorGlass(this.glasses[10]);
        this.lock(8);
      }else if(this.productFrame.name === 'GT10' || this.productFrame.name === 'GT60'){
        this.bntStyle2 = 'active';
        this.pfService.setColorFrame(this.woodengt1060[6]);
        this.pfService.setColorGlass(this.glasses[10]);
        this.lock(8);
      }
    }else if(this.frame.type === "FRAMED"){
      if(this.productFrame.name === 'GT11'  || this.productFrame.name === 'GT13'){
        this.bntStyle0 = 'active';
      //this.setFramekare(this.kares[0]);
        this.pfService.setColorFrame(this.framescolors[6]);
        this.pfService.setColorGlass(this.glasses[2]);
        this.lock(2);
        this.pfService.typehinged(false);
      }else if(this.productFrame.name === 'GT12'){
        this.bntStyle0 = 'active';
      //this.setFramekare(this.kares[0]);
        this.pfService.setColorFrame(this.gt12framed[6]);
        this.pfService.setColorGlass(this.glasses[2]);
        this.lock(2);
        this.pfService.typehinged(false);
      }else if(this.productFrame.name === 'GT10' || this.productFrame.name === 'GT60'){
        this.bntStyle0 = 'active';
      //this.setFramekare(this.kares[0]);
        this.pfService.setColorFrame(this.gt1060framed[6]);
        this.pfService.setColorGlass(this.glasses[2]);
        this.lock(2);
        this.pfService.typehinged(false);
      }
    }else if(this.frame.type === "HINGED"){
      if(this.productFrame.name === 'GT12'){
          this.bntStyle1 = 'active';
        this.pfService.setColorGlass(this.glasses[2]);
        this.pfService.setColorFrame(this.gt12hinge[6]);
        this.lock(6);
        this.pfService.typehinged(true);
      }else if(this.productFrame.name === 'GT13'){
        this.bntStyle1 = 'active';
        this.pfService.setColorGlass(this.glasses[2]);
        this.pfService.setColorFrame(this.gt13hinge[6]);
        this.lock(6);
        this.pfService.typehinged(true);
      }else if(this.productFrame.name === 'GT11'){
        this.bntStyle1 = 'active';
        this.pfService.setColorGlass(this.glasses[2]);
        this.pfService.setColorFrame(this.framescolors[61]);
        this.lock(6);
        this.pfService.typehinged(true);
      }else if(this.productFrame.name === 'GT10' || this.productFrame.name === 'GT60'){
        this.bntStyle1 = 'active';
        this.pfService.setColorGlass(this.glasses[2]);
        this.pfService.setColorFrame(this.gt10hinge[6]);
        this.lock(6);
        this.pfService.typehinged(true);
      }
    }
  }

  get ischeck(){
    if(this.framed || this.hinged || this.wooden)
    return true;
  } 

  getchoices(b : boolean){
    const type = this.pfService.productframe.type;
    if(type === "FRAMED" && b){
      return true;
    }else{
      return false;
    }
  }

  get framed(){
    const type = this.pfService.productframe.type;
    if(type === "FRAMED"){
      return true;
    }else{
      return false;
    }
  }

  get wooden(){
    const type = this.pfService.productframe.type;
    if( type === "WOODEN LEAF"){
      return true;
    }else{
      return false;
    }
  }

  get hinged(){
    const type = this.pfService.productframe.type;
    if(type === "HINGED"){
      return true;
    }else{
      return false;
    }
  }

  colorframe: color;
  lock(n: number){

    
    this.frame = this.pfService.getFrame();

    if(this.frame.type === "ALUMINIUM LEAF" || this.frame.type === "WOODEN LEAF"){
      this.pfService.lockImage('./assets/locks/round.jpg',"ROUND");
      if(this.productFrame.name === 'GT12'){
        for(let i=0; i<= 54; i++){
          this._colors[i] = this.woodengt12[i];
        }
      }else if(this.productFrame.name === 'GT11' || this.productFrame.name === 'GT13'){
        for(let i=0; i<= 54; i++){
          this._colors[i] = this.woodengt11[i];
        }
      }else if(this.productFrame.name === 'GT10' || this.productFrame.name === 'GT60'){
        for(let i=0; i<= 54; i++){
          this._colors[i] = this.woodengt1060[i];
        }
      }
    }else if(this.frame.type === "FRAMED"){
      this.pfService.lockImage('./assets/locks/gt14dl2.jpg',"GT14DL2");
      if(this.productFrame.name === 'GT11' || this.productFrame.name === 'GT13'){
        for(let i=0; i<=54; i++){
        this._colors[i] = this.colors[i];
        }
      }else if(this.productFrame.name === 'GT12'){
        for(let i=0; i<=54; i++){
          this._colors[i] = this.gt12framed[i];
          }
      }else if(this.productFrame.name === 'GT10' || this.productFrame.name === 'GT60'){
        for(let i=0; i<=54; i++){
          this._colors[i] = this.gt1060framed[i];
          }
      }
    }else if(this.frame.type === "HINGED"){
      this.pfService.lockImage('./assets/locks/dl04.jpg',"DL04");
      if(this.productFrame.name === 'GT12'){
        for(let i=0; i<=54; i++){
          this._colors[i] = this.gt12hinge[i];
        }
      }else if(this.productFrame.name === 'GT13'){
        for(let i=0; i<=54; i++){
          this._colors[i] = this.gt13hinge[i];
        }
      }else if(this.productFrame.name === 'GT11'){
        for(let i=55; i<=109; i++){
        this._colors[i-55] = this.colors[i];
        }
      }else if(this.productFrame.name === 'GT10' || this.productFrame.name === 'GT60'){
        for(let i=0; i<=54; i++){
          this._colors[i] = this.gt10hinge[i];
          }
      }
      
    }
    
  this.bnt1 = 'btn-';
  this.bnt2 = 'btn-';
  this.bnt3 = 'btn-';
  this.bnt4 = 'btn-';
  this.bnt5 = 'btn-';
  this.bnt6 = 'btn-';
  this.bnt7 = 'btn-';
  this.bnt8 = 'btn-';
  this.bnt9 = 'btn-';

  this.colorframe = this.pfService.colorframe;
    console.log(this.colorframe.name);
    if(n === 2){
      this.pfService.lockImage("./assets/locks/gt14dl2.jpg","GT14DL2");
      this.bnt2 = "active";
      if(this.productFrame.name === 'GT11'  || this.productFrame.name === 'GT13'){
        for(let i=0; i<=54; i++){
          this._colors[i].img = this.lockcolors1[i].img;
          if(this.colorframe.name === this._colors[i].name){
            this.pfService.setColorFrame(this.colorframe);
          }
        }
      }else if(this.productFrame.name === 'GT12'){
        for(let i=0; i<=54; i++){
          this._colors[i].img = this.lockcolors17[i].img;
          if(this.colorframe.name === this._colors[i].name){
            this.pfService.setColorFrame(this.colorframe);
          }
        }
      }else if(this.productFrame.name === 'GT10' || this.productFrame.name === 'GT60'){
        for(let i=0; i<=54; i++){
          this._colors[i].img = this.lockcolors21[i].img;
          if(this.colorframe.name === this._colors[i].name){
            this.pfService.setColorFrame(this.colorframe);
          }
        }
      }
    }else if(n === 1){
      this.pfService.lockImage('./assets/locks/gt14dl.jpg','GT14DL');
      this.bnt1 = "active";
      if(this.productFrame.name === 'GT11'  || this.productFrame.name === 'GT13'){
        for(let i=0; i<=54; i++){
          this._colors[i].img = this.lockcolors[i].img;
          if(this.colorframe.name === this.lockcolors[i].color){
            this.pfService.setColorFrame(this.colorframe);
          }
        }
      }else if(this.productFrame.name === 'GT12'){
        for(let i=0; i<=54; i++){
          this._colors[i].img = this.lockcolors16[i].img;
          if(this.colorframe.name === this.lockcolors16[i].color){
            this.pfService.setColorFrame(this.colorframe);
          }
        }
      }else if(this.productFrame.name === 'GT10' || this.productFrame.name === 'GT60'){
        for(let i=0; i<=54; i++){
          this._colors[i].img = this.lockcolors20[i].img;
          if(this.colorframe.name === this.lockcolors20[i].color){
            this.pfService.setColorFrame(this.colorframe);
          }
        }
      }
    }else if(n === 3){
      this.pfService.lockImage('./assets/locks/dk24.jpg','DK24');
      this.bnt3 = "active";
      if(this.productFrame.name === 'GT11'  || this.productFrame.name === 'GT13'){
        for(let i=0; i<=54; i++){
          this._colors[i].img = this.lockcolors2[i].img;
          if(this.colorframe.name === this.lockcolors2[i].color){
            this.pfService.setColorFrame(this.colorframe);
          }
        }
      }else if(this.productFrame.name === 'GT12'){
        for(let i=0; i<=54; i++){
          this._colors[i].img = this.lockcolors18[i].img;
          if(this.colorframe.name === this.lockcolors18[i].color){
            this.pfService.setColorFrame(this.colorframe);
          }
        }
       }
       else if(this.productFrame.name === 'GT10' || this.productFrame.name === 'GT60'){
        for(let i=0; i<=54; i++){
          this._colors[i].img = this.lockcolors22[i].img;
          if(this.colorframe.name === this.lockcolors22[i].color){
            this.pfService.setColorFrame(this.colorframe);
          }
        }
      }
      }else if(n === 4){
        this.pfService.lockImage('./assets/locks/hs07.jpg','HS07');
        this.bnt4 = "active";
        if(this.productFrame.name === 'GT11' || this.productFrame.name === 'GT13'){
          for(let i=0; i<=54; i++){
            this._colors[i].img = this.lockcolors3[i].img;
            if(this.colorframe.name === this.lockcolors3[i].color){
              this.pfService.setColorFrame(this.colorframe);
            }
          }
        }else if(this.productFrame.name === 'GT12'){
          for(let i=0; i<=54; i++){
            this._colors[i].img = this.lockcolors19[i].img;
            if(this.colorframe.name === this.lockcolors19[i].color){
              this.pfService.setColorFrame(this.colorframe);
            }
          }
        }else if(this.productFrame.name === 'GT10' || this.productFrame.name === 'GT60'){
          for(let i=0; i<=54; i++){
            this._colors[i].img = this.lockcolors23[i].img;
            if(this.colorframe.name === this.lockcolors23[i].color){
              this.pfService.setColorFrame(this.colorframe);
            }
          }
        }
      }else if(n === 5){
        this.pfService.lockImage('./assets/locks/dk24.jpg','DK24-HINGED');
        this.bnt5 = "active";
        if(this.productFrame.name === 'GT12'){
          for(let i=0; i<=54; i++){
            this._colors[i].img = this.lockcolors7[i].img;
            if(this.colorframe.name === this.lockcolors7[i].color){
              this.pfService.setColorFrame(this.colorframe);
            }
          }
        }else if(this.productFrame.name === 'GT13'){
          for(let i=0; i<=54; i++){
            this._colors[i].img = this.lockcolors10[i].img;
            if(this.colorframe.name === this.lockcolors10[i].color){
              this.pfService.setColorFrame(this.colorframe);
            }
          }
        }else if(this.productFrame.name === 'GT11'){
          for(let i=0; i<=54; i++){
          this._colors[i].img = this.lockcolors4[i].img;
          if(this.colorframe.name === this.lockcolors4[i].color){
            this.pfService.setColorFrame(this.colorframe);
          }
        }
        }else if(this.productFrame.name === 'GT10' || this.productFrame.name === 'GT60'){
          for(let i=0; i<=54; i++){
            this._colors[i].img = this.lockcolors13[i].img;
            if(this.colorframe.name === this.lockcolors13[i].color){
              this.pfService.setColorFrame(this.colorframe);
            }
          }
        }
        
      }else if(n === 6){
        this.pfService.lockImage('./assets/locks/dl04.jpg','DL04');
        this.bnt6 = "active";
        if(this.productFrame.name === 'GT12'){
          for(let i=0; i<=54; i++){
            this._colors[i].img = this.lockcolors8[i].img;
            if(this.colorframe.name === this.lockcolors8[i].color){
              this.pfService.setColorFrame(this.colorframe);
            }
          }
        }else if(this.productFrame.name === 'GT13'){
          for(let i=0; i<=54; i++){
            this._colors[i].img = this.lockcolors11[i].img;
            if(this.colorframe.name === this.lockcolors11[i].color){
              this.pfService.setColorFrame(this.colorframe);
            }
          }
        }else if(this.productFrame.name === 'GT11'){
          for(let i=0; i<=54; i++){
          this._colors[i].img = this.lockcolors5[i].img;
          if(this.colorframe.name === this.lockcolors5[i].color){
            this.pfService.setColorFrame(this.colorframe);
          }
        }
        }else if(this.productFrame.name === 'GT10' || this.productFrame.name === 'GT60'){
          for(let i=0; i<=54; i++){
            this._colors[i].img = this.lockcolors14[i].img;
            if(this.colorframe.name === this.lockcolors14[i].color){
              this.pfService.setColorFrame(this.colorframe);
            }
          }
        }
        
      }else if(n === 7){
        this.pfService.lockImage('./assets/locks/hd01a.jpg','HD01A');
        this.bnt7 = "active";
        if(this.productFrame.name === 'GT12'){
          for(let i=0; i<=54; i++){
            this._colors[i].img = this.lockcolors9[i].img;
            if(this.colorframe.name === this.lockcolors9[i].color){
              this.pfService.setColorFrame(this.colorframe);
            }
          }
        }else if(this.productFrame.name === 'GT13'){
          for(let i=0; i<=54; i++){
            this._colors[i].img = this.lockcolors12[i].img;
            if(this.colorframe.name === this.lockcolors12[i].color){
              this.pfService.setColorFrame(this.colorframe);
            }
          }
        }else if(this.productFrame.name === 'GT11'){
          for(let i=0; i<=54; i++){
          this._colors[i].img = this.lockcolors6[i].img;
          if(this.colorframe.name === this.lockcolors6[i].color){
            this.pfService.setColorFrame(this.colorframe);
          }
        }
        }else if(this.productFrame.name === 'GT10' || this.productFrame.name === 'GT60'){
          for(let i=0; i<=54; i++){
            this._colors[i].img = this.lockcolors15[i].img;
            if(this.colorframe.name === this.lockcolors15[i].color){
              this.pfService.setColorFrame(this.colorframe);
            }
          }
        }
        
      }else if(n === 8){
        this.pfService.lockImage('./assets/locks/round.jpg','ROUND');
        this.bnt8 = "active";
        if(this.productFrame.name === 'GT12'){
          for(let i=0; i<=54; i++){
          this._colors[i].img = this.roundgt12[i].img;
          this.colors[i].img = this.woodengt12[i].img;
          if(this.colorframe.name === this._colors[i].name){
            this.pfService.setColorFrame(this.colorframe);
          }
        }
        }else if(this.productFrame.name === 'GT11' || this.productFrame.name === 'GT13'){
          for(let i=0; i<=54; i++){ 
            this._colors[i].img = this.round[i].img;
            this.colors[i].img = this.woodengt11[i].img;
            if(this.colorframe.name === this._colors[i].name){
              this.pfService.setColorFrame(this.colorframe);
            }
          }
        }else if(this.productFrame.name === 'GT10' || this.productFrame.name === 'GT60'){
          for(let i=0; i<=54; i++){ 
            this._colors[i].img = this.roundgt1060[i].img;
            this.colors[i].img = this.woodengt1060[i].img;
            if(this.colorframe.name === this._colors[i].name){
              this.pfService.setColorFrame(this.colorframe);
            }
          }
        }
      }else if(n === 9){
        this.pfService.lockImage('./assets/locks/square.jpg','SQUARE');
        this.bnt9 = "active";
        if(this.productFrame.name === 'GT12'){
          for(let i=0; i<=54; i++){
          this._colors[i].img = this.squaregt12[i].img;
          if(this.colorframe.name === this._colors[i].name){
            this.pfService.setColorFrame(this.colorframe);
          }
        }
        }else if(this.productFrame.name === 'GT11' || this.productFrame.name === 'GT13'){
          for(let i=0; i<=54; i++){
            this._colors[i].img = this.square[i].img;
            if(this.colorframe.name === this._colors[i].name){
              this.pfService.setColorFrame(this.colorframe);
            }
          }
        }else if(this.productFrame.name === 'GT10' || this.productFrame.name === 'GT60'){
          for(let i=0; i<=54; i++){
            this._colors[i].img = this.squaregt1060[i].img;
            if(this.colorframe.name === this._colors[i].name){
              this.pfService.setColorFrame(this.colorframe);
            }
          }
        }
        
      }
  }

  set currentsize(value: number){
    this._currentsize = value;
    this.pfService.setgt10size(this._currentsize);
  }

  get currentsize(){
    if(this._currentsize == undefined){
      return 75;
    }else{
      return this._currentsize;
    }
  }

  resizegt10wall(value: number){
    this._currentsize = value;
  }
  formatLabel(value: number): string {
    if (value >= 75 && value <= 195) {
      return (value / 100) + 'm';
    }
    return value + 'm';
  }

  get gt10sizechoise(){
    if(this.productFrame.name === 'GT10' || this.productFrame.name === 'GT60'){
      return true;
    }else{
      return false;
    }
  }

}
