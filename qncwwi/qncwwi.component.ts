import { Component, OnInit, Input,  
  EventEmitter, Output } from '@angular/core'
import api from 'src/utils/api'

@Component({
  selector: 'app-qncwwi',
  templateUrl: './qncwwi.component.html'
})
export class QncwwiComponent implements OnInit {
  msg1 = 'invitations shown.'
  invitesArray = []
  constructor() {}
  @Input() InvitesIn
  @Output() qncJumpOut = new EventEmitter()

  ngOnInit() {}
  jumpToQnc(){this.qncJumpOut.emit()}
  showHideHelp(){}
}
