import { Component, OnInit, Input,  
         EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-qncwwq',
  templateUrl: './qncwwq.component.html'
})
export class QncwwqComponent implements OnInit {

  constructor() { }
  @Input() subsetQncWwq
  @Output() doneQncWwqOut = new EventEmitter<string>()

  ngOnInit(): void {
    console.log('running component qncwwq')
  }
  doneQncWwq(){
    console.log('doneQncWwq')
    this.doneQncWwqOut.emit('nothing')
  }

}
