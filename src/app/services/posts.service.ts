import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonService} from './common.service';
import {IPosts} from '../models/IPosts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient,
              private commonService: CommonService) { }

  getPosts = () => {
    return this.http.get<IPosts[]>(`${this.commonService.getURL()}posts`);
  }

  updatePosts = (id, body: IPosts) => {
    return this.http.put<IPosts>(`${this.commonService.getURL()}posts/${id}`, body);
  }

  deletePosts = (id) => {
    return this.http.delete(`${this.commonService.getURL()}posts/${id}`);
  }
}
