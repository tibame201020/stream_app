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
  styleUrls: ['./nba-games.component.css'],
})
export class NbaGamesComponent implements OnInit {
  games: NbaGame[] = [];
  channels: Channel[] = [];
  channelAwayTeam = '';
  channelHomeTeam = '';
  streamNonResText = '';

  constructor(
    private nbaStreamService: NbaStreamService,
    public videoPlayerService: VideoPlayerService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getGames();
  }

  getGames() {
    this.nbaStreamService.getGames().subscribe((res) => (this.games = res));
  }

  getChannel(game: NbaGame) {
    if (game.gameTime == 'finished') {
      this.channelAwayTeam = '';
      this.channelHomeTeam = '';
      this.channels = [];
      this.streamNonResText = '';

      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'the game was already finished',
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }
    this.streamNonResText = '';
    this.channelAwayTeam = game.awayTeamName;
    this.channelHomeTeam = game.homeTeamName;
    this.nbaStreamService.getStreamChannel(game.streamUrl).subscribe((res) => {
      if (res.length) {
        this.channels = res;
        return;
      }
      this.streamNonResText =
        this.channelAwayTeam +
        ' v.s. ' +
        this.channelHomeTeam +
        ' stream url non-responsive, maybe too early?';
    });
  }

  getStreamByChannel(channel: Channel) {
    this.nbaStreamService
      .getStreamByClickChannel(channel.url)
      .subscribe((res) => {
        if (!res.isM3u8) {
          Swal.fire({
            title:
              'this will open new window to <span style="color:red">external link</span>, continue?',
            showCancelButton: true,
            confirmButtonText: 'confirm',
          }).then((result) => {
            if (result.isConfirmed) {
              window.open(
                res.url,
                '_blank',
                'frame=false,nodeIntegration=no,height=700, width=1600'
              );
            }
          });
          return;
        }
        let m3u8 = res.url;
        if (!res.url.includes('.m3u8')) {
          m3u8 = window.atob(res.url);
        }
        console.log(m3u8);
        this.openStreamPlayer(m3u8);
      });
  }

  openStreamLinkin(url: string) {
    const dialogRef = this.dialog.open(NbaStreamLinkinComponent, {
      width: '90rem',
      minHeight: '35rem',
      maxHeight: '60rem',
      data: url,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getGames();
    });
  }

  openStreamPlayer(m3u8: string) {
    const dialogRef = this.dialog.open(NbaStreamPlayerComponent, {
      width: '80rem',
      height: '35rem',
      data: m3u8,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getGames();
    });
  }
}
