import { Component, OnInit, Input, 
         EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-qncwwg',
  templateUrl: './qncwwg.component.html'
  //styleUrls: ['./qncwwg.component.css']
})
export class QncwwgComponent implements OnInit {

  constructor() {}
  @Input('showQncWwg') showQncWwgName: boolean
  @Input() meow: string
  @Input() subsetqncwwg: string
  @Output() showHideQncOut = new EventEmitter<boolean>()
  ngOnInit() {
  }

  wingZooClick(){
    console.log('wingZooClick')
    alert(this.meow)
    alert(this.subsetqncwwg)
    this.showHideQncOut.emit(true);
  }
 

}
