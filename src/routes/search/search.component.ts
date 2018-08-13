import { Component } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import {DomSanitizer} from '@angular/platform-browser';
import { ImgService } from '../../services/img.service';
import { ModalService } from '../../services/modal.service';
import { AnalyticsService } from '../../services/analytics.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
    public searchTxt;
    public imgs;
    public loading;
    public err: string;
    pageSizeOptions = [5, 10, 15, 20];

    constructor(
      private http: Http,
      private sanitizer: DomSanitizer,
      public imgService: ImgService,
      public modalService: ModalService,
      private analyticsService: AnalyticsService
    ) {
      this.loading = false;
    }

    getPicturesFromText(mov, fromSearchBar?) {
        // let headers      = new Headers({ 'Access-Control-Expose-Headers': 'text' }); // ... Set content type to JSON
        // let options       = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob });
        const searched = fromSearchBar ? this.searchTxt : this.imgService.currentSearch;
        if (fromSearchBar) {
          this.imgService.currentSearch = searched;
        }
        if (!searched || !searched.replace(/\s/g, '').length) {
          this.err = 'Invalid research !';
          return;
        }
        this.analyticsService.createRapport('searchMeme', {
          category: 'SearchMemePage',
          label: searched
        });
        const params: URLSearchParams = new URLSearchParams();
        params.set('text', searched);
        params.set('nbPerPage', this.imgService.nbPerPage.toString());
        params.set('page', JSON.stringify(this.imgService.page));
        params.set('movie', JSON.stringify(mov));
        const requestOptions = new RequestOptions();
        requestOptions.search = params;
        this.loading = true;
        this.http.get('http://api.starwarsmemegenerator.com/search', requestOptions).subscribe((data) => {
        // this.http.get('http://localhost:3001/search', requestOptions).subscribe((data) => {
          this.loading = false;
          if (data.text() === 'NO_MATCHING') {
            this.err = 'No images found, try something else';
            return;
          }
          const resp = data.json();
          const imgs = resp.imgs;
          const totalImage = resp.totalImage;
          Object.keys(totalImage).forEach( (key) => this.imgService.totalImage[key] = totalImage[key] );
          const movies = JSON.parse(resp.movie);
          movies.forEach(movie => this.imgService.searchedImgs[movie] = []);
          if ( !imgs && !imgs.length) {
            this.err = 'No images found, try something else';
            return;
          }
          imgs.forEach(element => {
            this.err = '';
            const tpmImg = new Blob([new Uint8Array(element.data.data)], { type: "image/jpeg" });
            const sub =  this.highLight(searched, element.text);
            this.imgService.searchedImgs[element.key].push(
              {
                src: this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(tpmImg)),
                text: sub,
                avgTime: element.avgTime
              }
            );
          });
        }, err => {
          this.loading = false;
          this.err = 'An error occured';
        });
    }

    highLight(text, quote) {
      const quoteL =  quote.toLowerCase();
      const textL = text.toLowerCase();

      const index = quoteL.indexOf(textL);
      const length = textL.length;
      const realText = quote.substring(index, index + length);
      const first = quote.substring(0, index);
      const second = quote.substring(index + length);
      const highlighted = realText.fontcolor('#caad44');
      return `${first}${highlighted}${second}`;
    }

    next(mov) {
      if (this.imgService.page[mov] === this.ceil(this.imgService.totalImage[mov] / this.imgService.nbPerPage)) {
        return;
      }
      this.imgService.page[mov]++;
      this.getPicturesFromText([mov]);
    }

    previous(mov) {
      if (this.imgService.page[mov] === 1) {
        return;
      }
      this.imgService.page[mov]--;
      this.getPicturesFromText([mov]);
    }

    ceil(a) {
      return Math.ceil(a);
    }
}
