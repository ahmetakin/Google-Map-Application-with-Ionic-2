import { Component } from '@angular/core';

import { mapPage } from '../map/map';
import { placePage } from '../place/place';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = mapPage;
  tab2Root: any = placePage;
  constructor() {

  }
}
