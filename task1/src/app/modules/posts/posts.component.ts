import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PostsService } from './services/posts.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommentDTO } from './dtos/comment.dto';
import { PostDTO } from './dtos/post.dto';
import { ExtendedPostDTO } from './dtos/extended-posts.dto';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  posts: ExtendedPostDTO[] = [];
  page = 1;
  limit = 20;
  totalPosts = 100;
  totalPages = Math.ceil(this.totalPosts / this.limit);
  loadingPosts = false;
  private destroy$ = new Subject<void>();

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPosts(): void {
    this.loadingPosts = true;
    this.postsService.getPosts(this.page, this.limit).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data: PostDTO[]) => {
        this.posts = data.map(post => ({
          ...post,
          showComments: false,
          comments: [],
          loadingComments: false
        }));
        this.loadingPosts = false;
      },
      error: () => {
        this.loadingPosts = false;
      }
    });
  }

  toggleComments(post: ExtendedPostDTO): void {
    post.showComments = !post.showComments;
    if (post.showComments && post.comments.length === 0) {
      post.loadingComments = true;
      this.postsService.getComments(post.id).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: (comments: CommentDTO[]) => {
          post.comments = comments;
          post.loadingComments = false;
        },
        error: () => {
          post.loadingComments = false;
        }
      });
    }
  }

  handlePageEvent(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.loadPosts();
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadPosts();
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadPosts();
    }
  }
}
