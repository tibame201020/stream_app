import { Component, OnInit } from '@angular/core';
import { VideosService } from '../services/videos.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { GimyVideo, SearchResult, Channel, GimyRankVideo } from '../model/video';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css'],
})
export class VideosComponent implements OnInit {

  searchResult?:SearchResult;
  videos:GimyVideo[] = [];
  channels:Channel[] = [];
  rankList:GimyRankVideo[] = [];
  channelTitle = '';
  m3u8='';



  public formGroup: FormGroup = this.formBuilder.group({
    keyword: [''],
    channelTitle:[''],
  })

  constructor(public videosService: VideosService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.videosService.getGimyRankList().subscribe(
      res => this.rankList = res
    )

    this.formGroup.valueChanges.subscribe(
      (value) => {
        console.log(this.formGroup.value)
      }
    )
  }

  getChannel(url:string, channelTitle:string) {
    this.channelTitle = channelTitle;
    this.videosService.getGimyVideoDetail(url).subscribe(
      res => this.channels = res.channels
    )
  }

  getM3U8(url:string) {
    this.videosService.watchGimyVideo(url).subscribe(
            res => {
              this.m3u8 = res.url;
            }
    )
  }

}
