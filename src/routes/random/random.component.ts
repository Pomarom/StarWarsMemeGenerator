import { Component } from '@angular/core';
import { Http, RequestOptions, Headers, ResponseContentType, URLSearchParams } from '@angular/http';
import {DomSanitizer} from '@angular/platform-browser';
import { ImgService } from '../../services/img.service';
import { ModalService } from '../../services/modal.service';
import { AnalyticsService } from '../../services/analytics.service';
@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent {
  private currentText;
  constructor(private http: Http,
              private sanitizer: DomSanitizer,
              public imgService: ImgService,
              public modalService: ModalService,
              public analyticsService: AnalyticsService) {
  }

  getRandomMeme(version) {
    this.analyticsService.createRapport('generateRandomMeme', {
      category: 'RandomMemePage'
    });
    const headers      = new Headers({ 'Access-Control-Expose-Headers': 'text' }); // ... Set content type to JSON
    const options       = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob });
    const params: URLSearchParams = new URLSearchParams();
    params.set('movieVersion', version);
    options.search = params;

    this.http.get('http://api.starwarsmemegenerator.com/random', options).subscribe((data) => {
    // this.http.get('http://localhost:3001/random', options).subscribe((data) => {

      const blob = data.blob();
      this.imgService.currentImg = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
      this.imgService.currentTxt = data.headers.getAll('text');
      this.imgService.currentName = data.headers.getAll('name');
    }, err => console.error(err));
  }
}
