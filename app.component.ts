import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
  //styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Questool Admin'
  showQnc = true
  showQncWwg = false
  subset = '?'
  meow = 'mmmeeeooowww'
  subsetqncwwg = '??subsetqncwwg??'

  showHideQnc(){
    console.log('running showHideQnc')
    if (this.showQnc) {
      this.showQnc = false
    } else {
      this.showQnc = true
    }
  } // end showHideQnc

  showHideQncWwg(){
    console.log('running showHideQncWwg')
    if (this.showQncWwg) {
      this.showQncWwg = false
    } else {
      this.showQncWwg = true
    }
  } // end showHideQnc

  setSubsetOut(event){
    console.log('running setSubsetOut')
    this.subset = event
    this.subsetqncwwg = this.subset
  } // end setSubsetOut
   

}
