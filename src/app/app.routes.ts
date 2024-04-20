import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./home-page.component').then((m) => m.HomePageComponent),
  },


  {
    path: 'transactions',
    loadComponent: () =>
      import('./balance-page.component').then((m) => m.BalancePageComponent),
  },
  {
    path: '**',
    redirectTo: ''
  }
];