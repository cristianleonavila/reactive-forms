import { Routes } from '@angular/router';
import { BasicComponent } from './pages/basic/basic.component';
import { DynamicComponent } from './pages/dynamic/dynamic.component';
import { SwitchesComponent } from './pages/switches/switches.component';



export const reactiveRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        component: BasicComponent,
        title: 'Básicos'
      },
      {
        path: 'dynamic',
        component: DynamicComponent,
        title: 'Dinámicos'
      },
      {
        path: 'switches',
        component: SwitchesComponent,
        title: 'Switches'
      },
      {
        path: '**',
        redirectTo: 'basic'
      }

    ]
  }
];

export default reactiveRoutes;
