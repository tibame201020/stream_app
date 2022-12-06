import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  SearchResult,
  GimyVideo,
  GimyVideoDetail,
  GimyRankVideo,
} from '../model/video';

@Injectable({
  providedIn: 'root',
})
export class VideosService {
  constructor(private http: HttpClient) {}

  searchByKeyword(keyword: string): Observable<SearchResult> {
    return this.http.post<SearchResult>(
      environment.apiUrl + '/outer/searchByKeyword',
      keyword
    );
  }

  getListByPageUrlGimy(page: number): Observable<GimyVideo[]> {
    return this.http.post<GimyVideo[]>(
      environment.apiUrl + '/outer/getListByPageUrlGimy',
      page
    );
  }

  getGimyVideoDetail(url: string): Observable<GimyVideoDetail> {
    return this.http.post<GimyVideoDetail>(
      environment.apiUrl + '/outer/getGimyVideoDetail',
      url
    );
  }

  watchGimyVideo(url: string): Observable<any> {
    return this.http.post<any>(
      environment.apiUrl + 'outer/watchGimyVideo',
      url
    );
  }

  getGimyRankList(): Observable<GimyRankVideo[]> {
    return this.http.get<GimyRankVideo[]>(
      environment.apiUrl + '/outer/getGimyRankList'
    );
  }
}