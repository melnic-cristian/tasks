import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostDTO } from '../dtos/post.dto';
import { CommentDTO } from '../dtos/comment.dto';

@Injectable()
export class PostsService {
  private readonly BASE_URL = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  getPosts(page: number, limit: number): Observable<PostDTO[]> {
    return this.http.get<PostDTO[]>(`${this.BASE_URL}/posts`, {
      params: {
        _page: page.toString(),
        _limit: limit.toString()
      }
    });
  }

  getComments(postId: number): Observable<CommentDTO[]> {
    return this.http.get<CommentDTO[]>(`${this.BASE_URL}/posts/${postId}/comments`);
  }
}
