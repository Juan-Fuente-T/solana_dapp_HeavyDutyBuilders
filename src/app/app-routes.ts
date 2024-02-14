import { Route } from '@angular/router';

export const appRoutes: Route[] = [{
  path: '',
  loadComponent: () =>
    import('./home-page.component').then((m) => m.HomePageComponent),
},
{
  path: 'settings',
  loadComponent: () =>
    import('./settings-page.components').then((m) => m.SettingsPageComponent),
},
{
  path: '**',
  redirectTo: ''
}
];