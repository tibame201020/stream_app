import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { VideoPlayerService } from '../services/video-player.service';
declare var Clappr: any;

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

    setTimeout(() => {
      this.player.load(this.data);
      console.log('try load');
    }, 3000);
  }

  initPlayer() {
    this.player = new Clappr.Player({
      source: this.data,
      shakaConfiguration: {
        streaming: {
          rebufferingGoal: 15,
        },
      },
      height: '100%',
      width: '100%',
      autoPlay: this.videoPlayerService.autoplay,
      mute: this.videoPlayerService.muted,
      parentId: '#player',
    });
  }
}
