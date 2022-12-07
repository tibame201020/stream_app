import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NbaGame, Channel } from '../model/game';
import { NbaStreamService } from '../services/nba-stream.service';
import { VideoPlayerService } from '../services/video-player.service';
import { MatDialog } from '@angular/material/dialog';
import { NbaStreamLinkinComponent } from '../nba-stream-linkin/nba-stream-linkin.component';
import { NbaStreamPlayerComponent } from '../nba-stream-player/nba-stream-player.component';

@Component({
  selector: 'app-nba-games',
  templateUrl: './nba-games.component.html',
  styleUrls: ['./nba-games.component.css']
})
export class NbaGamesComponent implements OnInit {

  games: NbaGame[] = [];
  channels: Channel[] = [];
  channelAwayTeam = '';
  channelHomeTeam = '';

  constructor(private nbaStreamService: NbaStreamService, public videoPlayerService: VideoPlayerService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getGames();
    this.openStreamLinkin()
  }

  getGames() {
    this.nbaStreamService.getGames().subscribe(
      res => this.games = res
    )
  }

  getChannel(game: NbaGame) {
    if (game.gameTime == 'finished') {
      this.channelAwayTeam = '';
      this.channelHomeTeam = '';
      this.channels = [];

      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'the game was already finished',
        showConfirmButton: false,
        timer: 1000
      })

      return;
    }
    this.channelAwayTeam = game.awayTeamName;
    this.channelHomeTeam = game.homeTeamName;
    this.nbaStreamService.getStreamChannel(game.streamUrl).subscribe(
      res => this.channels = res
    )
  }

  getStreamByChannel(channel: Channel) {
    console.log(channel);
    this.nbaStreamService.getStreamByClickChannel(channel.url).subscribe(
      res => {
        if (!res.isM3u8) {
          this.openStreamLinkin()
          return;
        }
        let m3u8 = res.url;
        if (!res.url.includes('.m3u8')) {
          m3u8 = window.atob(res.url);
        }
        this.openStreamPlayer()
      }
    )
  }

  openStreamLinkin() {
    const dialogRef = this.dialog.open(NbaStreamLinkinComponent, {
      width: '90rem',
      minHeight: '35rem',
      maxHeight: '60rem',
      data: 'https://github.com/tibame201020/asset-frontend-app/blob/main/src/app/share/calendar-event-form/calendar-event-form.component.ts',
    });

    dialogRef.afterClosed().subscribe((result) => {
      
    });
  }

  openStreamPlayer() {
    const dialogRef = this.dialog.open(NbaStreamPlayerComponent, {
      width: '90rem',
      minHeight: '35rem',
      maxHeight: '60rem',
      data: '',
    });

    dialogRef.afterClosed().subscribe((result) => {

    });
  }

}
