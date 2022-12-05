import { Component, OnInit } from '@angular/core';
import { VideosService } from '../services/videos.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css'],
})
export class VideosComponent implements OnInit {
  constructor(videosService: VideosService) {}

  ngOnInit(): void {}
}
