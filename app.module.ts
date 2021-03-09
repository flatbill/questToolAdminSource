import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QncComponent } from './qnc/qnc.component';
import { QncwwgComponent } from './qncwwg/qncwwg.component';
import { QncwwqComponent } from './qncwwq/qncwwq.component';
import { QncwwqdComponent } from './qncwwqd/qncwwqd.component';
import { QncconvComponent } from './qncconv/qncconv.component';
import { QncwwrComponent } from './qncwwr/qncwwr.component';
import { QncwwgdComponent } from './qncwwgd/qncwwgd.component';
import { QncwwrdComponent } from './qncwwrd/qncwwrd.component';
import { QncwwiComponent } from './qncwwi/qncwwi.component';
import { QncwwuComponent } from './qncwwu/qncwwu.component';

@NgModule({
  declarations: [
    AppComponent,
    QncComponent,
    QncwwgComponent,
    QncwwqComponent,
    QncwwqdComponent,
    QncconvComponent,
    QncwwrComponent,
    QncwwgdComponent,
    QncwwrdComponent,
    QncwwiComponent,
    QncwwuComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
