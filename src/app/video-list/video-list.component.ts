import { Video } from './../video';
import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
  inputs:[ '_videos' ],
  outputs : [ 'SelectedVideoEvent']
})
export class VideoListComponent implements OnInit {

  public SelectedVideoEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onSelect(vid: Video){
    this.SelectedVideoEvent.emit(vid);
  }
}
