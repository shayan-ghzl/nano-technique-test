import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { AuthenticationGuard } from '../shared/guards/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule),
      },
      {
        path: 'score',
        loadChildren: () => import('../score/score.module').then( m => m.ScorePageModule),
      },
      {
        path: 'actions',
        loadChildren: () => import('../actions/actions.module').then( m => m.ActionsPageModule),
      },
      {
        path: 'monthly-report',
        loadChildren: () => import('../monthly-report/monthly-report.module').then( m => m.MonthlyReportPageModule),
      },
      {
        path: 'single-action',
        children:[
          {
            path: ':actionId',
            loadChildren: () => import('../single-action/single-action.module').then( m => m.SingleActionPageModule),
          },
          {
            path: '',
            redirectTo: './home',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '',
        redirectTo: './home',
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
