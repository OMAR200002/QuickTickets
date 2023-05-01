import { Routes } from '@angular/router';
import {TabsPage} from "./tabs/tabs.page";
import {HomePage} from "./home/home.page";
import {OnBoardingPage} from "./on-boarding/on-boarding.page";
import {BuyTicketPage} from "./buy-ticket/buy-ticket.page";
import {AuthPage} from "./auth/auth.page";
import {ProfilePage} from "./profile/profile.page";
import {CategoriesListPage} from "./categories-list/categories-list.page";


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'on-boarding',
    pathMatch: 'full',
  },
  {
    path:'on-boarding',
    component: OnBoardingPage
  },
  {
    path:'auth',
    component: AuthPage
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            component: HomePage
          }
        ]
      },
      {
        path: 'buy-ticket/:MovieId',
        children: [
          {
            path: '',
            component: BuyTicketPage
          }
        ]
      },
      {
        path: 'categories',
        children: [
          {
            path: '',
            component: CategoriesListPage
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            component: ProfilePage
          }
        ]
      },
    ]
  },
  {
    path: 'movie-detail/:MovieId',
    loadComponent: () => import('./movie-detail/movie-detail.page').then( m => m.MovieDetailPage)
  },
  {
    path: 'categories-list',
    loadComponent: () => import('./categories-list/categories-list.page').then( m => m.CategoriesListPage)
  },
  {
    path: 'movies-list/:categoryName',
    loadComponent: () => import('./movies-list/movies-list.page').then( m => m.MoviesListPage)
  },
];
