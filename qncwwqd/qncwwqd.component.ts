import { ThrowStmt } from '@angular/compiler'
import { Component, OnInit, Input, 
  EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-qncwwqd',
  templateUrl: './qncwwqd.component.html'
})
export class QncwwqdComponent implements OnInit {
  constructor() { }
  @Input() questionNbrIn
  @Input() questionsIn
  @Input() rulesIn  
  @Input() subsetsIn  
  @Output() doneQncWwqdOut = new EventEmitter()
  qx = -1
  workingOnSubset = '???'
  filterBySubset = '?'
  ngOnInit() {
    //alert('questNbrIn:'+ this.questionNbrIn)
    this.findQuestIx()
    this.workingOnSubset = this.questionsIn[this.qx].subset
    this.filterBySubset = this.workingOnSubset
  }

  prevButClick(){
    //console.log('running prevbutClick')
    if(this.qx == 0) { return} 

    if(this.filterBySubset == '*') {
      // we have no subset filter on, so just get prev row.
      this.qx = this.qx - 1 
      this.workingOnSubset = this.questionsIn[this.qx].subset  
      return
    }

    // fall here when we are filtering by subset.
    // repeat subtracting 1 until we match on subset
    for (let i = this.qx -1; i >= 0; i--) { 
      if ( this.filterBySubset == this.questionsIn[i].subset ) {
        this.qx = i
        this.workingOnSubset = this.questionsIn[this.qx].subset  
        return
      }
    } //end for
  } // end prevButClick

  nextButClick(){
    //console.log('running nextButClick')
      if(this.qx == this.questionsIn.length-1) { return} //no more next

      if(this.filterBySubset == '*') {
        // we have no subset filter on, so just get next row.
        this.qx = this.qx + 1 
        this.workingOnSubset = this.questionsIn[this.qx].subset  
        return
      }
  
      // fall here when we are filtering by subset.
      // repeat adding 1 until we match on subset
      for (let i = this.qx + 1; i < this.questionsIn.length; i++) { 
        if ( this.filterBySubset == this.questionsIn[i].subset ) {
          this.qx = i
          this.workingOnSubset = this.questionsIn[this.qx].subset  
          return
        }
      } //end for
  } // end nextButClick

  filtButClick(){
    // filter by subset -or- all subsets
    // starts out with the subset he jumped in with.
    // he hit the filter button, so toggle subset filter:
    if(this.filterBySubset == '*'){
      this.filterBySubset = this.workingOnSubset
    } else {
      this.filterBySubset = '*'
    }
  } // end filtButClick
  
  addButClick(){
    this.workingOnSubset = this.questionsIn[this.qx].subset // default same subset
    //  set new questSeq to one bigger than max questSeq
    let questNbrMax = 
      Math.max.apply(Math, this.questionsIn.map(function(q) { return q.questNbr }))
   let newQuestSeq = (questNbrMax + 1).toString().padStart(3, '0')

    this.questionsIn.push(
    {
      cust: "1",
      qid: "1",
      questNbr: newQuestSeq,
      questSeq: "001",
      questTxt: "new question text",
      preQuest: "new pre-question text",
      aca: ["answer choice text"],
      acaPointVals: [0],
      accum: ["Scoreboard1"],
      subset: this.workingOnSubset
    }
    )
    console.table(this.questionsIn)
    this.qx = this.questionsIn.length - 1
    // billy also add subset to subSetsIn if needed
  } // end addButClick

  saveButClick(){
    // call the database api
    // we are working with one question.
    // if this is a newly added question,
    // he may have also added a new subset
    // think about accum too.
    // accums are data-on-the-fly, but
    // is there a fauna accum table?
    // if so, we might have to add a new accum. 
  } // end saveButClick

  delButClick(){
   // delete question from question array.
   // billy, call database api
   // figure out qx of the on-screen question, 
   // and delete-splice it from array:
   let questNbrWork = this.questionsIn[this.qx].questNbr  
   this.qx = this.questionsIn
     .findIndex(q => q.questNbr == questNbrWork)
   // delete old subset from subsetsIn if this is last quest of subset:
   // is it weird though, if we just left the old subset hanging?
   // i mean, he has a hanging subset when he 'adds a new group'
   // on the other screen.
   this.chkDelSubsetForSubsets(this.questionsIn[this.qx].subset) 
   // now delete the question:
   this.questionsIn.splice(this.qx,1)  
   // after he deletes a quest, show adjacent question on screen.
   this.qx = this.qx + 1 
   if(this.qx > this.questionsIn.length -1 ) {
      this.qx = this.questionsIn.length -1  
    }
   //billy, if he deleted all questions, blank out the screen?
  } // end delButClick

