//import { isNull } from '@angular/compiler/src/output/output_ast';
import {Component, OnInit, Input, Output} from '@angular/core'
import {EventEmitter} from '@angular/core'

@Component({
  selector: 'app-qnc',
  templateUrl: './qnc.component.html'
})
export class QncComponent implements OnInit {
  constructor() {} 
  @Input() showQnc
  @Input() subsetsIn
  @Input() questionsIn
  @Output() subsetOut = new EventEmitter()
  @Output() subsetsOut = new EventEmitter()
  @Output() wwgJumpOut = new EventEmitter()
  @Output() wwqJumpOut = new EventEmitter()
  @Output() wwqdJumpOut = new EventEmitter()
  @Output() qncQuestOut = new EventEmitter()
  state = { wingoFango: false }
  subsetArray = []
  questArray = []
  rulesArray = []
  qCountArray = [3,1,1,2,2]
  hisChosenSubset = '?'
  hisChosenSubsetIx = -1
  hisEnteredSubset = '?'
  hisChosenQuest = '?'
  saveSubsetHtmlId  =  '?'
  expandedSubset = '?'
  expandedSubsetHtmlId = '?'
  
  ngOnInit() {
  console.log('running ngOnit qnc comp')
  window.history.pushState(this.state, null, "")
  this.subsetArray = this.subsetsIn
  this.questArray = this.questionsIn
  }

  subsetTagClick(s,sx){
    console.log('running subsetTagClick',s,sx)
    this.jumpToWwg(s)
  } // end subsetClick

  subsetClick(s,sx){
    console.log('running subsetClick',s,sx)
    this.hisChosenSubset = s
    this.shrinkSubset()
     if ( s != this.expandedSubset ) {
      // expand the newly selected subset
      this.expandSubset(s,sx) 
     }else{ 
      this.expandedSubset = '?'
      this.expandedSubsetHtmlId = '?'
    }
  } // end subsetClick

  subsetMouseEnter(s){
    console.log('mouse entered subset', s)
    this.hisEnteredSubset = s
  } // end subsetMouseEnter

  shrinkSubset(){
    // shrink previously expanded subset:
    console.log('running shrinkSubset ', this.expandedSubsetHtmlId)
    let elemIdToRemove = document.getElementById(this.expandedSubsetHtmlId)
    if (elemIdToRemove ) { 
        elemIdToRemove.classList.remove("is-half")}
  }

  expandSubset(s,sx){
    console.log('running expandSubset', s)
    this.hisChosenSubsetIx = sx
    ////this.hisChosenSubset = s
    let buildHtmlId = 'subsetHtmlId' + sx.toString()
    let elemId = document.getElementById(buildHtmlId)
    elemId.classList.add("is-half")
    this.expandedSubset = s
    this.expandedSubsetHtmlId = buildHtmlId
    if (  s == 'NewGroupName1' ){
      //lets jump to qncWwg for his clicked on subset
      this.jumpToWwg(s)}
    this.saveSubsetHtmlId = buildHtmlId //remember for later
    console.log('saving html id',this.saveSubsetHtmlId)
  }

  questClick(q,s){
    console.log('running qnc questClick:', q, s)
    this.hisChosenQuest = q
    this.jumpToWwqd(q,s)
  } // endquestClick

  questTagClick(q,s){
    console.log('running questTagClick')
    this.jumpToQuestions(q,s)
  }
  
  jumpToWwg(subset){
    // user wants to jump to Wwg work-with-group
    console.log('running qnc jumpToWwg with: ',subset)
    this.subsetOut.emit(subset)
    this.subsetsOut.emit(this.subsetArray)
    this.wwgJumpOut.emit()
  } // end jumpToWwg

  jumpToWwqd(q,s){
    // user wants to  work on one question
    console.log('running qnc jumpToWwqd with: ',q)
    this.qncQuestOut.emit(q)
    this.wwqdJumpOut.emit()
  }

  jumpToQuestions(q,s){
    console.log('running jumpToQuestions in qnc comp')
    this.subsetOut.emit(s)
    this.wwqJumpOut.emit()
  }
  
  showHideHelp(){
    alert('running showHideHelp in qnc.component.ts....'+ "\r\n"
    + 'click on a group -> expand and shrink....'+ "\r\n"
    +' for an expanded group: click on a group rules button -> jump to work-with-group....'+ "\r\n"
    +' for an expanded group: click on questions button -> jump to work-with-questions....'+ "\r\n"
    +' drag a group left or right -> change sequence of groups....'+ "\r\n"
    +' click on the new group icon ( add a new group, go to work-with-group)....'+ "\r\n"
    +' click a question -> jump to wwqd question detail?'
    )
  }

} //end qnc component class
