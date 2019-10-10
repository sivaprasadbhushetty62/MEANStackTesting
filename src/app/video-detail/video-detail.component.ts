import { Component, OnInit, EventEmitter } from '@angular/core';
import { Video } from './../video';

@Component({
  selector: 'video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
  inputs : ['_selectedVideo'],
  outputs : [ 'UpdateVideo','DeleteVideo' ]
})
export class VideoDetailComponent implements OnInit {
  _selectedVideo : any;
  private editTitle: boolean = false;
  public UpdateVideo = new EventEmitter();
  public DeleteVideo = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.editTitle = false;
  }

  onTitleClick(){
    this.editTitle = true;
  }

  updateVideo(){
    console.log('updateVideo');
    this.UpdateVideo.emit(this._selectedVideo);
  }

  deleteVideo(){
    console.log('deleteVideo');
    this.DeleteVideo.emit(this._selectedVideo);
  }

}
