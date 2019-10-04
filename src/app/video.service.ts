import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from './video';


@Injectable({
  providedIn: 'root'
})
export class VideoService {

  REST_API_SERVER = "http://localhost:3000/api/videos";
  
  constructor(private httpClient: HttpClient) { }

  public getVideos():Observable<Video[]> {
    return this.httpClient.get<Video[]>(this.REST_API_SERVER);
  }
}