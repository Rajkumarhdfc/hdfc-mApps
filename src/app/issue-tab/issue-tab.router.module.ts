import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssueTabPage } from '../issue-tab/issue-tab.page';

const routes: Routes = [
  {
    path: '',
    component: IssueTabPage,
    children: [
      {
        path: 'create',
        children: [
          {
            path: '',
            loadChildren: '../create-issue/create-issue.module#CreateIssuePageModule'
          }
        ]
      },
      {
        path: 'history',
        children: [
          {
            path: '',
            loadChildren: '../history/history.module#HistoryPageModule'
          }
        ]
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssueTabPageRoutingModule {}
