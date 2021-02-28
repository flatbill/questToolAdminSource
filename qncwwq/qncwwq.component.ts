import { Component, OnInit, Input,  
         EventEmitter, Output } from '@angular/core'
import api from 'src/utils/api'

@Component({
  selector: 'app-qncwwq',
  templateUrl: './qncwwq.component.html'
})
export class QncwwqComponent implements OnInit {
  constructor() { }
  @Input() subsetIn: string
  @Input() questionsIn
  @Input() questionsIn2
  @Input() rulesIn
  @Output() doneWwqOut = new EventEmitter()
  @Output() jumpWwqdOut = new EventEmitter()
  @Output() wwqQuestOut = new EventEmitter()
  @Output() wwqQuestArray2Out = new EventEmitter()
  cust = '1'
  qid  = '2'   //billy fix
  questArray2 = []
  questArray3 = [] 
  rulesArrayThisSubset = []
  questArrayMingo = [] // temp test, get questions from faunaDb
  symArUp    = '\u{2191}'
  symArDn    = '\u{2193}'
  symFilt    = '\u{2207}'  
  //symFiltOff =  '\u{236B}'
  //myFacer    =  '\uD83D\uDE00'
  colHeadSf = false
  msg1 = 'Question List'
  colSortFiltByArray = []
  ngOnInit() {
    console.log('running wwq ngOnInit')
    this.questArray2 = this.questionsIn2
    //this.launchQtReadQuestions(Event) //works, but turned off for testing.
    // let subsetTempVar = this.subsetIn, //clever way to pass into .filter
    //     questTempArray = this.questionsIn
    //     // billy, lets set filt from cols, not assume filt by subset
    //     //.filter(function(q){ return q.subset == subsetTempVar })  
    // this.questArray2 = questTempArray 
    this.chkSubsetAccumMatch()
  }  //end ngOnInit

  chkSubsetAccumMatch(){
    let subsetTempVarr = this.subsetIn, //clever way to pass into .filter
      rulesTempArray = this.rulesIn
      .filter(function(r){ return r.subset == subsetTempVarr })  
    this.rulesArrayThisSubset = rulesTempArray 
    console.table(this.rulesArrayThisSubset)
  } // end chkSubsetAccumMatch

  colHeadClicked(c){
    // show sort & filter icons in the table header (lower part)
    if (this.colHeadSf == true ) {
      this.colHeadSf = false
    } else {
      this.colHeadSf = true
      this.msg1 = 'click an icon to sort or filter.'
    }
  }// end colHeadClicked

  colSort(fieldName,ascDes){
    this.colSortFiltByArray.push( {sortField: fieldName , ascOrDes: ascDes} )  
    this.questArray2.sort((a, b) => { 
    let retval      = 666  // set retval to 0, -1, +1
    let neg1OrPos1  = 666 // set neg1OrPos1 to -1 or +1
    let mySortField = '??'
    for (let i = this.colSortFiltByArray.length-1; i >= 0; i--) {
      retval = 0
      mySortField = this.colSortFiltByArray[i].sortField
      if (this.colSortFiltByArray[i].ascOrDes == 'des' )
        {neg1OrPos1 = -1} else {neg1OrPos1 = +1}   
      // --------------------------------------------------
      for (let prop in a) {
        if (prop === mySortField) {
          if (a[prop] > b[prop]) { retval= -1 * neg1OrPos1}
          if (a[prop] < b[prop]) { retval= +1 * neg1OrPos1}
          if (retval !== 0) {break} // exit inner for loop early
        } // end if prop == mySortField
      } // end for loop
      // --------------------------------------------------
    if (retval !== 0) {break} // exit outer for loop early
    } // end outer for loop
    return retval // is now 0 or -1 or +1
  }) // end inline function
  } // end colSort

