import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarsModule } from './bars/bars.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideosComponent } from './videos/videos.component';
import { NbaGamesComponent } from './nba-games/nba-games.component';
import { ShareModule } from './share/share.module';

@NgModule({
  declarations: [AppComponent, VideosComponent, NbaGamesComponent],
  imports: [BarsModule, AppRoutingModule, ShareModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
