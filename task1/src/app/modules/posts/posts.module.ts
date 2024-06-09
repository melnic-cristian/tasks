import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { CommonModule } from '@angular/common';
import { PostsService } from './services/posts.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    PostsComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatCardModule],
  providers: [PostsService],
})
export class PostsModule { }
