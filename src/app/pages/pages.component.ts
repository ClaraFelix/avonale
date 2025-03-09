import { Component } from '@angular/core';
import { RepositoriesComponent } from './repositories/repositories.component';

@Component({
  selector: 'dev-avonale-pages',
  templateUrl: './pages.component.html',
  standalone: true,
  imports: [RepositoriesComponent],
})
export class PagesComponent {}
