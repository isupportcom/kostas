import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRouteModule } from './modules/app.route.module';
import { AppMaterialModule } from './modules/app.material.module';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductTypeComponent } from './components/products/product-type/product-type.component';
import { ProductSettingsComponent } from './components/products/product-settings/product-settings.component';
import { ProductSummaryComponent } from './components/products/product-summary/product-summary.component';
import { ProductFrameComponent } from './components/products/product-frame/product-frame.component';
import { FrameColorComponent } from './components/products/product-frame/frame-color/frame-color.component';
import { LoginComponent } from './components/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';

@NgModule({

  declarations: [
    AppComponent,
    NavComponent,
    ProductsComponent,
    ProductListComponent,
    ProductTypeComponent,
    ProductSettingsComponent,
    ProductSummaryComponent,
    ProductFrameComponent,
    FrameColorComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    AppRouteModule,
    AppMaterialModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
