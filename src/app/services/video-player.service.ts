import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoPlayerService {

  public autoplay:boolean=false;
  public muted:boolean=true;

  constructor() { }
}
