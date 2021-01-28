import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const endpoint = 'https://fww-demo.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts(params): Observable<any> {
    return this.http.get(endpoint, { params });
  }

}