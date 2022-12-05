import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarsModule } from './bars/bars.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideosComponent } from './videos/videos.component';
import { NbaGamesComponent } from './nba-games/nba-games.component';
import { ShareModule } from './share/share.module';
import { VideoPlayerComponent } from './video-player/video-player.component';

@NgModule({
  declarations: [AppComponent, VideosComponent, NbaGamesComponent, VideoPlayerComponent],
  imports: [BarsModule, AppRoutingModule, ShareModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
