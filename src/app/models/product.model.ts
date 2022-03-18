import { ProductFrame } from "./product-frame.model";
import { ProductType } from "./product-type.model";

export interface Product {
  id: number;
  pid: string;
  name: string;
  initPrice: number;
  initWidth: number;
  initHeight: number;
  category: string;
  description: string;
  thumbnail_url: string;
  image_url: string;
  glass_img: string;
  product_type: ProductType;
  product_frame: ProductFrame;
}
