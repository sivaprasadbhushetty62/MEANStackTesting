import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError,retry } from 'rxjs/operators'; 
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
    return this.httpClient.post<Video>(this.REST_API_SERVER_POST, video, {headers: httpHeaders})
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
        video, 
        {headers: httpHeaders}
        )
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  //Delete Video	
  public deleteVideoById(video: Video): Observable<Video> {
      console.log(this.REST_API_SERVER_DELETE + "/" + video._id);
      let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      return this.httpClient.delete<Video>(this.REST_API_SERVER_DELETE + "/" + video._id, {headers: httpHeaders})
      .pipe(
        retry(2),
        //catchError(this.handleError)
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`);
          }
          // return an observable with a user-facing error message
          return throwError(
            'Something bad happened; please try again later.');
        })
      );
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }
}