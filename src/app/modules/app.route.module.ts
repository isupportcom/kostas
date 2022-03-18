import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from '../app.component';
import { ProductSummaryComponent } from '../components/products/product-summary/product-summary.component';
import { ProductSettingsComponent } from '../components/products/product-settings/product-settings.component';
import { ProductTypeComponent } from '../components/products/product-type/product-type.component';
import { ProductListComponent } from '../components/products/product-list/product-list.component';
import { ProductsComponent } from '../components/products/products.component';
import { ProductFrameComponent } from '../components/products/product-frame/product-frame.component';
import { FrameColorComponent } from '../components/products/product-frame/frame-color/frame-color.component';
import { NavComponent } from '../components/nav/nav.component';
import { LoginComponent } from '../components/login/login.component';
import { AuthGuard } from '../components/login/guards/auth.guard';
const routes: Routes = [
  
  {
    path:'sign-in',
    component:LoginComponent
  },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      {
        path: 'product-list',
        component: ProductListComponent
      },
      {
        path: 'product-type',
        component: ProductTypeComponent
      },
      {
        path: 'product-settings',
        component: ProductSettingsComponent
      },
      {
        path: 'product-summary',
        component: ProductSummaryComponent
      },
      {
        path: 'product-frame',
        component: ProductFrameComponent
      },
      {
        path: 'frame-color',
        component: FrameColorComponent
      },
      
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    component: NavComponent
   // canActivate: [AuthGuard]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouteModule { }
