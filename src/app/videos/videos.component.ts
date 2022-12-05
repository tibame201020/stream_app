import { Component, OnInit } from '@angular/core';
import { VideosService } from '../services/videos.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {
  GimyVideo,
  SearchResult,
  Channel,
  GimyRankVideo,
} from '../model/video';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css'],
})
export class VideosComponent implements OnInit {
  searchResult?: SearchResult;
  videos: GimyVideo[] = [];
  channels: Channel[] = [];
  rankList: GimyRankVideo[] = [];
  channelTitle = '';
  m3u8 = '';
  options = {
    link: this.m3u8,
    type: 'application/x-mpegURL',
  };

  public formGroup: FormGroup = this.formBuilder.group({
    keyword: [''],
  });

  constructor(
    public videosService: VideosService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (!this.m3u8) {
      this.videosService
        .getGimyRankList()
        .subscribe((res) => (this.rankList = res));
    }

    this.formGroup.valueChanges.subscribe((value) => {
      if (this.formGroup.value.keyword) {
        this.m3u8 = '';
        this.videosService
          .searchByKeyword(this.formGroup.value.keyword)
          .subscribe((res) => {
            this.videos = res.gimyVideos;
            console.log(this.videos);
          });
      } else {
        this.videos = [];
        this.videosService
          .getGimyRankList()
          .subscribe((res) => (this.rankList = res));
      }
    });
  }

  getChannel(url: string, channelTitle: string) {
    this.channelTitle = channelTitle;
    this.videosService
      .getGimyVideoDetail(url)
      .subscribe((res) => (this.channels = res.channels));
  }

  getM3U8(url: string) {
    this.videosService.watchGimyVideo(url).subscribe((res) => {
      if (res.url.includes('.m3u8')) {
        this.m3u8 = res.url;
        this.options = {
          link: this.m3u8,
          type: 'application/x-mpegURL',
        };
      } else {
        alert('sorry');
      }
    });
  }
}
