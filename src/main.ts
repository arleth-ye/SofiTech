import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {registerLicense} from '@syncfusion/ej2-base';
import { AppModule } from './app/app.module';

registerLicense("")
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
