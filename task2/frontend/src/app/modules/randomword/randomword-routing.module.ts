import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RandomwordComponent } from './randomword.component';

const routes: Routes = [
  { path: '', component: RandomwordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
