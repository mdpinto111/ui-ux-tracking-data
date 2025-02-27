import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import posthog from 'posthog-js';

posthog.init('phc_9436G9SHCWCBAHwkaEVPOtDLS9RbdInCT6LNzGDP2cY', {
  api_host: 'https://us.i.posthog.com',
  capture_pageview: false,
});

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
