export interface SearchResult {
  firstHtml: string;
  pagesHtml: string;
  gimyVideos: GimyVideo[];
}

export interface GimyVideo {
  name: string;
  url: string;
  img: string;
}
export interface GimyRankVideo {
  category: string;
  gimyVideos: GimyVideo[];
}

export interface Channel {
  name: string;
  videoLinks: VideoLink[];
}

export interface VideoLink {
  name: string;
  link: string;
}
export interface GimyVideoDetail {
  channels: Channel[];
}
