import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('src/app/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'anime-info',
    loadComponent: () => import('./app/pages/anime-info/anime-info.page').then( m => m.AnimeInfoPage)
  },

  {
    path: 'anime-info/:id',
    loadComponent: () => 
      import('./app/pages/anime-info/anime-info.page').then( m => m.AnimeInfoPage)
  },

];