  colFilt(fn,pt){ //parms fieldname and prompt text
  console.log('running colFilt ', fn, pt)
  let filtWord = prompt('Filter ' + pt)
  if (filtWord == null || filtWord == "") {
    // User cancelled the prompt. 
    return}
  this.colFiltPartB(fn, filtWord) // set questions3 array
  this.questArray2 = this.questArray3 // billy temp.  need array strategy.
  } // end colFilt 

  colFiltPartB(fn,fw){ // field name, filter word
  console.log('running colFiltPartB',fn,fw)
  this.questArray3 = this.questionsIn2.filter(function(q){
    if (typeof(q[fn]) == 'string') {
      //return q[fn] == fw       // compare exact value not wanted
      return q[fn].includes(fw)  // compare partial value OK
    } // end if typeof string
    if (typeof(q[fn]) == 'object') { //  q-field is an object
      for (let i = 0; i < q[fn].length; i++) {
          // console.log(q[fn][i])
          // console.log('128 comparing ', q[fn][i], ' ', fw)
          if(q[fn][i].includes(fw) ) {
            // console.log('129 partial match OK')
            return true
          }
      }
      return false // got here after comparing everything. 
    }  
  }) // end .filter 

  } // end colFiltPartB

  detailButClicked(q){
    console.log('running wwq detailButClicked:',q)
     //  jump out of wwq and tell caller quests we are working on
    this.wwqQuestOut.emit(q) 
    this.wwqQuestArray2Out.emit(this.questArray2)
    this.jumpWwqdOut.emit()
  }

  doneWwq(){
    console.table(this.questArray2)
    console.log('running doneWwq')
    this.wwqQuestArray2Out.emit(this.questArray2)
    this.doneWwqOut.emit()
  }

  jumpToGroup() {
    alert('gonna jump to Group Screen')
    // app component will jump between screens.
    this.doneWwq()
  }

  jumpToRules(){
    alert('gotta jump to Rules screen')
  }
  
  showHideHelp(){alert(
    'list the questions for this group.'+ "\r\n"
    + 'provide for sequencing questions.'+ "\r\n"
    + 'click on a question to jump into'+ "\r\n"
    + 'field changes for one question. '+ "\r\n"
    + 'provide a button for new question. '+ "\r\n"
  )}

  launchQtReadQuestions = (ev) => {
    console.log('running launchQtReadQuestions')
    api.qtReadQuestions(this.cust,this.qid)
    .then 
        (   (qtDbRtnObj) => 
          {
            console.log(' running .then of api.qtReadQuestions') 
            console.table(qtDbRtnObj)
            this.buildQuestArray(qtDbRtnObj) 
          }
        )
        .catch((ev) => {  // api.qtReadQuestions returned an error 
          console.log('api.qtReadQuestions error.' + ev)
        })
  } //end LaunchQtReadQuestions

  launchQtReadRules = (ev) => {
    console.log('running launchQtReadRules')
    api.qtReadRules(this.cust,this.qid)
    .then 
        (   (qtDbRtnObj) => 
          {
            console.log(' running .then of api.qtReadRules') 
            this.buildQuestArray(qtDbRtnObj) 
          }
        )
        .catch((ev) => {  // api.qtReadRules returned an error 
          console.log('api.qtReadRules error.' + ev)
        })
  } //end LaunchQtReadRules 

  buildQuestArray(dbObj){
    console.log('running wwq buildQuestArray')
    // strip off fauna wrapper stuff from , yield a quest array
    // take qtDbObj from database and write to mingo array.
    // get here after .then of reading db,so qtDbObj is ready to use.
    this.questArrayMingo.length = 0 //blank out array, then load it
    for (let i = 0; i < dbObj.length; i++) {
      this.questArrayMingo.push(dbObj[i].data)
    } 
    console.table(this.questArrayMingo)
  }

  rq(){     //reset question arrays
    this.questArray2  = this.questionsIn  
    this.questArray3  = this.questionsIn  
    this.questionsIn2 = this.questionsIn  
  }

} // end export class