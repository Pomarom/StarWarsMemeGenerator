import { Component, Inject, ElementRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as html2canvas from 'html2canvas';

import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-meme',
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.css'],
})
export class MemeComponent {
  public img;
  public name: string;
  public movie: string;
  public text: string;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private elementRef: ElementRef,
    private analyticsService: AnalyticsService
  ) {
      this.img = data.img;
      this.name = data.name;
      this.movie = data.movie;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  generate() {
    this.analyticsService.createRapport('downloadCustomMeme', {
      category: 'MemeEditorPage',
      label: this.name,
      movie: this.movie
    });
    this.html2CanvasWorkaround();
    const divToGenerate = document.getElementById('centseptproduction');
    this.dialogRef.close();
    html2canvas(divToGenerate, { allowTaint: true }).then((canvas) => {
      const e = document.createElement('a');
      e.href = canvas.toDataURL('image/jpeg', 'image/octet-stream');
      e.download = 'star-wars-meme-generated.jpg';
      e.click();
    });
  }

  html2CanvasWorkaround() {
    const mq = window.matchMedia( '(max-width: 768px)' );
    const toMeme = document.getElementById('myplaceholder');
    const sp1 = document.createElement('div');
    sp1.style.fontFamily = "'Roboto', sans-serif";
    sp1.style.fontSize = mq.matches ? '5vw' : '26px';
    sp1.style.width = '100%';
    sp1.style.height = '100%';
    sp1.style.paddingBottom = '5px';
    const sp1_content = document.createTextNode(this.text);
    sp1.appendChild(sp1_content);
    const parentDiv = toMeme.parentNode;

    const watermark = document.createElement('div');
    watermark.innerText = 'STARWARSMEMEGENERATOR.COM';
    watermark.style.fontFamily = "'Roboto', sans-serif";
    watermark.style.textAlign = 'end';
    watermark.style.color = '#d3d3d3';

    const meme = document.getElementById('centseptproduction');
    watermark.style.fontSize = mq.matches ? '1vw' : '5px';
    meme.appendChild(watermark);
    parentDiv.replaceChild(sp1, toMeme);
  }
}
