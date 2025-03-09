import { Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { RepositoriesComponent } from './repositories/repositories.component';

export const PAGES_ROUTES: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [{ path: 'repositories', component: RepositoriesComponent }],
  },
];
