import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'randomword', loadChildren: () => import('../randomword/randomword.module').then(m => m.RandomwordModule) },
  { path: '', redirectTo: '/randomword', pathMatch: 'full' },
  { path: '**', redirectTo: '/randomword' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
