import { Component } from '@angular/core';
import { MenuItem } from '../../interfaces/menu-item';
import reactiveRoutes from '../../../reactive/reactive-routes';

@Component({
  selector: 'app-side-menu',
  imports: [],
  templateUrl: './side-menu.component.html',
  styles: ``
})
export class SideMenuComponent {

  menu: MenuItem[] = this.getMenuiItems();

  private getMenuiItems (): MenuItem[] {
    const menuItems = reactiveRoutes[0].children ?? [];
    return menuItems.map(item => ({
      route: `reactive/${item.path}`,
      title: `${item.title}`
    }));
  }

}
