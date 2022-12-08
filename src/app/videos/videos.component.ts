import { Component, OnInit } from '@angular/core';
import { VideosService } from '../services/videos.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {
  GimyVideo,
  SearchResult,
  Channel,
  GimyRankVideo,
  GimyHistory,
} from '../model/video';
import Swal from 'sweetalert2';
import { VideoPlayerService } from '../services/video-player.service';

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
  channelUrl = '';
  videoTitle = '';
  m3u8 = '';
  activeLink = '';

  totalpages = 1;
  gimyHistories: GimyHistory[] = [];

  searchListStatus: boolean = false;
  searchChannelStatus: boolean = false;
  getM3u8Status: boolean = false;

  public formGroup: FormGroup = this.formBuilder.group({
    keyword: [''],
  });

  constructor(
    public videosService: VideosService,
    private formBuilder: FormBuilder,
    public videoPlayerService: VideoPlayerService
  ) {}

  ngOnInit(): void {
    this.getHistory();
    if (!this.m3u8) {
      this.getRankList();
    }

    this.formGroup.valueChanges.subscribe((value) => {
      if (!value.keyword) {
        this.m3u8 = '';
        this.activeLink = '';
        this.getRankList();
        return;
      } else {
        this.searchListStatus = true;
        this.m3u8 = '';
        this.activeLink = '';
        this.videosService.searchByKeyword(value.keyword).subscribe((res) => {
          this.searchListStatus = false;
          if (!res.gimyVideos) {
            return;
          }
          this.videos = res.gimyVideos;
          this.totalpages = res.pagesHtml;
        });
      }
    });
  }

  getRankList() {
    this.totalpages = 1;
    this.searchListStatus = true;
    this.m3u8 = '';
    this.activeLink = '';
    this.videos = [];
    this.videosService.getGimyRankList().subscribe((res) => {
      this.searchListStatus = false;
      this.rankList = res;
    });
  }

  getChannel(url: string, channelTitle: string) {
    this.searchChannelStatus = true;
    this.channelTitle = channelTitle;
    this.channelUrl = url;
    this.videosService.getGimyVideoDetail(url).subscribe((res) => {
      this.searchChannelStatus = false;
      this.channels = res.channels;
    });
  }

  getM3U8(url: string, videoStr: string) {
    if (this.activeLink == url) {
      return;
    }

    this.getM3u8Status = true;

    this.videosService.watchGimyVideo(url).subscribe((res) => {
      this.getM3u8Status = false;
      if (res.url.includes('.m3u8')) {
        this.m3u8 = res.url;
        this.activeLink = url;
        this.videoTitle = videoStr;
        this.addHistory();
      } else {
        Swal.fire({
          icon: 'error',
          title: '請嘗試更換撥放源...',
          text: '目前版本不支援m3u8以外格式!',
          timer: 3500,
        });
      }
    });
  }

  backToVideoList() {
    this.m3u8 = '';
    this.activeLink = '';
    this.searchListStatus = false;
    this.searchChannelStatus = false;
    this.getM3u8Status = false;
  }

  getCurrentPage(page: number) {
    this.searchListStatus = true;
    this.videosService
      .getListByPageUrlGimy({
        keyword: this.formGroup.value.keyword,
        page: page,
      })
      .subscribe((res) => {
        this.searchListStatus = false;
        if (res) {
          this.m3u8 = '';
          this.activeLink = '';
          this.videos = res;
        }
      });
  }

  getHistory() {
    this.videosService.getGimyHistory().subscribe((res) => {
      this.gimyHistories = res.reverse();
    });
  }

  addHistory() {
    let historyStr = this.channelTitle + '_#' + this.videoTitle;
    let channelUrl = this.channelUrl;
    let videoUrl = this.activeLink;
    this.videosService
      .addGimyHistory({
        watchTime: new Date(),
        historyStr: historyStr,
        channelUrl: channelUrl,
        videoUrl: videoUrl,
      })
      .subscribe((res) => this.getHistory());
  }

  toHistory(history: GimyHistory) {
    this.getChannel(history.channelUrl, history.historyStr.split('_#')[0]);
    this.getM3U8(history.videoUrl, history.historyStr.split('_#')[1]);
  }

  searchListBlockStatus() {
    return this.searchListStatus || this.getM3u8Status;
  }
}
