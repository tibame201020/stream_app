import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { VideoPlayerService } from '../services/video-player.service';
declare var Clappr: any;
declare var CDNByeClapprPlugin: any;
declare var LevelSelector: any;

@Component({
  selector: 'app-nba-stream-player',
  templateUrl: './nba-stream-player.component.html',
  styleUrls: ['./nba-stream-player.component.css'],
})
export class NbaStreamPlayerComponent implements OnInit {
  constructor(
    private videoPlayerService: VideoPlayerService,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  player: any;

  ngOnInit(): void {
    this.initPlayer();
  }

  initPlayer() {
    this.player = new Clappr.Player({
      source: this.spearate(this.data),
      height: '100%',
      width: '100%',
      autoPlay: this.videoPlayerService.autoplay,
      mute: this.videoPlayerService.muted,
      plugins: [CDNByeClapprPlugin, LevelSelector],
      preload: true,
      parentId: '#player',
      playback: {
        hlsjsConfig: {
          maxBufferSize: 0,
          maxBufferLength: 10,
          liveSyncDurationCount: 10,
          p2pConfig: {
            live: true,
          },
        },
      },
    });
  }

  spearate(url: string) {
    return url.replace(/^\"|\"$/g, '');
  }
}
