import { NumberValueAccessor } from "@angular/forms";

export interface ProductFrame{
    id: number;
    name: string;
    description: string;
    img_url: string;
    type: string;
}

export interface types{
    name: string ;
    id: number;
}
export interface color{
    name:string;
    id: number;
    category: string;
    img: string;
    img_thumb: string;
}
export interface glasscolor{
    name: string;
    id: number;
    category: string;
    img: string;
    thumb_img: string;
}

export interface locks{
    name: string;
    color: string;
    img: string;
}