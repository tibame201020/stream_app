import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import {
  NbaGame,
  Channel
} from '../model/game';

@Injectable({
  providedIn: 'root'
})
export class NbaStreamService {

  constructor(private http: HttpClient) { }

  getGames(): Observable<NbaGame[]> {
    return this.http.get<NbaGame[]>(
      environment.apiUrl + '/outer/getGames'
    );
  }

  getStreamChannel(streamUrl: string): Observable<Channel[]> {
    return this.http.post<Channel[]>(
      environment.apiUrl + 'outer/getStreamChannel',
      streamUrl
    );
  }

  getStreamByClickChannel(channelUrl: string): Observable<any> {
    return this.http.post<any>(
      environment.apiUrl + 'outer/getStreamByClickChannel',
      channelUrl
    );
  }

  getStreamToExternal(channelUrl: string): Observable<any> {
    return this.http.post<any>(
      environment.apiUrl + 'outer/getStreamToExternal',
      channelUrl
    );
  }

  readHtmlStr(url:string):Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'outer/readHtmlStr', url);
  }
}
