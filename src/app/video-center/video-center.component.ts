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
  private hideNewVideoForm : boolean = true;
  videos: Video[];

  onSelected(selectedVideo:any){
    this.selectedVideo = selectedVideo;
    this.hideNewVideoForm = true;
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

  onSubmitAddVideo(video: Video){
    console.log('onSubmitAddVideo:'+video);
    this.videoService.createVideo(video)
    .subscribe((responseVideo) => {
       this.videos.push(responseVideo);
       this.selectedVideo = responseVideo;
       this.hideNewVideoForm = true;
    });
  }

  displayNewVideoForm(){
    this.hideNewVideoForm = false;
  }

  onUpdateVideoEvent(video: any){
    this.videoService.updateVideo(video)
    .subscribe((responseVideo) =>{
      this.selectedVideo = null;
    });
  }

  onDeleteVideoEvent(video: any){
    let videoArray = this.videos;
    this.videoService.deleteVideoById(video._id)
    .subscribe((responseVideo)=>{
      for(let i=0;i<videoArray.length;i++){
        if(videoArray[i]._id === video._id){
          videoArray.splice(i,1);
        }
      }
      this.selectedVideo = null;
    });
  }
}
