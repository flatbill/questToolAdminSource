import { Component, OnInit, Input } from '@angular/core'
import { EventEmitter, Output     } from '@angular/core'
import api from 'src/utils/api'

@Component({
  selector: 'app-qncwwqd',
  templateUrl: './qncwwqd.component.html'
})
export class QncwwqdComponent implements OnInit {
  constructor() { }
  @Input() questionNbrIn
  @Input() questionsIn  // full     quest list
  @Input() questionsIn2 // filtered quest list
  @Input() rulesIn  
  @Input() subsetsIn  
  @Output() doneQncWwqdOut = new EventEmitter()
  msg1 = 'edit and save question details.'
  qx = -1
  rulesArrayThisSubset = []
  fullRuleWords = ' '
  todaysDate = new Date().toJSON().split("T")[0]
  questObj = {}
  qtDbDataObj = {} 
  pendingAddQx = -1
  ngOnInit() {
    this.findQuestIx()
    this.chkSubsetAccumMatch(this.questionsIn2[this.qx].subset)
    if (this.questionsIn2.length == 0){
      this.questionsIn2 = this.questionsIn }
    console.log('wwqd questionsIn:')
    console.table(this.questionsIn)
    console.log('wwqd questionsIn2:')
    console.table(this.questionsIn2)
    
  }

  prevButClick(){
    this.msg1 = 'first question shown.'
    if(this.qx == 0) { return} 
    this.qx = this.qx - 1 
    this.msg1 = 'previous question shown.'
    this.chkSubsetAccumMatch(this.questionsIn2[this.qx].subset)
  }

  nextButClick(){
    this.msg1 = 'last question shown.'
    if(this.qx == this.questionsIn2.length-1) { return} //no more next
    this.qx = this.qx + 1 
    this.msg1 = 'next question shown.'
    this.chkSubsetAccumMatch(this.questionsIn2[this.qx].subset)
  }
  
  addButClick(){
    this.msg1 = 'edit this new question and hit save.'
    //  set new quest nbr to one bigger than max quest nbr
    let questNbrMax = 
      Math.max.apply(Math, this.questionsIn.map(function(q) { return q.questNbr }))
    let newQuestNbr = (questNbrMax + 1).toString().padStart(3, '0')

    this.questionsIn2.push(
      {
      cust: "1",
      qid: "2",
      questNbr: newQuestNbr,
      questSeq: "001",
      questTxt: "new question text",
      preQuest: "new pre-question text",
      aca: ["answer choice text"],
      acaPointVals: [0],
      accum: ["Scoreboard1"],
      subset: 'group1'
      }
    )
    // billy gotta push into both arrays.
    // console.table(this.questionsIn)
    this.qx = this.questionsIn2.length - 1
    // questionsIn has one more question than the db.
    this.pendingAddQx = this.qx // when he hits save, we use this.
    this.msg1 = 'pending add quest nbr: ' + this.questionsIn2[this.qx].questNbr
    // billy also add subset to subSetsIn if needed
    alert('added new question to questionsIn2 with subset: group1')
  } // end addButClick

  saveButClick(){
    // console.log('running saveButClick')
    // call the database api
    // we are working with one question.
    // if this is a newly added question,
    // he may have also added a new subset
    // think about accum too.
    // accums are data-on-the-fly, but
    // is there a fauna accum table?
    // if so, we might have to add a new accum. 
    this.saveQuestion()
  } // end saveButClick

  saveQuestion(){
    this.msg1 = 'question saved.'
    // console.log('running wwqd saveQuestion')
    this.buildQuestionObj() // uses current qx
    if (this.pendingAddQx >= 0) {
      this.launchQtWriteQuestion()
      this.pendingAddQx = -1
    } else {
      //  this is a changed question:
      this.launchQtUpdateQuestion()
    }
  }

  delButClick(){
   // delete question from question array.
   // billy, call database api
   // figure out qx of the on-screen question, 
   // and delete-splice it from array:
   let questNbrWork = this.questionsIn2[this.qx].questNbr  
   this.qx = this.questionsIn2
     .findIndex(q => q.questNbr == questNbrWork)
   // delete old subset from subsetsIn if this is last quest of subset:
   // is it weird though, what if we just left the old subset hanging?
   // i mean, he has a hanging subset when he 'adds a new group'
   // on the other screen.
   this.chkDelSubsetForSubsets(this.questionsIn2[this.qx].subset) 
   //  delete the db question
   this.buildQuestionObj()
   this.launchQtDeleteQuestion()
   // delete the array question:
   this.questionsIn2.splice(this.qx,1) 
   // after he deletes a quest, show adjacent question on screen.
   this.qx = this.qx + 1 
   if(this.qx > this.questionsIn2.length -1 ) {
      this.qx = this.questionsIn2.length -1  
    }
    this.msg1 = 'question ' + questNbrWork + ' deleted.'
   //billy, if he deleted all questions, blank out the screen?
  } // end delButClick

