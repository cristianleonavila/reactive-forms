import { Component } from '@angular/core';
import { MenuItem } from '../../interfaces/menu-item';
import reactiveRoutes from '../../../reactive/reactive-routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
  styles: ``
})
export class SideMenuComponent {

  reactiveMenu: MenuItem[] = this.getMenuiItems();

  authMenu: MenuItem[] = [{
    title: 'Registro',
    route: '/auth/sign-up'
  }];

  countryMenu: MenuItem[] = [{
    title: 'Paises',
    route: '/county'
  }];

  private getMenuiItems (): MenuItem[] {
    const menuItems = reactiveRoutes[0].children ?? [];
    return menuItems
    .filter(item => item.path !== '**')
    .map(item => ({
      route: `reactive/${item.path}`,
      title: `${item.title}`
    }));
  }

}
