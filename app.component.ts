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
  showQncWwq = true
  subset = '?'
  subsetArray = ['zzzy','aa']
  meow = 'mmmeeeooowww'
  subsetQncWwg = '??subsetQncWwg??'
  subsetsQncWwg = ['??subsetsQncWwg??']
  rulesArray = ['??rulesQncWwg??']
  rulesQncWwg = ['??rulesQncWwg??']
  showQncFun(){
      this.showQnc = true
      this.showQncWwg = false
      this.showQncWwq = false 
  } // end showQncFun

  showQncWwgFun(event){
    console.log('running showQncWwgFun')
    this.subset = event
    this.subsetQncWwg = this.subset
    this.showQnc = false
    this.showQncWwg = true
    this.showQncWwq = false
  } // end showQncWwgFun

  showQncWwqFun(event){
    console.log('running showQncWwqFun')
    this.subset = event
    // this.subsetQncWwq = this.subset
    this.showQnc = false
    this.showQncWwg = false
    this.showQncWwq = true
  } // end showQncWwqFun

  ssArrayQncWwgFun(event){
    console.log('running ssArrayQncWwgFun')
    this.subsetArray = event
    this.subsetsQncWwg = this.subsetArray
  } // end ssArrayQncWwgFun

  rulesArrayQncWwgFun(event){
    this.rulesArray = event
    this.rulesQncWwg = this.rulesArray

  }

}
