import { Injectable } from '@angular/core';
import {
  CALC_SIDE_BAR,
  CALENDAR_SIDE_BAR,
  DEPOSIT_SIDE_BAR,
  HOME_SIDE_BAR,
  SETTING_SIDE_BAR,
} from '../bars/config/side-bar';
import { Bar } from '../model/bar';

@Injectable({
  providedIn: 'root',
})
export class SideBarService {
  sidebar: Bar = HOME_SIDE_BAR;
  constructor() {}

  init() {
    let path = window.location.pathname;
    switch (true) {
      case path == '/home':
        return false;
      default:
        return false;
    }
  }
}
