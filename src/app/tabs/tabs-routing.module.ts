import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { authenticationGuard } from '../shared/guards/application.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule),
        canActivateChild: [authenticationGuard]
      },
      {
        path: 'score',
        loadChildren: () => import('../score/score.module').then( m => m.ScorePageModule),
        canActivateChild: [authenticationGuard]
      },
      {
        path: 'actions',
        children:[
          {
            path: 'today',
            loadChildren: () => import('../actions/actions.module').then( m => m.ActionsPageModule),
            canActivateChild: [authenticationGuard]
          },
          {
            path: '',
            loadChildren: () => import('../actions/actions.module').then( m => m.ActionsPageModule),
            canActivateChild: [authenticationGuard]
          }
        ]
      },
      {
        path: 'monthly-report',
        loadChildren: () => import('../monthly-report/monthly-report.module').then( m => m.MonthlyReportPageModule),
        canActivateChild: [authenticationGuard]
      },
      {
        path: 'single-action',
        children:[
          {
            path: ':actionId',
            loadChildren: () => import('../single-action/single-action.module').then( m => m.SingleActionPageModule),
            canActivateChild: [authenticationGuard]
          },
          {
            path: ':actionId/read-only',
            loadChildren: () => import('../single-action/single-action.module').then( m => m.SingleActionPageModule),
            canActivateChild: [authenticationGuard]
          },
          {
            path: '',
            redirectTo: '/tabs/home',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
