import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule'},
  { path: 'list', loadChildren: './list/list.module#ListPageModule'},
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'issue', loadChildren: './issue/issue.module#IssuePageModule' },
  { path: 'inner-details', loadChildren: './inner-details/inner-details.module#InnerDetailsPageModule' },
  { path: 'issue-tab', loadChildren: './issue-tab/issue-tab.module#IssueTabPageModule' },
  // { path: 'create-issue', loadChildren: './create-issue/create-issue.module#CreateIssuePageModule' },
  // { path: 'history', loadChildren: './history/history.module#HistoryPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