  questTxtChg(ev,qx){
    console.log('running questTxtChg',ev.target.value)
    this.questionsIn[qx].questTxt = ev.target.value
    console.table(this.questionsIn)
    // think about subset stuff too.
  } // end questTxtChg

  questSeqChg(ev,qx){
    this.questionsIn[qx].questSeq = ev.target.value
    // billy maybe re-sort the question array by sequence?
    // see app.component sort
  } // end questSeqChg

  subsetChg(ev,qx){
    // he changed the subset on the data entry screen.
    // now its complicated.  
    // change rulesIn.subset to newly changed subset:
    this.setSubsetForRules(this.questionsIn[qx].subset,ev.target.value)
    // add new subset to subsetsIn if needed:
    this.setSubsetForSubsets(ev.target.value)
    // delete old subset from subsetsIn if needed:
    this.chkDelSubsetForSubsets(this.questionsIn[qx].subset)
    this.questionsIn[qx].subset = ev.target.value
  } // end subsetChg

  preQuestChg(ev,qx){
    this.questionsIn[qx].preQuest = ev.target.value
  } // end preQuestChg
  
  questAcaChg(ev,qx,ax){
    this.questionsIn[qx].aca[ax] = ev.target.value
  } // end questAcaChg

  questAccumChg(ev,qx){
    this.questionsIn[qx].accum[0] = ev.target.value
  } // end questAccumChg

  questAcaPointValChg(ev,qx,ax){
    this.questionsIn[qx].acaPointVals[ax] = ev.target.value
  }

  setSubsetForRules(subsetOld,subsetNew){
    console.log(subsetOld,subsetNew)
    // find rules with the old subset, change subset to new subset.
    for (let i = 0; i < this.rulesIn.length; i++) { 
      if(this.rulesIn[i].subset == subsetOld) {        
        this.rulesIn[i].subset = subsetNew
      } // end if
    } // end for
  } // end setSubsetForRules

  setSubsetForSubsets(subsetNew){
    console.log(subsetNew)
    // look for the new subset in subsetsIn,
    // if not found, add new subset to subsetsIn.
    let subsetFoundYn = 'n'
    for (let i = 0; i < this.subsetsIn.length; i++) { 
      if(this.subsetsIn[i] == subsetNew) {   
        console.log('billy we found a subset match')     
        subsetFoundYn = 'y'
      } // end if
    } // end for 
    if (subsetFoundYn == 'n'){
      console.log('99 pushing')
      this.subsetsIn.push(subsetNew)
    }  // end if
  } // end setSubsetForSubsets

  chkDelSubsetForSubsets(subsetOld){
    console.log(subsetOld)
    // check if we have deleted all questions for a subset.
    // if so, delete the subset.
    let countQuestForOldSubset = 0
    for (let i = 0; i < this.questionsIn.length; i++) { 
      if (this.questionsIn[i].subset == subsetOld) {        
        countQuestForOldSubset = countQuestForOldSubset + 1
      } // end if
    } // end for
    if (countQuestForOldSubset == 1) {
      // no more questions in the old subset
      console.log('hey, lets splice out from subsetsIn')
      for (let i = 0; i < this.subsetsIn.length; i++) { 
        if (this.subsetsIn[i] == subsetOld ) {
          this.subsetsIn.splice(i,1) } //delete old subset
      } // end for
    } // end if count
  } // end chkDelSubsetForSubsets

  findQuestIx(){
    this.qx = this.questionsIn
      .findIndex(q => q.questNbr == this.questionNbrIn)
  } // end findQuestIx

  doneWwqd(){
    console.log('running doneWwqd in wwqd component')
    this.doneQncWwqdOut.emit()
  } // end doneWwqd

  showHideHelp(){
    alert('show some help')
  } // end showHideHelp
}
