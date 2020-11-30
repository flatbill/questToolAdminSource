import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QncComponent } from './qnc/qnc.component';
import { QncwwgComponent } from './qncwwg/qncwwg.component';

@NgModule({
  declarations: [
    AppComponent,
    QncComponent,
    QncwwgComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
