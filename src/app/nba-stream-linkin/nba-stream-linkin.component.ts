import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { NbaStreamService } from '../services/nba-stream.service';

@Component({
  selector: 'app-nba-stream-linkin',
  templateUrl: './nba-stream-linkin.component.html',
  styleUrls: ['./nba-stream-linkin.component.css'],
})
export class NbaStreamLinkinComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private nbaStreamService: NbaStreamService
  ) {}

  html: string = '';

  ngOnInit(): void {
    window.open(
      this.data,
      '_blank',
      'top=500,left=500,frame=false,nodeIntegration=no'
    );
  }
}
