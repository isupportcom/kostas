import { ProductSummaryComponent } from './../components/products/product-summary/product-summary.component';
import { ProductSettingsComponent } from './../components/products/product-settings/product-settings.component';
import { ProductTypeComponent } from './../components/products/product-type/product-type.component';
import { ProductListComponent } from './../components/products/product-list/product-list.component';
import { ProductFrameComponent } from '../components/products/product-frame/product-frame.component';
import { FrameColorComponent } from '../components/products/product-frame/frame-color/frame-color.component';

export const Tabs = [
  {
    id: 1,
    label: 'Μοντέλο Πόρτας',
    aria_label: 'Select door',
    icon: 'door_front',
    component: ProductListComponent
  },
  /*{
    id: 2,
    label: 'Τύπος',
    aria_label: 'Door type',
    icon: 'building',
    component: ProductTypeComponent
  },*/
  {
    id: 2,
    label: 'Πλαίσιο',
    aria_label: 'frame door',
    icon: 'crop',
    component: ProductFrameComponent
  },
  {
    id: 3,
    label: 'Χρώματα',
    aria_label: 'frame color',
    icon: 'palette',
    component: FrameColorComponent
  },
  {
    id: 4,
    label: 'Διαστάσεις',
    aria_label: 'settings',
    icon: 'settings',
    component: ProductSettingsComponent
  },
  {
    id: 5,
    label: 'Τελική Διαμόρφωση',
    aria_label: 'Door summary',
    icon: 'task',
    component: ProductSummaryComponent
  }
];

/*
"Τύπος"
"Διαστάσεις"
"Συστήματα"
"Χρώματα"
"Τζάμια"
"Εξαρτήματα"
"Κλειδαριές"
"Αποθήκευση / Εκτύπωση"
*/
