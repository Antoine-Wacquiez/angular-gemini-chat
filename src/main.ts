import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // <-- Ici c'est AppComponent

bootstrapApplication(AppComponent, appConfig) // <-- Ici aussi
  .catch((err) => console.error(err));