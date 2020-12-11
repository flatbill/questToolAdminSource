import { Component, OnInit, Input, 
         EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-qncwwg',
  templateUrl: './qncwwg.component.html'
})
export class QncwwgComponent implements OnInit {

  constructor() {}
  @Input('showQncWwg') showQncWwgName: boolean
  @Input() meow: string
  @Input() subsetQncWwg: string
  @Input() subsetsQncWwg
  @Input() rulesQncWwg
  @Output() doneQncWwgOut = new EventEmitter<string>()
  heWantsToWorkOnRule = false
  ngOnInit() {
    console.table(this.rulesQncWwg)
  }

  doneQncWwg(){
    console.log('doneQncWwg')
    // alert(this.meow)
      // alert(this.subsetQncWwg)
    this.doneQncWwgOut.emit('nothing')
  }

  ruleClick(r,rx){
    console.log('running ruleClick',rx,r)
    this.heWantsToWorkOnRule = true
  }

}
