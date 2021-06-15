import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qncpro',
  templateUrl: './qncpro.component.html'
})
export class QncproComponent implements OnInit {
  msg1 = '?'
  constructor() { }

  ngOnInit() {
    this.msg1 = 'Here is your Profile.  '
    this.chkQueryStrings()

  }

chkQueryStrings(){
  let myUrl  = new URL(window.location.href)
  let urlParams = new URLSearchParams(myUrl.search);
  let myCust = urlParams.get('cust')
  let myQid = urlParams.get('qid')
  if (myCust == null || myQid == null)  { //no querystring parms yet
    // billy, someday let him choose a survey and set cust qid.
    // meanwhile, set default to cust=1 qid=4 (ice cream)
    let leftUrl = myUrl.toString().split("?")[0] //take off any querystring
    let myNewUrl = leftUrl + '?qid=4&cust=1'
    history.pushState({}, null, myNewUrl)
    console.log( 'profile has set myNewUrl: ' , myNewUrl)
  }
} // end chkQueryStrings

}
