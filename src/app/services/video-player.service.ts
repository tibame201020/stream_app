import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VideoPlayerService {
  public autoplay: boolean = true;
  public muted: boolean = true;

  constructor() {}
}
