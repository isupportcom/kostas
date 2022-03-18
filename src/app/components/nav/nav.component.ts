import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

// IMPORT SERVICES
import { ProductService } from './../../services/product.service';
import { AuthService } from './../../services/auth.service';

// IMPORT MODELS
import { Customer } from '../../models/customer.model';
import { Product } from './../../models/product.model';
import { Tab } from '../../models/tab.model';

// IMPORT DATA
import { Tabs } from '../../data/tab.data';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavComponent implements OnInit, AfterViewInit {

  @ViewChild('tabGroup') tabGroup;
  private _selectedIndex: number;
  private _disabledNext: boolean;
  private _disabledPrevious: boolean;
  private _customer: Customer;
  private _tabLength: number;
  private _tabList: Tab[];
  private _currentTab: Tab;
  value: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  hideScroll: boolean;

  constructor(
    private auth: AuthService,
    private productService: ProductService,
    private breakpointObserver: BreakpointObserver,
    private cdref: ChangeDetectorRef
  ) {
    this._disabledNext = false;
    this._disabledPrevious = true;
    this._selectedIndex = 0;
  }

  ngOnInit(): void {
    this._customer = this.auth.customer;
    console.log(this._customer.username)
    this._tabList = Tabs;
    this._currentTab = this._tabList[0];
  }

  ngAfterViewInit(): void {
    this._tabLength = this.tabGroup._tabs.length - 1;
    this.cdref.detectChanges();
    // leitpourgei
  }


  step(value: string): number {
    switch (value) {
      case 'next':
        this.setIndexValue(this.tabGroup.selectedIndex++);
        break;
      case 'previous':
        this.setIndexValue(this.tabGroup.selectedIndex--);
        break;
    }
    return this.selectedIndex;
  }

  setIndexValue(value: number): void {
    this._selectedIndex = value;
    this._currentTab = this._tabList[this._selectedIndex];

    // BUTTONS DISABLE
    if (this.tabGroup.selectedIndex === this._tabLength) {
      this._disabledNext = true;
      this._disabledPrevious = false;
    } else if (this.tabGroup.selectedIndex === 0) {
      this._disabledNext = false;
      this._disabledPrevious = true;
    } else {
      this._disabledNext = false;
      this._disabledPrevious = false;
    }
  }
  iconMenu = "menu_open";
  setIcon(){
    if(this.iconMenu === "menu"){
      this.iconMenu = "menu_open";
    }else{
      this.iconMenu = "menu";
    }
  }

  /*
  disableTab(index: number): boolean {
    return (this.selectedIndex < this._tabLength);
  }
  */

  // GETTERS
  get customer(): Customer {
    return this._customer;
  }

  get product(): Product {
    return this.productService.product;
  }

  get selectedIndex(): number {
    return this._selectedIndex;
  }

  get disabledNext(): boolean {
    return this._disabledNext;
  }

  get disabledPrevious(): boolean {
    return this._disabledPrevious;
  }

  get tabList() {
    return this._tabList;
  }

  get currentTab() {
    return this._currentTab;
  }

  get tabLength() {
    return this._tabLength;
  }

  logout() {
    this.auth.setAuthanticate(false);
    location.reload();
  }
}
