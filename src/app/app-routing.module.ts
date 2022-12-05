import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbaGamesComponent } from './nba-games/nba-games.component';
import { VideosComponent } from './videos/videos.component';

const routes: Routes = [
  { path: 'videos', component: VideosComponent },
  { path: 'nba', component: NbaGamesComponent },
  { path: '', redirectTo: '/videos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
