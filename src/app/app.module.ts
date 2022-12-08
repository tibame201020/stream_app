import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarsModule } from './bars/bars.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideosComponent } from './videos/videos.component';
import { NbaGamesComponent } from './nba-games/nba-games.component';
import { ShareModule } from './share/share.module';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { PagePaginationComponent } from './page-pagination/page-pagination.component';
import { NbaStreamPlayerComponent } from './nba-stream-player/nba-stream-player.component';
import { NbaStreamLinkinComponent } from './nba-stream-linkin/nba-stream-linkin.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [AppComponent, VideosComponent, NbaGamesComponent, VideoPlayerComponent, PagePaginationComponent, NbaStreamPlayerComponent, NbaStreamLinkinComponent, LoadingComponent],
  imports: [BarsModule, AppRoutingModule, ShareModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
