import { Component, OnInit, Input,  
         EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-qncwwq',
  templateUrl: './qncwwq.component.html'
})
export class QncwwqComponent implements OnInit {

  constructor() { }
  @Input() subsetIn: string
  @Input() questionsIn
  @Output() doneWwqOut = new EventEmitter()
  @Output() jumpWwqdOut = new EventEmitter()
  @Output() wwqQuestOut = new EventEmitter()
  questionArrayThisGroup = []
  ngOnInit() {
    //  alert('running ngOnInit')
    let subsetTempVar = this.subsetIn, //clever way to pass into .filter
        questTempArray = this.questionsIn
         .filter(function(q){ return q.subset == subsetTempVar })  
    this.questionArrayThisGroup = questTempArray 
  }  //end ngOnInit

  detailButClicked(q){
    console.log('running wwq detailButClicked:',q)
     //  tell caller which quest he clicked
    this.wwqQuestOut.emit(q) 
    this.jumpWwqdOut.emit()
  }

  doneWwq(){
    // console.log('doneWwq')
    this.doneWwqOut.emit()
  }
  showHideHelp(){alert(
    'list the questions for this group.'+ "\r\n"
    + 'provide for sequencing questions.'+ "\r\n"
    + 'click on a question to jump into'+ "\r\n"
    + 'field changes for one question. '+ "\r\n"
    + 'provide a button for new question. '+ "\r\n"
  )}
}
