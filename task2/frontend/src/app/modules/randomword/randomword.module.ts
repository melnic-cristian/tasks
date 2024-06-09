import { NgModule } from '@angular/core';
import { PostsRoutingModule } from './randomword-routing.module';
import { RandomwordComponent } from './randomword.component';
import { CommonModule } from '@angular/common';
import { RandomwordService } from './services/randomword.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [
    RandomwordComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [RandomwordService],
})
export class RandomwordModule { }
