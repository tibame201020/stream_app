import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { VideoPlayerService } from '../services/video-player.service';
declare var Clappr: any;

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent implements OnInit {
  public player: any;
  @Input() m3u8!: string;

  constructor(private videoPlayerService: VideoPlayerService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.initPlayer();
  }

  ngOnDestroy() {}

  initPlayer() {
    new Clappr.Player({
      source: this.m3u8,
      shakaConfiguration: {
        streaming: {
          rebufferingGoal: 50,
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
