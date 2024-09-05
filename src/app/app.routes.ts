import { Routes } from '@angular/router';
import { title } from 'process';

export const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },

  {
    path: 'Home',
    loadComponent: () =>
      import('./components/home/home.component').then(
        (c) => c.HomeComponent
      ),
    data: {
      title: 'home'
    }
  },
  {
    path: 'Error', loadComponent: () =>
      import('./components/error404/error404.component').then(
        (c) => c.Error404Component
      )
  },
  { path: '**', redirectTo: '/Error' }

];
