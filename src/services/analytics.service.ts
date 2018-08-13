import { Injectable } from '@angular/core';
import {Angulartics2} from 'angulartics2';

@Injectable()
export class AnalyticsService {
  constructor(public ngTics2: Angulartics2) {}

  createRapport(action, jsonProp) {
    this.ngTics2.eventTrack.next({
        action,
        properties: {
            ...jsonProp
        }
    });
  }
}
