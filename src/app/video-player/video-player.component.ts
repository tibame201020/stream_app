import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent implements OnInit {
  public video?: HTMLVideoElement;
  public player: any;
  @Input() options!: any;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.setOption();
  }

  setOption() {
    if (this.player) {
      videojs('HTML5Video').src([
        { type: this.options.type, src: this.options.link },
      ]);
    } else {
      let options = {
        sources: [
          {
            src: this.options.link,
            type: this.options.type,
          },
        ],
        fluid: true,
        autoplay: this.options.autoplay,
        muted: this.options.muted
      };
      this.player = videojs('HTML5Video', options);
    }
  }

  ngOnDestroy() {
    videojs('HTML5Video').dispose();
  }
}
