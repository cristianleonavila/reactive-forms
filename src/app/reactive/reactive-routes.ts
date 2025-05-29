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
        component: BasicComponent
      },
      {
        path: 'dynamic',
        component: DynamicComponent
      },
      {
        path: 'switches',
        component: SwitchesComponent
      },
      {
        path: '**',
        redirectTo: 'basic'
      }

    ]
  }
];

export default reactiveRoutes;
