import { Video } from '../video';
import { Component, OnInit } from '@angular/core';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers: [ VideoService ]
})
export class VideoCenterComponent implements OnInit {

  selectedVideo: Video;

  videos: Video[];

  onSelected(selectedVideo:any){
    this.selectedVideo = selectedVideo;
    console.log('selectedVideo :'+selectedVideo);
  }

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.videoService
      .getVideos()
      .subscribe((data: Video[])=>{
      console.log('data:'+data);
      this.videos = data;
      console.log('this.videos:'+this.videos);
    });
  }

}
