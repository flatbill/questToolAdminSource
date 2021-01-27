import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QncComponent } from './qnc/qnc.component';
import { QncwwgComponent } from './qncwwg/qncwwg.component';
import { QncwwqComponent } from './qncwwq/qncwwq.component';
import { QncwwqdComponent } from './qncwwqd/qncwwqd.component';

@NgModule({
  declarations: [
    AppComponent,
    QncComponent,
    QncwwgComponent,
    QncwwqComponent,
    QncwwqdComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
