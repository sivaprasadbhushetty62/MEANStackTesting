import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators'; 
import { Video } from './video';


@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private REST_API_SERVER_GET = "http://localhost:3000/api/videos";
  private REST_API_SERVER_AGET = "http://localhost:3000/api/video";
  private REST_API_SERVER_POST = "http://localhost:3000/api/video";
  private REST_API_SERVER_PUT = "http://localhost:3000/api/video";
  private REST_API_SERVER_DELETE = "http://localhost:3000/api/video";
  
  constructor(private httpClient: HttpClient) { }

  public getVideos():Observable<Video[]> {
    return this.httpClient.get<Video[]>(this.REST_API_SERVER_GET);
  }

  public createVideo(video: Video) : Observable<Video> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post<Video>(this.REST_API_SERVER_POST, JSON.stringify(video), {headers: httpHeaders})
    .pipe(
      catchError(this.handleError)
    );
  }

  public getVideoById(videoId: string): Observable<Video> {
    return this.httpClient.get<Video>(this.REST_API_SERVER_AGET + "/" + videoId)
    .pipe(
      catchError(this.handleError)
    );
  } 

  //Update Video
  public updateVideo(video: Video): Observable<Video> {
      let httpHeaders = new HttpHeaders({
          'Content-Type': 'application/json'
      });
      return this.httpClient.put<Video>(
        this.REST_API_SERVER_PUT + "/" + video._id, 
        JSON.stringify(video), 
        {headers: httpHeaders}
        )
      .pipe(
          catchError(this.handleError)
      );
  }
  //Delete Video	
  public deleteVideoById(video: Video): Observable<number> {
      return this.httpClient.delete<number>(this.REST_API_SERVER_DELETE + "/" + video._id).pipe(
          tap(status => console.log("status: " + status)),
          catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }
}