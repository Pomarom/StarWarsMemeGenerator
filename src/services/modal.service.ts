import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { MemeComponent } from '../routes/meme/meme.component';

@Injectable()
export class ModalService {
  constructor(public mat: MatDialog) {}

  openModal(img, name, movie) {
    const dialogRef = this.mat.open(MemeComponent, {
      width: '90vw',
      maxWidth: '500px',
        data: {
          img,
          name,
          movie
        }
      });
  }
}
