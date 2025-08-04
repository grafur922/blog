/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import gsap from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

// gsap.registerPlugin(ScrambleTextPlugin);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
// "target": "http://14.103.154.193:8088",