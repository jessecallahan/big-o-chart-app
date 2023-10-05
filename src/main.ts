import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { Chart } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

Chart.register(zoomPlugin);