  questTxtChg(ev,qx){
    // console.log('running questTxtChg',ev.target.value)
    this.questionsIn2[qx].questTxt = ev.target.value
    // console.table(this.questionsIn)
    // think about subset stuff too.
  } // end questTxtChg

  questSeqChg(ev,qx){
    this.questionsIn2[qx].questSeq = ev.target.value
    // billy maybe re-sort the question array by sequence?
    // see app.component sort
  } // end questSeqChg

  subsetChg(ev,qx){
    // he changed the subset on the screen.  now its complicated.  
    // a. we assume he is changing the subset this question belongs to.
    // b. we assume he is NOT renaming the old subset to a new name.
    // if a rule already exist for the old name, we dont care.
    // if a rule already exist for the new name, let's show it.
    // if a rule does not exist for the new name, show blank
 
    // change rulesIn.subset to newly changed subset (not wanted)
    //this.setSubsetForRules(this.questionsIn[qx].subset,ev.target.value)

    // add new subset to subsetsIn if its not there already:
    this.setSubsetForSubsets(ev.target.value)

    // delete old subset from subsetsIn if no questions any more:
    this.chkDelSubsetForSubsets(this.questionsIn2[qx].subset)

    this.questionsIn2[qx].subset = ev.target.value
    this.chkSubsetAccumMatch(this.questionsIn2[qx].subset)
  } // end subsetChg

  preQuestChg(ev,qx){
    this.questionsIn2[qx].preQuest = ev.target.value
  } // end preQuestChg
  
  questAcaChg(ev,qx,ax){
    this.questionsIn2[qx].aca[ax] = ev.target.value
  } // end questAcaChg

  questAccumChg(ev,qx){
    this.questionsIn2[qx].accum[0] = ev.target.value
  } // end questAccumChg

  questAcaPointValChg(ev,qx,ax){
    this.questionsIn2[qx].acaPointVals[ax] = ev.target.value
    // html input formats PointVal field as a string,
    // so parseInt the pointval into a number.
    if (typeof(ev.target.value) == 'string') {
      this.questionsIn2[qx].acaPointVals[ax] = parseInt(ev.target.value)
    }
  }

  setSubsetForRules(subsetOld,subsetNew){
    console.log('running setSubsetForRules')
    // console.log(subsetOld,subsetNew)
    // find rules with the old subset, change subset to new subset.
    // this works, but isnt wanted, 
    // cuz it impliies he is changing the old subset into the new subset.
    for (let i = 0; i < this.rulesIn.length; i++) { 
      if(this.rulesIn[i].subset == subsetOld) {        
        this.rulesIn[i].subset = subsetNew
      } // end if
    } // end for
  } // end setSubsetForRules

  setSubsetForSubsets(subsetNew){
    console.log('running setSubsetForSubsets:', subsetNew)
    // look for the new subset in subsetsIn,
    // if not found, push new subset to subsetsIn.
    let subsetFoundYn = 'n'
    for (let i = 0; i < this.subsetsIn.length; i++) { 
      if(this.subsetsIn[i] == subsetNew) {   
        // console.log(' we found a subset match for: ', subsetNew)     
        subsetFoundYn = 'y'
        break
      } // end if
    } // end for 
    if (subsetFoundYn == 'n'){
      // console.log('213 pushing into subsetsIn: ', subsetNew)
      this.subsetsIn.push(subsetNew)
    }  // end if
    // billy, maybe add the new subset to the db.
  } // end setSubsetForSubsets

  chkDelSubsetForSubsets(subsetOld){
    // console.log('running chkDelSubsetForSubsets',subsetOld)
    // check if we have deleted all questions for a subset.
    // if so, delete the subset.
    let countQuestForOldSubset = 0
    for (let i = 0; i < this.questionsIn2.length; i++) { 
      if (this.questionsIn2[i].subset == subsetOld) {        
        countQuestForOldSubset = countQuestForOldSubset + 1
      } // end if
    } // end for
    if (countQuestForOldSubset == 1) {
      // we deleted the last question in the old subset
      // console.log('hey, lets splice out from subsetsIn')
      // console.table(this.subsetsIn)
      for (let i = 0; i < this.subsetsIn.length; i++) { 
        if (this.subsetsIn[i] == subsetOld ) {
          this.subsetsIn.splice(i,1) } //delete old subset
          // console.log('delete old subset from subsetsIn: ',subsetOld)
          break
      } // end for
    } // end if count
  } // end chkDelSubsetForSubsets

