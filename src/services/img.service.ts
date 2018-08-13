import { Injectable } from '@angular/core';
import { AnalyticsService } from './analytics.service';

@Injectable()
export class ImgService {
  public currentImg;
  public currentTxt;
  public currentName;
  public currentSearch;
  public searchedImgs = {
    'I': [],
    'II': [],
    'III': []
  };
  public totalImage= {
    'I': 0,
    'II': 0,
    'III': 0
  };
  public nbPerPage = 10;
  public page= {
    'I': 1,
    'II': 1,
    'III': 1
  };
  constructor(private analyticsService: AnalyticsService) {}

  downloadRawImage(imgSrc, name, movie) {
    this.analyticsService.createRapport('donwloadOriginalMeme', {
      category: 'RandomMemePage',
      name,
      movie
    });
    const e = document.createElement('a');
    e.href = imgSrc.changingThisBreaksApplicationSecurity;
    e.download = 'star-wars-meme.jpg';
    e.click();
  }
}
