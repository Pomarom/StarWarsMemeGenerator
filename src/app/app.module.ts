import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SearchComponent } from '../routes/search/search.component';
import { RandomComponent } from '../routes/random/random.component';
import { MemeComponent } from '../routes/meme/meme.component';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { Autosize } from '../lib/autosize/angular2-autosize';


import { ImgService } from '../services/img.service';
import { ModalService } from '../services/modal.service';
import { AnalyticsService } from '../services/analytics.service';

import {enableProdMode} from '@angular/core';

import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

import { FlexLayoutModule } from "@angular/flex-layout";
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';




enableProdMode();

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'random', component: RandomComponent},
  { path: '**', redirectTo: '/search', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    RandomComponent,
    MemeComponent,
    Autosize
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatSelectModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    MatToolbarModule
  ],
  providers: [
    ImgService,
    ModalService,
    AnalyticsService
  ],
  entryComponents: [
    MemeComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