  findQuestIx(){
    this.qx = this.questionsIn2
      .findIndex(q => q.questNbr == this.questionNbrIn)
  } // end findQuestIx

  chkSubsetAccumMatch(subsetParmIn){ 
    //set fullRuleWords like 'accum1 > 13'
    // console.log('running chkSubsetAccumMatch',  subsetParmIn)
    let subsetTempVarr = subsetParmIn, //clever way to pass into .filter
        rulesTempArray = this.rulesIn
        .filter(function(r){ return r.subset == subsetTempVarr })  
    this.rulesArrayThisSubset = rulesTempArray 
    // console.table(this.rulesArrayThisSubset)
    if (this.rulesArrayThisSubset.length > 0) {
      this.fullRuleWords = this.rulesArrayThisSubset[0].accum + ' '
      + this.rulesArrayThisSubset[0].oper + ' '
      + this.rulesArrayThisSubset[0].thresh
      // console.log('247 hit set fullRuleWords to a real rule ', this.fullRuleWords)
    } else {
      this.fullRuleWords = '(none)'
      // console.log('251 hit set fullRuleWords to blank ')
    }

  } // end chkSubsetAccumMatch
  
  addAnswerChoice(){
    //console.log('running addChoice')
    // append into question.aca array and append into question.acaPoints
    this.msg1 = 'edit this new answer choice and hit save.'
    this.questionsIn2[this.qx].aca.push('newChoice')
    this.questionsIn2[this.qx].acaPointVals.push(0)
    // console.table(this.questionsIn[this.qx])
    let elId: HTMLInputElement = 
      document.getElementById('htmlIdBottomOfPage') as HTMLInputElement
    elId.scrollIntoView();
  }

  delAnswerChoice(ax){
    // console.log('running delChoice. qx: ',this.qx,'ax: ',ax,)
    // delete-splice from the aca from this question
    // console.log(this.questionsIn[this.qx].aca[ax]) 
    // console.log(this.questionsIn[this.qx].acaPointVals[ax]) 
    this.questionsIn2[this.qx].aca.splice(ax,1)
    this.questionsIn2[this.qx].acaPointVals.splice(ax,1)
    // billy, gotta change the db question?
    // console.table(this.questionsIn[this.qx]) 
  }

  doneWwqd(){
    console.log('running doneWwqd in wwqd component')
    this.doneQncWwqdOut.emit()
  } // end doneWwqd

  showHideHelp(){
    alert('show some help')
  } // end showHideHelp
  

  buildQuestionObj(){
    this.questObj = 
    {
      cust: "1",
      qid: "2",
      questNbr: this.questionsIn2[this.qx].questNbr,
      questSeq: this.questionsIn2[this.qx].questSeq,
      questTxt: this.questionsIn2[this.qx].questTxt,
      preQuest: this.questionsIn2[this.qx].preQuest,
      aca:      this.questionsIn2[this.qx].aca,
      acaPointVals: this.questionsIn2[this.qx].acaPointVals,
      accum:   this.questionsIn2[this.qx].accum,
      subset:  this.questionsIn2[this.qx].subset 
    }
    // console.table(this.questObj)
  }

  launchQtWriteQuestion = () => {
    console.log('running  wwqd launchQtWriteQuestion')
    api.qtWriteQuestion(this.questObj)
    .then ((qtDbRtnObj) => { this.qtDbDataObj = qtDbRtnObj.data})
    // return from this on-the-fly function is implied  
    .catch(() => {
      console.log('launchQtWriteQuestion error. questObj:' +  this.questObj)
    })
    } //end launchQtWriteQuestion
   
  launchQtDeleteQuestion = () => {
    console.log('running  wwqd launchQtDeleteQuestion')
    api.qtDeleteQuestion(this.questObj)
    .then ((qtDbRtnObj) => {this.qtDbDataObj = qtDbRtnObj.data})
    // return from this on-the-fly function is implied  
    .catch(() => {
      console.log('launchQtDeleteQuestion error. questObj:' +  this.questObj)
    })
  } //end launchQtDeleteQuestion
 
 launchQtUpdateQuestion = () => {
  console.log('running  wwqd launchQtUpdateQuestion')
  api.qtUpdateQuestion(this.questObj)
  .then ((qtDbRtnObj) => {this.qtDbDataObj = qtDbRtnObj.data})
  // return from  on-the-fly function is implied. 
  .catch(() => {
    console.log('launchQtUpdateQuestion error. questObj:', this.questObj )
  })
  } //end launchQtUpdateQuestion
 
} // end class QncwwqdComponent